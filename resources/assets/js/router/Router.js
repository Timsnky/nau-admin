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
	},
    {
        path: '/ideas',
        component: require('../views/Ideas'),
        children: [{
            path: 'create',
            name: 'ideas.create',
            component: require('../views/Ideas/views/Create'),
        }, {
            path: ':id',
            name: 'ideas.show',
            component: require('../views/Ideas/views/Show'),
        }, {
            path: ':id/edit',
            name: 'ideas.edit',
            component: require('../views/Ideas/views/Edit'),
        }, {
            path: '',
            name: 'ideas.list',
            component: require('../views/Ideas/views/List'),
        }],
    },
];

export default new VueRouter({
	routes,

	linkActiveClass: 'active'
});
