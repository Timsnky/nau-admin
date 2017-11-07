import '../bootstrap';
import { store } from '../store/Store';
import router from './Router';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('pageHeader', require('./components/PageHeader.vue'));
Vue.component('pageSidebar', require('./components/PageSidebar.vue'));
Vue.component('pageFooter', require('./components/PageFooter.vue'));
Vue.component('pageTitle', require('./components/PageTitle.vue'));
Vue.component('pagination', require('./components/Pagination/Pagination.vue'));
Vue.component('status-display', require('./components/StatusDisplay.vue'));
import multiselect from 'vue-multiselect';
Vue.component('multiselect', multiselect);
Vue.component('surveySelectModal', require('./components/SurveySelectModal.vue'));

const app = new Vue({
    el: '#app',
    store,
    router,
    computed: {
        user() {
            return Api.user()
        }
    },
});

// Globaly replace << and >>
$('textbox,input').keyup(function() {
    var updatedText = this.value.replace(/<</g, '«');
    var updatedText = updatedText.replace(/>>/g, '»');
    if (updatedText != this.value)
        this.value = updatedText;
});

// Check auth status
store.dispatch('LOAD_AUTENTICATED_USER');
store.dispatch('FETCH_MASTERS');
