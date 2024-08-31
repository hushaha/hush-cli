import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), AutoImport({ imports: ['vue', 'vue-router', 'pinia'] })],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src')
		},
		extensions: ['.js', '.json', '.ts', 'tsx']
	},
	css: {
		postcss: {
			plugins: [tailwindcss()]
		}
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:4523/m1/5061126-4722382-default',
				changeOrigin: false,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	}
});
