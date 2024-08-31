import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback, Loading } from '@/features';

import Routes from './routers';

function App() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<ErrorBoundary fallback={<ErrorFallback />}>
					<Routes />
				</ErrorBoundary>
			</Suspense>
		</>
	);
}

export default App;
