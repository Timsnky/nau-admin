<template>
    <form class="forget-form" @submit.prevent="handleSubmit">
        <h3 class="font-green">Forget Password ?</h3>
        <div
            class="alert alert-danger"
            v-if="hasErrors">
            <button class="close" data-close="alert"></button>
            <span>Enter your email</span>
        </div>
        <p> Enter your e-mail address below to reset your password. </p>
        <div class="form-group">
            <input
                class="form-control placeholder-no-fix"
                type="text"
                autocomplete="off"
                placeholder="Email"
                v-model="user.email"
                name="email"/>
        </div>
        <div class="form-actions">
            <button
                @click="goBack"
                type="button"
                id="back-btn"
                class="btn green btn-outline">
                Back
            </button>
            <button
                type="submit"
                class="btn btn-success uppercase pull-right">
                Submit
            </button>
        </div>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    email: ''
                },
                hasErrors: false,
            };
        },

        methods: {
            handleSubmit() {
                const { email } = this.user;

                if (email) {
                    this.hasErrors = false;
                } else {
                    this.hasErrors = true;
                }
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
