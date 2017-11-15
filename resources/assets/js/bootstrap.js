import env from './environment';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueCookie from 'vue-cookie';
import axios from 'axios';
import moment from 'moment';
import Api from './Api';
import Toast from 'vue-easy-toast';
import swal from 'sweetalert2';
import Multiselect from 'vue-multiselect';
import Cropper from 'cropperjs';

if(Promise === null) {
    window.Promise = require('promise-polyfill');
    var setAsap = require('setasap');
    Promise._immediateFn = setAsap;
}

const request = axios.create({
    withCredentials: true,
    baseURL: env.API_DOMAIN,
});

window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');

window.Vue = Vue;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueCookie);
Vue.use(Multiselect);
Vue.use(Toast, {
    id: 'easy-toast-default',
    horizontalPosition: 'right',
    verticalPosition: 'top',
    parent: 'body',
    transition: 'fade',
    duration: 5000,
});

window.env = env;
window.io = require('socket.io-client');

window.Api = new Api(env.API_DOMAIN, request, require('./store/Store').store);
window.Echo = require('./Echo').default;

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.moment = moment;
window.moment.locale('de');

window.swal = swal;
window._ = require('underscore');
window.Cropper = Cropper;


request.interceptors.request.use(config => {
    const token = window.Api.getToken();

    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, error => { return Promise.reject(error); });


swal.setDefaults({
    confirmButtonColor: '',
    cancelButtonColor: '',
    cancelButtonText: 'Abbrechen',
    confirmButtonClass: 'btn blue btn-lg',
    cancelButtonClass: 'btn red btn-lg',
});
