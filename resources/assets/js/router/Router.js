import VueRouter from 'vue-router'

let routes = [
	{
		path: '/',
		component: require('./../views/Home')
	},

	{
		path: '/about',
		component: require('./../views/About')
	},

	{
		path: '/articles',
		component: require('./../views/Articles')
	}
];

export default new VueRouter({
	routes,

	linkActiveClass: 'active'
});