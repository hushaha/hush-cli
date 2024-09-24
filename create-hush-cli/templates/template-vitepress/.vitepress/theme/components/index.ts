import { App } from 'vue';
import Demo from './demo/index.vue';

const components = { Demo };

export const useInstallComponents = (app: App) => {
	Object.entries(components).forEach(([name, Comp]) => {
		app.component(name, Comp);
	});
};
