const comps = {};

const modules = import.meta.glob('./*/*.vue');

for (const path in modules) {
	const cname = path.replace('./', '').replace('.vue', '');
	comps[cname] = modules[path];
}

export default comps;
