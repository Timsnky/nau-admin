import '../bootstrap';
import router from './Router';

window.Vue = require('vue');

const app = new Vue({
    el: '#login',

    router,
});
