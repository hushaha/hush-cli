import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="zh-CN" className="scroll-smooth focus:scroll-auto">
				<Head>
					<link rel="icon" href="/vercel.svg" />
				</Head>
				<body className="h-full w-full">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
