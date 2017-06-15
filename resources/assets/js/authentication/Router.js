import VueRouter from 'vue-router';

let routes = [{
    path: '/forget-password',
    component: require('./views/ForgetPassword')
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
