import VueRouter from 'vue-router';

let routes = [
    {
        path: '/',
        component: require('./views/Login')
    },
    {
        path: '/forget-password',
        component: require('./views/ForgetPassword')
    },
];

export default new VueRouter({
    routes,
});
