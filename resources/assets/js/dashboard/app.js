import '../bootstrap';

import { store } from '../store/Store';
import router from './Router';

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
Vue.component('pageBar', require('./components/PageBar.vue'));
Vue.component('pageTitle', require('./components/PageTitle.vue'));
Vue.component('quickSidebar', require('./components/QuickSidebar.vue'));

const app = new Vue({
    el: '#app',

    store,

    router,

    mounted() {
        console.log(this.$store.state, this.$router);
    }
});
