import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: '',
		redirect: { name: 'home' }
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('@/pages/Home/index.vue')
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('@/pages/About/index.vue')
	},
	{
		path: '/:w+',
		name: 'notFound',
		component: () => import('@/features/NotFound/index.vue')
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export { router };
