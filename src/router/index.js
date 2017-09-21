import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/pages/home');
const Blog = () => import('@/pages/Blog');
const About = () => import('@/pages/About');
const Contact = () => import('@/pages/Contact');

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/blog',
			name: 'blog',
			component: Blog
		},
		{
			path: '/about',
			name: 'about',
			component: About
		},
		{
			path: '/contact',
			name: 'contact',
			component: Contact
		}
	],
	mode: 'history',
})
