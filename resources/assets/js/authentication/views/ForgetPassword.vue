<template>
    <div>
        <div v-if="sent">
            <h3 class="font-green">E-Mail gesendet</h3>
            <p>Falls ein Account mit dieser E-Mail Adresse existiert, wurde ein Link für die zurücksetzung gesendet.</p>
        </div>

        <form v-if="!sent" class="forget-form" @submit.prevent="handleSubmit">
            <h3 class="font-green">Passwort vergessen?</h3>
            <p>Geben Sie bitte Ihre E-Mail Adresse an um Ihr Passwort zurückzusetzen.</p>
            <div class="form-group">
                <input
                    class="form-control placeholder-no-fix"
                    type="text"
                    autocomplete="off"
                    placeholder="E-Mail"
                    v-model="user.email"
                    name="email"/>
            </div>
            <div class="form-actions">
                <button
                    @click="goBack"
                    type="button"
                    id="back-btn"
                    class="btn green btn-outline">
                    Zurück
                </button>
                <button
                    type="submit"
                    class="btn btn-success uppercase pull-right">
                    Zurücksetzen
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
                user: {
                    email: ''
                },
                sent: false
            };
        },

        methods: {
            handleSubmit() {
                const { email } = this.user;

                if(!email) {
                    return;
                }

                api.request
                    .post('/password/forgot', { email })
                    .then(response => {
                        this.sent = true;
                    });
            },

            goBack() {
                this.$router.push('/login');
            }
        }
    }
</script>

<style>
    .forget-form {
        display: block !important;
    }
</style>
