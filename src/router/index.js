import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/pages/home');
const Blog = () => import('@/pages/blog');
const BlogPost = () => import('@/pages/blogpost');
const About = () => import('@/pages/about');
const Contact = () => import('@/pages/contact');
const Project = () => import('@/pages/project');

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
			component: Blog,
		},
		{
			path: '/blog/:id',
			name: 'blogpost',
			component: BlogPost,
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
		},
		{
			path: '/project/:id',
			name: 'project',
			component: Project
		}
	],
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	},
	mode: 'history',
})
