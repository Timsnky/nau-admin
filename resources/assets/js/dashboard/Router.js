import VueRouter from 'vue-router';

let routes = [{
    path: '/',
    component: require('./views/Home'),
    name: 'home',
}, {
    path: '/login',
    redirect: { 'name': 'home'},
}, {
    path: '/about',
    component: require('./views/About')
}, {
    path: '/articles',
    component: require('./views/Articles'),
    children: [{
        path: '',
        name: 'articles.list',
        component: require('./views/Articles/views/List'),
    },
    {
        path: '/community',
        name: 'articles.community',
        component: require('./views/Articles/views/Community'),
    },
    {
        path: '/live',
        name: 'articles.live',
        component: require('./views/Articles/views/Live'),
    },
    {
      path: 'create',
      name: 'articles.create',
      component: require('./views/Articles/views/Create'),
    },
    {
        path: ':id/edit',
        name: 'articles.edit',
        component: require('./views/Articles/views/Create'),
    },
    {
        path: ':article/liveticker',
        name: 'articles.livetickers',
        component: require('./views/Articles/views/Liveticker/views/Show'),
    },
    {
        path: ':article/liveticker/:liveticker',
        name: 'articles.livetickers.edit',
        component: require('./views/Articles/views/Liveticker/views/Edit'),
    }],
}, {
    path: '/ideas',
    component: require('./views/Ideas'),
    children: [{
        path: 'create',
        name: 'ideas.create',
        component: require('./views/Ideas/views/Create'),
    }, {
        path: ':id',
        name: 'ideas.show',
        component: require('./views/Ideas/views/Show'),
    }, {
        path: ':id/edit',
        name: 'ideas.edit',
        component: require('./views/Ideas/views/Edit'),
    }, {
        path: ':id/articles/create',
        name: 'ideas.articles.create',
        component: require('./views/Ideas/views/Article'),
    }, {
        path: '',
        name: 'ideas.list',
        component: require('./views/Ideas/views/List'),
    }],
}, {
    path: '/topics',
    component: require('./views/Topics'),
    children: [{
        path: 'create',
        name: 'topics.create',
        component: require('./views/Topics/views/Create'),
    }, {
        path: ':id/edit',
        name: 'topics.edit',
        component: require('./views/Topics/views/Edit'),
    }],
}, {
    path: '/topics/:topicID/articles',
    component: require('./views/TopicsArticles'),
    children: [{
        path: 'create',
        name: 'topics.articles.create',
        component: require('./views/TopicsArticles/views/Create'),
    }, {
        path: ':articleID/edit',
        name: 'topics.articles.edit',
        component: require('./views/TopicsArticles/views/Edit'),
    }],
}, {
    path: '/resource-management',
    component: require('./views/Resources'),
    children: [{
        path: 'week',
        name: 'resources.week',
        component: require('./views/Resources/views/Week'),
    }, {
        path: 'day/:date',
        name: 'resources.day',
        component: require('./views/Resources/views/Day'),
    }],
}, {
    path: '/resource-management/day/:date/shifts',
    component: require('./views/Shifts'),
    children: [{
        path: 'create',
        name: 'shifts.create',
        component: require('./views/Shifts/views/Create'),
    }, {
        path: ':id/assign',
        name: 'shifts.associate',
        component: require('./views/Shifts/views/Associate'),
    }],
}, {
    path: '/holidays',
    component: require('./views/Holidays'),
    children: [{
        path: 'create',
        name: 'holidays.create',
        component: require('./views/Holidays/views/Create'),
    }, {
        path: ':id/edit',
        name: 'holidays.edit',
        component: require('./views/Holidays/views/Edit'),
    }, {
        path: '',
        name: 'holidays.list',
        component: require('./views/Holidays/views/List'),
    }],
},
{
    path: '/images',
    component: require('./views/Images'),
    children: [
        {
            path: 'create',
            name: 'images.create',
            component: require('./views/Images/views/Create'),
        },
        {
            path: ':id/edit',
            name: 'images.edit',
            component: require('./views/Images/views/Edit'),
        },
        {
            path: '',
            name: 'images.list',
            component: require('./views/Images/views/List'),
        }
    ],
},
{
    path: '/videos',
    component: require('./views/Videos'),
    children: [
        {
            path: 'create',
            name: 'videos.create',
            component: require('./views/Videos/views/Create'),
        },
        {
            path: ':id/edit',
            name: 'videos.edit',
            component: require('./views/Videos/views/Edit'),
        },
        {
            path: '',
            name: 'videos.list',
            component: require('./views/Videos/views/List'),
        }
    ],
},
{
    path: '/users',
    component: require('./views/Users'),
    children: [
        {
            path: 'create',
            name: 'users.create',
            component: require('./views/Users/views/Create'),
        },
        {
            path: ':id/edit',
            name: 'users.edit',
            component: require('./views/Users/views/Edit'),
        },
        {
            path: '',
            name: 'users.list',
            component: require('./views/Users/views/List'),
        }
    ],
},
{
    path: '/comments',
    component: require('./views/Comments'),
    children: [
        {
            path: '',
            name: 'comments.list',
            component: require('./views/Comments/views/List'),
        }
    ],
},
{
    path: '/surveys',
    component: require('./views/Surveys'),
    children: [
        {
            path: '',
            name: 'surveys.list',
            component: require('./views/Surveys/views/List'),
        },
        {
            path: 'create',
            name: 'surveys.create',
            component: require('./views/Surveys/views/Create'),
        },
        {
            path: ':id/edit',
            name: 'surveys.edit',
            component: require('./views/Surveys/views/Edit'),
        }
    ],
},
{
    path: '/frontpage',
    component: require('./views/Frontpage'),
    children: [
        {
            path: '/big',
            name: 'frontpage.big',
            component: require('./views/Frontpage/views/Big'),
        },
        {
            path: '/top',
            name: 'frontpage.top',
            component: require('./views/Frontpage/views/Top'),
        },
        {
            path: '/top/community',
            name: 'frontpage.top.community',
            component: require('./views/Frontpage/views/TopCommunity'),
        },
    ],
},
{
    path: "*",
    component: require('./views/Error'),
}
];

export default new VueRouter({
    routes,
    mode: 'history',
    saveScrollPosition: true,
    linkActiveClass: 'active'
});
