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

const app = new Vue({
    el: '#login',

    data() {
        return {
            email: '',
            password: ''
        };
    },

    methods: {
        signIn() {
            axios
                .post('https://api-naut.livesystems.ch/token', {
                    'email': this.email,
                    'password': this.password
                })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    location.href = '/';
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },

    mounted() {
        console.log('Login app mounted...');
    }
});
