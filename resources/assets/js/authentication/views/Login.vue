<template>
    <div>
        <form class="login-form" @submit.prevent="signIn">
            <h3 class="form-title font-green">Sign In</h3>
            <div :class="{ 'form-group': true, 'has-error': errors.email }">
                <input
                    class="form-control"
                    type="email"
                    autocomplete="off"
                    required
                    autofocus
                    placeholder="Email"
                    name="email"
                    v-model="user.email"/>
                    <span v-if="errors.email" class="help-block">{{ errors.email[0] }}</span>
            </div>
            <div :class="{ 'form-group': true, 'has-error': errors.password }">
                <input
                    required
                    class="form-control form-control-solid placeholder-no-fix"
                    type="password"
                    autocomplete="off"
                    placeholder="Password"
                    name="password"
                    v-model="user.password"/>
            </div>
            <span v-if="errors.passwordemail" class="help-block">{{ errors.password[0] }}</span>
            <div class="form-actions">
                <button
                    type="submit"
                    class="btn green uppercase">
                    Login
                </button>
                <!-- <router-link
                    to="/forget-password"
                    id="forget-password"
                    class="forget-password">
                    Forgot Password?
                </router-link> -->
            </div>
        </form>
        <a :href="social('twitter')" class="btn btn-block btn-social btn-twitter">
            <span class="fa fa-twitter"></span> Sign in with Twitter
        </a>
        <a :href="social('google')" class="btn btn-block btn-social btn-google">
            <span class="fa fa-google"></span> Sign in with Google
        </a>
        <a :href="social('facebook')" class="btn btn-block btn-social btn-facebook">
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
                errors: {}
            };
        },

        methods: {
            social(provider) {
                return api.baseURL + '/auth/' + provider + '?redirect=' + window.location.origin;
            },
            signIn() {
                const { email, password } = this.user;

                if (email && password) {
                    api.request
                        .post('/token', { email, password })
                        .then(response => {
                            const { token } = response.data;
                            api.setToken('token', token);

                            location.href = '/';
                        })
                        .catch((error) => {
                            if(error.response.status === 401) {
                                this.errors = {
                                    'email': [error.response.data.message]
                                };
                            } else {
                                this.errors = error.response.data.errors;
                            }
                        });
                }
            }
        },
        mounted() {
            if (api.user().id) {
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
