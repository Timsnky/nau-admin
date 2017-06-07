import VueRouter from 'vue-router'

let routes = [{
    path: '/',
    component: require('./views/Home')
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
    path: '/shifts',
    component: require('./views/Shifts'),
    children: [{
        path: 'create',
        name: 'shifts.create',
        component: require('./views/Shifts/views/Create'),
    }, {
        path: ':id/edit',
        name: 'shifts.edit',
        component: require('./views/Shifts/views/Edit'),
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
}, {
    path: '/error',
    name: 'error',
    component: require('./views/Error'),
}];

export default new VueRouter({
    routes,

    linkActiveClass: 'active'
});
