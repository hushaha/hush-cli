import { DefaultTheme } from 'vitepress';

type BaseConfig = {
	title: string;
	description: string;
	editLink: string;
	github: string;
	nav: DefaultTheme.NavItem[];
	sidebar: DefaultTheme.Sidebar;
};

const baseConfig: BaseConfig = {
	// 站点名称
	title: 'hushPress',

	// 站点描述
	description: '快速搭建文档平台',

	// 当前编辑页面的地址
	editLink: 'https://github.com/hushaha/hush-cli/tree/main/create-hush-cli/templates/:path',

	// github地址
	github: 'https://github.com/hushaha/hush-cli/tree/main/create-hush-cli/templates',

	// nav
	nav: [
		{ text: '组件', link: '/components/button' },
		{ text: '快速开始', link: '/config/edit' }
	],

	// sidebar
	sidebar: {
		'/components': {
			base: '/components/',
			items: [
				{
					text: '组件',
					collapsed: false,
					items: [
						{ text: 'Button', link: 'button' },
						{ text: 'Input', link: 'input' }
					]
				}
			]
		},
		'/config': {
			base: '/config/',
			items: [
				{
					text: '开发文档',
					collapsed: false,
					items: [
						{ text: '快速开始', link: 'edit' },
						{ text: 'MarkDown参考', link: 'markdown' }
					]
				}
			]
		}
	}
};

export default baseConfig;
