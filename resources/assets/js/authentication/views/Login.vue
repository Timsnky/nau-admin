<template>
    <div>
        <form class="login-form" @submit.prevent="signIn">
            <h3 class="form-title font-green">Sign In</h3>
            <div
                class="alert alert-danger"
                v-if="hasErrors">
                <button class="close" data-close="alert"></button>
                <span> Enter your username and password. </span>
            </div>
            <div class="form-group">
                <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                <label class="control-label visible-ie8 visible-ie9">Username</label>
                <input
                    class="form-control form-control-solid placeholder-no-fix"
                    type="text"
                    autocomplete="off"
                    placeholder="Email"
                    name="email"
                    v-model="user.email"/>
            </div>
            <div class="form-group">
                <label class="control-label visible-ie8 visible-ie9">Password</label>
                <input
                    class="form-control form-control-solid placeholder-no-fix"
                    type="password"
                    autocomplete="off"
                    placeholder="Password"
                    name="password"
                    v-model="user.password"/>
            </div>
            <div class="form-actions">
                <button
                    type="submit"
                    class="btn green uppercase">
                    Login
                </button>
                <router-link
                    to="/forget-password"
                    id="forget-password"
                    class="forget-password">
                    Forgot Password?
                </router-link>
            </div>
        </form>
        <a href="https://api-naut.livesystems.ch/auth/twitter" class="btn btn-block btn-social btn-twitter">
            <span class="fa fa-twitter"></span> Sign in with Twitter
        </a>
        <a href="https://api-naut.livesystems.ch/auth/google" class="btn btn-block btn-social btn-google">
            <span class="fa fa-google"></span> Sign in with Google
        </a>
        <a href="https://api-naut.livesystems.ch/auth/facebook" class="btn btn-block btn-social btn-facebook">
            <span class="fa fa-facebook"></span> Sign in with Facebook
        </a>
    </div>
</template>

<script>
    import api from 'dashboard/utils/api';

    export default {
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                },
                hasErrors: false
            };
        },

        methods: {
            signIn() {
                const { email, password } = this.user;

                if (email && password) {
                    this.hasErrors = false;

                    api.request
                        .post('/token', { email, password })
                        .then(this.handleToken)
                        .catch(err => console.log(err));
                } else {
                    this.hasErrors = true;
                }
            },
            handleToken(response) {
                const { token } = response.data;
                api.setToken('token', token);

                location.href = '/';
            },
            sendToken(provider, token) {
                return api.request
                    .post('/auth/' + provider + '/token', { 'token': token})

                    .then(this.handleToken)
                    .catch(err => console.log(err));
            }
        },
        mounted() {
            if (api.user()) {
                location.href = '/';
            }
        }
    }
</script>

<style scoped>
    .form-actions {
        border: none !important;
    }
</style>
