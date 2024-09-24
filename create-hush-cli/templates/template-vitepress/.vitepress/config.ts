import { defineConfig } from 'vitepress';
import baseConfig from '../config';
import { mdPlugin } from './plugin';

const { title, description, editLink, github, nav, sidebar } = baseConfig;

export default defineConfig({
	title,
	description,

	/* prettier-ignore */
	head: [
		['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
	],

	srcDir: './src',
	outDir: './dist',
	lastUpdated: true,
	cleanUrls: true,
	metaChunk: true,

	markdown: {
		config: (md) => mdPlugin(md)
	},

	themeConfig: {
		logo: { src: '/favicon.svg', width: 24, height: 24 },
		nav,
		sidebar,
		editLink: {
			pattern: editLink,
			text: '在 GitHub 上编辑此页面'
		},
		socialLinks: [{ icon: 'github', link: github }],
		lastUpdated: {
			text: '最后更新于',
			formatOptions: {
				dateStyle: 'short',
				timeStyle: 'medium'
			}
		},
		docFooter: {
			prev: '上一页',
			next: '下一页'
		},
		outline: {
			label: '页面导航',
			level: 'deep'
		},
		darkModeSwitchLabel: '主题',
		lightModeSwitchTitle: '切换到浅色模式',
		darkModeSwitchTitle: '切换到深色模式'
	}
});
