import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import { useInstallComponents } from './components';
import { useOpenCode } from './utils/open-code';

import './style/index.scss';

export default {
	...DefaultTheme,
	enhanceApp({ app }) {
		useInstallComponents(app);

		useOpenCode();
	}
} as Theme;
