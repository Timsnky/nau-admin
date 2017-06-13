import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueCookie from 'vue-cookie';
import axios from 'axios';
import moment from 'moment';

window.Vue = Vue;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueCookie);

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.moment = moment;
window.moment.locale('en-gb');

window.api = {
    getToken(key = 'token') {
        return Vue.cookie.get(key);
    },
    setToken(key, value) {
        Vue.cookie.set(key, value, { expires: '1h' });
    },
    deleteToken(key = 'token') {
        Vue.cookie.delete(key);
    }
};

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });
