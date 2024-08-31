import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist', 'node_modules'] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			...pluginVue.configs['flat/recommended']
		],
		files: ['*.{vue,ts}', '**/*.{js,ts,vue}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		},
		plugins: {
			'simple-import-sort': simpleImportSort
		},
		rules: {
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
			'vue/multi-word-component-names': [
				'error',
				{
					ignores: ['index']
				}
			]
		}
	},
	eslintConfigPrettier
);
