import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import minimist from 'minimist';
import prompts from 'prompts';
import { blue, cyan, green, magenta, red, reset } from 'kolorist';

type ColorFunc = (str: string | number) => string;

type Framework = {
	name: string;
	display: string;
	color: ColorFunc;
};

const DEFAULT_PROJECT_NAME = 'hush-project';

const FRAMEWORKS: Framework[] = [
	{
		name: 'react',
		display: 'React-TS',
		color: cyan
	},
	{
		name: 'vue',
		display: 'Vue-TS',
		color: blue
	},
	{
		name: 'next',
		display: 'Next',
		color: magenta
	},
	{
		name: 'vitepress',
		display: 'VitePress',
		color: green
	}
];

const renameFiles: Record<string, string | undefined> = {
	_gitignore: '.gitignore'
};

function formatTargetDir(targetDir: string | undefined) {
	return targetDir?.trim().replace(/\/+$/g, '');
}

/**
 * Check a directory is empty
 * @param {string} path
 * @returns {boolean}
 */
function isEmpty(path: string): boolean {
	const files = fs.readdirSync(path);
	return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

/**
 * Check a string is a valid package name
 * @param {string} projectName
 * @returns {boolean}
 */
function isValidPackageName(projectName: string): boolean {
	return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

/**
 * Empty a directory
 * @param {string} dir
 * @returns {void}
 */
function emptyDir(dir: string): void {
	if (!fs.existsSync(dir)) {
		return;
	}
	for (const file of fs.readdirSync(dir)) {
		if (file === '.git') {
			continue;
		}
		fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
	}
}

/**
 * Convert a string to a valid package name
 * @param {string} projectName
 * @returns {string}
 */
function toValidPackageName(projectName: string): string {
	return projectName
		.trim()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/^[._]/, '')
		.replace(/[^a-z\d\-~]+/g, '-');
}

/**
 * Get package.json from user agent
 * @param {string} userAgent
 * @returns {string} name
 */
function pkgFromUserAgent(userAgent: string | undefined): string {
	if (!userAgent) return '';
	const pkgSpec = userAgent.split(' ')[0];
	const pkgSpecArr = pkgSpec.split('/');
	return pkgSpecArr[0];
}

/**
 * Copy a directory
 * @param {string} srcDir
 * @param {string} destDir
 * @returns {void}
 */
function copyDir(srcDir: string, destDir: string): void {
	fs.mkdirSync(destDir, { recursive: true });
	for (const file of fs.readdirSync(srcDir)) {
		const srcFile = path.resolve(srcDir, file);
		const destFile = path.resolve(destDir, renameFiles[file] || file);
		copy(srcFile, destFile);
	}
}

/**
 * Copy a file or directory
 * @param {string} src
 * @param {string} dest
 * @returns {void}
 */
function copy(src: string, dest: string): void {
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
	alias: { h: 'help', t: 'template' },
	string: ['_']
});

const cwd = process.cwd();

const helpMessage = `\
Usage: create-hush-cli [OPTION]... [DIRECTORY]

Create a new Vite project in TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template

Available templates:
${green('vue-ts')}
${cyan('react-ts')}
${magenta('next-ts')}
`;

const init = async () => {
	// help message
	const help = argv.help;
	if (help) {
		console.log(helpMessage);
		return;
	}

	let result: prompts.Answers<'projectName' | 'overwrite' | 'packageName' | 'framework'>;

	// get user input target dir
	const argTargetDir = formatTargetDir(argv._[0]);

	let targetDir = argTargetDir || DEFAULT_PROJECT_NAME;
	const getProjectName = () => (targetDir === '.' ? path.basename(path.resolve()) : targetDir);

	prompts.override({
		overwrite: argv.overwrite
	});

	// start prompts
	try {
		result = await prompts(
			[
				{
					type: argTargetDir ? null : 'text',
					name: 'projectName',
					message: reset('Project name:'),
					initial: DEFAULT_PROJECT_NAME,
					onState: (state) => {
						targetDir = formatTargetDir(state.value) || DEFAULT_PROJECT_NAME;
					}
				},
				{
					type: () => (!fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'select'),
					name: 'overwrite',
					message: () =>
						(targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`) +
						` is not empty. Please choose how to proceed:`,
					initial: 0,
					choices: [
						{
							title: 'Remove existing files and continue',
							value: 'yes'
						},
						{
							title: 'Cancel operation',
							value: 'no'
						},
						{
							title: 'Ignore files and continue',
							value: 'ignore'
						}
					]
				},
				{
					type: () => (isValidPackageName(getProjectName()) ? null : 'text'),
					name: 'packageName',
					message: reset('Package name:'),
					initial: () => toValidPackageName(getProjectName()),
					validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name'
				},
				{
					type: 'select',
					name: 'framework',
					message: reset('Select a framework:'),
					initial: 0,
					choices: FRAMEWORKS.map((framework) => {
						const frameworkColor = framework.color;
						return {
							title: frameworkColor(framework.display || framework.name),
							value: framework
						};
					})
				}
			],
			{
				onCancel: () => {
					throw new Error(red('✖') + ' Operation cancelled');
				}
			}
		);
	} catch (cancelled: any) {
		console.log(cancelled.message);
		return;
	}

	const { framework, overwrite, packageName } = result;

	const root = path.join(cwd, targetDir);

	// init target dir
	if (overwrite === 'yes') {
		emptyDir(root);
	} else if (!fs.existsSync(root)) {
		fs.mkdirSync(root, { recursive: true });
	}

	const templateDir = path.resolve(
		fileURLToPath(import.meta.url),
		'../../templates/',
		`template-${framework.name}`
	);

	const targetPath = path.join(root);

	// copy templateDir to targetPath
	copy(templateDir, targetPath);

	// edit package.json
	const pkgPath = path.join(targetPath, `package.json`);
	const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

	pkg.name = packageName || getProjectName();

	fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

	// done
	console.log(`\nDone. Now run:\n`);
	if (root !== cwd) {
		const cdProjectName = path.relative(cwd, root);
		console.log(`  cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`);
	}

	const pkgInfoName = pkgFromUserAgent(process.env.npm_config_user_agent);
	const pkgManager = pkgInfoName || 'npm';

	switch (pkgManager) {
		case 'yarn':
			console.log('  yarn');
			console.log('  yarn dev');
			break;
		default:
			console.log(`  ${pkgManager} install`);
			console.log(`  ${pkgManager} run dev`);
			break;
	}
};

init();
