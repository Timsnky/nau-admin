import '../bootstrap';
import { store } from '../store/Store';
import api from './utils/api';
import router from './Router';

// Check auth status
store.dispatch('LOAD_AUTENTICATED_USER');

router.beforeEach((to, from, next) => {
    if (!api.getToken()) {
        location.href = '/login';
    }
    next();
});


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('pageHeader', require('./components/PageHeader.vue'));
Vue.component('pageSidebar', require('./components/PageSidebar.vue'));
Vue.component('pageFooter', require('./components/PageFooter.vue'));
Vue.component('pageTitle', require('./components/PageTitle.vue'));
Vue.component('quickSidebar', require('./components/QuickSidebar.vue'));
Vue.component('imageSelectModal', require('./components/ImageSelectModal.vue'));
Vue.component('videoSelectModal', require('./components/VideoSelectModal.vue'));

const app = new Vue({
    el: '#app',
    store,
    router,
});
