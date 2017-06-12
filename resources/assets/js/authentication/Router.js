import VueRouter from 'vue-router';

let routes = [{
    path: '/login',
    component: require('./views/Login')
}, {
    path: '/forget-password',
    component: require('./views/ForgetPassword')
}];

export default new VueRouter({
    mode: 'history',
    routes,
});
