<template>
    <div>
        <h3 class="form-title font-green">Anmelden</h3>
        <div class="row border-between">
            <div class="col-md-6">
                <form v-show="!passwordScreen" class="login-form" @submit.prevent="showPasswordScreen">
                    <div :class="{ 'form-group': true, 'has-error': errors.email }">
                        <input
                        class="form-control"
                        type="email"
                        required
                        autofocus
                        placeholder="E-Mail"
                        name="email"
                        v-model="user.email"
                        />
                        <span v-if="errors.email" class="help-block">{{ errors.email[0] }}</span>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-success" value="Weiter">
                    </div>
                </form>

                <transition name="fade">
                    <div v-show="passwordScreen">
                        <form class="login-form" @submit.prevent="signIn">
                            <div class="form-group">
                                <button v-show="!magicLinkSent" type="button" class="magic-link btn btn-success btn-block" @click="magicLink">
                                    <i class="fa fa-magic" aria-hidden="true"></i> Magischer Link
                                </button>
                                <h3 v-show="magicLinkSent">Magischer Link wurde gesendet.</h3>
                            </div>
                            <h3 class="or">oder</h3>
                            <h5>{{ user.email }}</h5>
                            <span v-if="errors.email" class="text-danger help-block">{{ errors.email[0] }}</span>
                            <div :class="{ 'form-group': true, 'has-error': errors.password }">
                                <input
                                required
                                class="form-control form-control-solid placeholder-no-fix"
                                type="password"
                                ref="password"
                                autocomplete="off"
                                placeholder="Passwort"
                                name="password"
                                v-model="user.password"/>
                                <span v-if="errors.password" class="help-block">{{ errors.password[0] }}</span>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-success">Anmelden</button>
                                <a v-show="!passwortForgotSent" class="forget-password" @click.prevent="forgotPassword">Passwort vergessen</a>
                                <p v-show="passwortForgotSent" class="forget-password">Zurücksetzungslink gesendet.</p>
                            </div>
                        </form>
                    </div>
                </transition>
            </div>

            <div class="col-md-6">
                <a :href="social('twitter')" class="btn btn-block btn-social btn-twitter">
                    <span class="fa fa-twitter"></span> Mit Twitter anmelden
                </a>
                <a :href="social('google')" class="btn btn-block btn-social btn-google">
                    <span class="fa fa-google"></span> Mit Google anmelden
                </a>
                <a :href="social('facebook')" class="btn btn-block btn-social btn-facebook">
                    <span class="fa fa-facebook"></span> Mit Facebook anmelden
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                passwordScreen: false,
                magicLinkSent: false,
                passwortForgotSent: false,
                user: {
                    email: '',
                    password: '',
                },
                errors: {}
            };
        },
        methods: {
            social(provider) {
                return Api.host + '/auth/' + provider + '?redirect=' + window.location.origin;
            },
            signIn() {
                const { email, password } = this.user;

                if (email && password) {
                    Api.http
                    .post('/token', { email, password })
                    .then(response => {
                        const { token } = response.data;
                        Api.setToken('token', token);

                        location.href = '/';
                    })
                    .catch((error) => {
                        if(error.response.status === 401) {
                            this.errors = {
                                'password': ['Das Passwort ist nicht korrekt.']
                            };
                        } else {
                            this.errors = error.response.data.errors;
                        }
                        console.error(error);
                    });
                }
            },
            magicLink() {
                const { email, password } = this.user;
                var redirect = window.location.origin;

                Api.http
                    .post('/auth/magic', { email, redirect })
                    .then(response => {
                        this.magicLinkSent = true;
                    })
            },
            forgotPassword() {
                const { email, password } = this.user;

                Api.http
                    .post('/password/forgot', { email })
                    .then(response => {
                        this.passwortForgotSent = true;
                    });
            },
            showPasswordScreen() {
                this.passwordScreen = true;
                setTimeout(() => {
                    this.$refs.password.focus();
                }, 200);
            }
        },
        mounted() {
            console.log(Api.getToken(), Api.user().id);
            if (Api.getToken() && Api.user().id) {
                location.href = '/';
            }
        }
    }
</script>

<style scoped>
    .form-actions {
        border: none !important;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0
    }

    .or {
        font-weight: bold;
    }

    .magic-link {
        font-size: 1.5em;
        padding: .7em;
    }
</style>
