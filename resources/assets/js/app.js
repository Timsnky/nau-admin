
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('pageHeader', require('./components/PageHeader.vue'));
Vue.component('pageSidebar', require('./components/PageSidebar.vue'));
Vue.component('pageFooter', require('./components/PageFooter.vue'));
Vue.component('pageBar', require('./components/PageBar.vue'));
Vue.component('pageTitle', require('./components/PageTitle.vue'));
Vue.component('quickSidebar', require('./components/QuickSidebar.vue'));

const app = new Vue({
    el: '#app',

    mounted() {
    	// location.href = '/login';
    }
});
