import VueRouter from 'vue-router';

let routes = [{
    path: '/reset-password',
    component: require('./views/ResetPassword')
}, {
    path: '/login',
    name: 'login',
    component: require('./views/Login')
}, {
    path: '*',
    redirect: { name: 'login' }
}];

export default new VueRouter({
    mode: 'history',
    routes,
});
