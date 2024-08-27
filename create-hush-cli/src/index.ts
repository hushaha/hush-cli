import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import minimist from "minimist";
import prompts from "prompts";
import { blue, cyan, green, magenta, red, reset, yellow } from "kolorist";

type ColorFunc = (str: string | number) => string;

type FrameworkVariant = {
	name: string;
	display: string;
	color: ColorFunc;
	customCommand?: string;
};

type Framework = {
	name: string;
	display: string;
	color: ColorFunc;
	cliTypes?: FrameworkVariant[];
	variants: FrameworkVariant[];
};

const DEFAULT_PROJECT_NAME = "hush-project";

const FRAMEWORKS: Framework[] = [
	{
		name: "react",
		display: "React-TS",
		color: cyan,
		cliTypes: [
			{
				name: "multirepo",
				display: "MultiRepo",
				color: blue,
			},
			{
				name: "monorepo",
				display: "Monorepo",
				color: yellow,
			},
		],
		variants: [
			{
				name: "antd",
				display: "Antd",
				color: blue,
			},
			{
				name: "tailwindcss",
				display: "TailwindCSS",
				color: yellow,
			},
		],
	},
	{
		name: "vue",
		display: "Vue-TS",
		color: blue,
		cliTypes: [
			{
				name: "multirepo",
				display: "MultiRepo",
				color: blue,
			},
			{
				name: "monorepo",
				display: "Monorepo",
				color: yellow,
			},
		],
		variants: [
			{
				name: "elementplus",
				display: "ElementPlus",
				color: blue,
			},
			{
				name: "antd",
				display: "Antd",
				color: yellow,
			},
			{
				name: "tailwindcss",
				display: "TailwindCSS",
				color: magenta,
			},
		],
	},
	{
		name: "next",
		display: "Next",
		color: magenta,
		variants: [
			{
				name: "antd",
				display: "Antd",
				color: blue,
			},
			{
				name: "tailwindcss",
				display: "TailwindCSS",
				color: yellow,
			},
		],
	},
];

function formatTargetDir(targetDir: string | undefined) {
	return targetDir?.trim().replace(/\/+$/g, "");
}

function isEmpty(path: string) {
	const files = fs.readdirSync(path);
	return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

function isValidPackageName(projectName: string) {
	return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
		projectName,
	);
}

function emptyDir(dir: string) {
	if (!fs.existsSync(dir)) {
		return;
	}
	for (const file of fs.readdirSync(dir)) {
		if (file === ".git") {
			continue;
		}
		fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
	}
}

function toValidPackageName(projectName: string) {
	return projectName
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/^[._]/, "")
		.replace(/[^a-z\d\-~]+/g, "-");
}

function pkgFromUserAgent(userAgent: string | undefined) {
	if (!userAgent) return undefined;
	const pkgSpec = userAgent.split(" ")[0];
	const pkgSpecArr = pkgSpec.split("/");
	return {
		name: pkgSpecArr[0],
		version: pkgSpecArr[1],
	};
}

function copyDir(srcDir: string, destDir: string) {
	fs.mkdirSync(destDir, { recursive: true });
	for (const file of fs.readdirSync(srcDir)) {
		const srcFile = path.resolve(srcDir, file);
		const destFile = path.resolve(destDir, file);
		copy(srcFile, destFile);
	}
}

function copy(src: string, dest: string) {
	const stat = fs.statSync(src);
	if (stat.isDirectory()) {
		copyDir(src, dest);
	} else {
		fs.copyFileSync(src, dest);
	}
}

const argv = minimist<{
	template?: string;
	help?: boolean;
}>(process.argv.slice(2), {
	default: { help: false },
	alias: { h: "help", t: "template" },
	string: ["_"],
});

const cwd = process.cwd();

const helpMessage = `\
Usage: create-hush-cli [OPTION]... [DIRECTORY]

Create a new Vite project in TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template

Available templates:
${green("vue-ts-monorepo      vue-ts      vue")}
${cyan("react-ts-monorepo    react-ts    react")}
${magenta("next-ts")}
`;

const init = async () => {
	// help message
	const help = argv.help;
	if (help) {
		console.log(helpMessage);
		return;
	}

	let result: prompts.Answers<
		| "projectName"
		| "overwrite"
		| "packageName"
		| "framework"
		| "cliType"
		| "variant"
	>;

	// get user input target dir
	const argTargetDir = formatTargetDir(argv._[0]);

	let targetDir = argTargetDir || DEFAULT_PROJECT_NAME;
	const getProjectName = () =>
		targetDir === "." ? path.basename(path.resolve()) : targetDir;

	prompts.override({
		overwrite: argv.overwrite,
	});

	// start prompts
	try {
		result = await prompts(
			[
				{
					type: argTargetDir ? null : "text",
					name: "projectName",
					message: reset("Project name:"),
					initial: DEFAULT_PROJECT_NAME,
					onState: (state) => {
						targetDir = formatTargetDir(state.value) || DEFAULT_PROJECT_NAME;
					},
				},
				{
					type: () =>
						!fs.existsSync(targetDir) || isEmpty(targetDir) ? null : "select",
					name: "overwrite",
					message: () =>
						(targetDir === "."
							? "Current directory"
							: `Target directory "${targetDir}"`) +
						` is not empty. Please choose how to proceed:`,
					initial: 0,
					choices: [
						{
							title: "Remove existing files and continue",
							value: "yes",
						},
						{
							title: "Cancel operation",
							value: "no",
						},
						{
							title: "Ignore files and continue",
							value: "ignore",
						},
					],
				},
				{
					type: () => (isValidPackageName(getProjectName()) ? null : "text"),
					name: "packageName",
					message: reset("Package name:"),
					initial: () => toValidPackageName(getProjectName()),
					validate: (dir) =>
						isValidPackageName(dir) || "Invalid package.json name",
				},
				{
					type: "select",
					name: "framework",
					message: reset("Select a framework:"),
					initial: 0,
					choices: FRAMEWORKS.map((framework) => {
						const frameworkColor = framework.color;
						return {
							title: frameworkColor(framework.display || framework.name),
							value: framework,
						};
					}),
				},
				{
					type: (framework: Framework) =>
						framework && framework.cliTypes ? "select" : null,
					name: "cliType",
					message: reset("Select a cliType:"),
					choices: (framework: Framework) =>
						framework.cliTypes!.map((type) => {
							const typeColor = type.color;
							return {
								title: typeColor(type.display || type.name),
								value: type.name,
							};
						}),
				},
				{
					type: (_, { framework }: { framework: Framework }) =>
						framework && framework.variants ? "select" : null,
					name: "variant",
					message: reset("Select a variant:"),
					choices: (_, { framework }: { framework: Framework }) =>
						framework.variants.map((variant) => {
							const variantColor = variant.color;
							return {
								title: variantColor(variant.display || variant.name),
								value: variant.name,
							};
						}),
				},
			],
			{
				onCancel: () => {
					throw new Error(red("✖") + " Operation cancelled");
				},
			},
		);
	} catch (cancelled: any) {
		console.log(cancelled.message);
		return;
	}

	const { framework, overwrite, packageName, variant } = result;

	const root = path.join(cwd, targetDir);

	// init target dir
	if (overwrite === "yes") {
		emptyDir(root);
	} else if (!fs.existsSync(root)) {
		fs.mkdirSync(root, { recursive: true });
	}

	const templateDir = path.resolve(
		fileURLToPath(import.meta.url),
		"../../templates/",
		`template-${framework.name}`,
	);

	const targetPath = path.join(root);

	// copy templateDir to targetPath
	copy(templateDir, targetPath);

	// edit package.json
	const pkgPath = path.join(targetPath, `package.json`);
	const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

	pkg.name = packageName || getProjectName();

	fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

	// done
	console.log(`\nDone. Now run:\n`);
	if (root !== cwd) {
		const cdProjectName = path.relative(cwd, root);
		console.log(
			`  cd ${
				cdProjectName.includes(" ") ? `"${cdProjectName}"` : cdProjectName
			}`,
		);
	}

	const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
	const pkgManager = pkgInfo ? pkgInfo.name : "npm";

	switch (pkgManager) {
		case "yarn":
			console.log("  yarn");
			console.log("  yarn dev");
			break;
		default:
			console.log(`  ${pkgManager} install`);
			console.log(`  ${pkgManager} run dev`);
			break;
	}
};

init();
