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
            component: require('../views/Images/views/List'),
        }],
    },
    {
        path: '/images',
        component: require('../views/Images'),
        children: [
            {
                path: 'create',
                name: 'images.create',
                component: require('../views/Images/views/Create'),
            },
            {
                path: ':id/edit',
                name: 'images.edit',
                component: require('../views/Images/views/Edit'),
            },
            {
                path: '',
                name: 'images.list',
                component: require('../views/Images/views/List'),
            },
            // {
            //     path: ':id',
            //     name: 'ideas.show',
            //     component: require('./views/Ideas/views/Show'),
            // },
        ],
    },
    {
        path: '/videos',
        component: require('../views/Videos'),
        children: [
            {
                path: 'create',
                name: 'videos.create',
                component: require('../views/Videos/views/Create'),
            },
            {
                path: ':id/edit',
                name: 'videos.edit',
                component: require('../views/Videos/views/Edit'),
            },
            {
                path: '',
                name: 'videos.list',
                component: require('../views/Videos/views/List'),
            },
            // {
            //     path: ':id',
            //     name: 'ideas.show',
            //     component: require('./views/Ideas/views/Show'),
            // },
        ],
    },
];

export default new VueRouter({
	routes,

	linkActiveClass: 'active'
});
