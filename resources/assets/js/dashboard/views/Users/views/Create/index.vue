<template>
    <div>
        <page-title title="Benutzer" sub="Erstellen" />

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        v-model.trim="user.name"
                        placeholder="Name"
                        class="form-control">
                </div>
            </div>

            <div class="form-body">
                <div class="form-group">
                    <label for="email">E-Mail</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        v-model.trim="user.email"
                        placeholder="E-Mail"
                        class="form-control">
                </div>
            </div>

            <div class="form-body">
                <div class="form-group">
                    <label for="email">Passwort</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        v-model.trim="user.password"
                        placeholder="Passwort"
                        class="form-control">
                </div>
            </div>

            <div class="form-body">
                <div :class="{'form-group': true, 'has-error': user.password !== user.passwordRepeat}">
                    <label class="control-label" for="email">Passwort wiederholen</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        v-model.trim="user.passwordRepeat"
                        placeholder="Passwort"
                        class="form-control">
                    <span v-if="user.password !== user.passwordRepeat" class="help-block">Passwörter stimmen nicht überein</span>
                </div>
            </div>

            <div class="form-body">
                <label class="mt-checkbox">
                    Anonymer Benutzer
                    <input v-model="user.anonymous" type="checkbox">
                    <span></span>
                </label>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit">
                    Erstellen
                </button>
                <router-link class="btn btn-danger" :to="{name: 'users.list'}">Abbrechen</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import DateTime from 'dashboard/components/DateTime';

    export default {
        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    password: '',
                    passwordRepeat: '',
                    anonymous: false,
                }
            }
        },

        methods: {
            handleSubmit() {
                const { name, email, password, passwordRepeat, anonymous } = this.user;

                if (name && email && (!password || password === passwordRepeat)) {
                    Api.http
                        .post('/users', { name, email, password, anonymous })
                        .then(response => this.$router.push({name: 'users.edit', params: {id: response.data.id}}))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },
        }
    }
</script>
