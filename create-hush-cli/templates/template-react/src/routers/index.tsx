import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home/index.tsx'));
const About = lazy(() => import('@/pages/About/index.tsx'));
const NotFound = lazy(() => import('@/features/NotFound/index.tsx'));

const routers = [
	{
		path: '/',
		element: <Navigate to="/home" replace={true} />
	},
	{
		path: '/home',
		element: <Home />
	},
	{
		path: '/about',
		element: <About />
	},
	{
		path: '*',
		element: <NotFound />
	}
];

const browserRouter = createBrowserRouter(routers);

const Routes = () => <RouterProvider router={browserRouter} />;

export default Routes;
