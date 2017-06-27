<template>
    <div>
        <form class="forget-form" @submit.prevent="handleSubmit">
            <h3 class="font-green">Neues Passwort setzen</h3>
            <p></p>
            <div class="form-group">
                <input
                    class="form-control placeholder-no-fix"
                    type="password"
                    autocomplete="off"
                    placeholder="Neues Passwort"
                    v-model="password"
                    name="password"/>
            </div>
            <div :class="{ 'form-group': true, 'has-error': errors.passwordRepeat }">
                <input
                    class="form-control placeholder-no-fix"
                    type="password"
                    autocomplete="off"
                    placeholder="Neues Passwort wiederholen"
                    v-model="passwordRepeat"
                    />
                <span v-if="errors.passwordRepeat" class="help-block">{{ errors.passwordRepeat[0] }}</span>
            </div>
            <div class="form-actions">
                <button
                    type="submit"
                    class="btn btn-success uppercase pull-right">
                    Bestätigen
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import api from 'dashboard/utils/api';

    export default {
        data() {
            return {
                password: '',
                passwordRepeat: '',
                errors: {}
            };
        },
        computed: {
            token() {
                return this.$route.query.token;
            }
        },

        methods: {
            handleSubmit() {
                const { password, passwordRepeat, token } = this;

                if( password !== passwordRepeat) {
                    this.errors.passwordRepeat = [
                        'Passwörter stimmen nicht überein.',
                    ];
                    return;
                }

                if(!password) {
                    return;
                }

                api.request
                    .post('/password/reset', { password, token })
                    .then(response => {
                        this.$router.push('/login');
                    })
                    // do catch block
                    ;
            },
        },
        mounted() {
            if(!this.token) {
                this.$router.push('/forget-password');
            }
        }
    }
</script>

<style>
    .forget-form {
        display: block !important;
    }
</style>
