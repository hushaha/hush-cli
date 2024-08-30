import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		AutoImport({ imports: ['react', 'mobx', 'react-router', 'react-router-dom'] })
	],
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
