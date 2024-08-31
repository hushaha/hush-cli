/** @type {import('next').NextConfig} */
const nextConfig = {
	// react严格模式
	reactStrictMode: true,

	// eslint
	eslint: {
		dirs: ['src']
	},

	webpack(config) {
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false
		};
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		});
		return config;
	},
	// 重定向
	async redirects() {
		return [
			{
				source: '/',
				destination: '/home',
				permanent: true
			}
		];
	}
};

export default nextConfig;
