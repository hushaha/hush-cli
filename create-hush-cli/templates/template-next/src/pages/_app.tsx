import '@/assets/styles/index.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { FC } from 'react';

type CustomAppProps = {
	Component: AppProps['Component'];
	pageProps: AppProps['pageProps'];
};

const MyApp: FC<CustomAppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
