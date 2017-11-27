<template>
    <div class="row">
        <page-title title="Benutzer" sub="Bearbeiten" />
        <div class="col-md-6">
            <form @submit.prevent="handleSubmit">
                <div class="form-body">
                    <div class="form-group">
                        <label for="name">Avatar ändern</label><br>
                        <img width="100px" height="100px" class="rounded" :src="user.avatar" />
                        <input type="file" @change="onFileChange" accept="image/*">
                    </div>
                </div>

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

                <div class="form-body">
                    <label class="mt-checkbox">
                        Kann Community Banner hochladen
                        <input v-model="user.community_banner" type="checkbox">
                        <span></span>
                    </label>
                </div>

                <div class="form-body">
                    <label class="mt-checkbox">
                        Aktiv (Kann sich anmelden)
                        <input v-model="user.active" type="checkbox">
                        <span></span>
                    </label>
                </div>

                <div class="form-actions">
                    <button
                        class="btn blue"
                        type="submit">
                        Speichern
                    </button>
                    <button
                        @click="impersonate"
                        class="btn blue"
                        type="button">
                        <i class="fa fa-user"></i>
                        Impersonate
                    </button>
                    <router-link class="btn red" :to="{name: 'users.list'}">Abbrechen</router-link>
                </div>
            </form>
        </div>

        <div class="col-md-3">
            <h3>Rollen</h3>
            <div class="mt-checkbox-list">
                <label v-for="role in roles" class="mt-checkbox">
                    {{ role.display_name }}
                    <input type="checkbox" :value="role" v-model="user.roles" @change="updateRole(role)">
                    <span></span>
                </label>
            </div>

            <h3>Arbeitstyp</h3>
            <div class="mt-radio-list">
                <label v-for="type in workTypes" class="mt-radio" @change="updateWorkType">
                    {{ type.name }}
                    <input type="radio" :value="type.id" v-model="user.work_type_id">
                    <span></span>
                </label>
            </div>
        </div>

        <div class="col-md-3">
            <h3>Channel</h3>
            <div class="mt-radio-list">
                <label v-for="channel in channels" class="mt-radio" @change="updateChannel">
                    {{ channel.name }}
                    <input type="radio" :value="channel" v-model="user.channel">
                    <span></span>
                </label>
            </div>

            <h3>Socialmedia Namen</h3>
            <div class="form-group">
                <label>Twitter</label>
                <input type="text" class="form-control" v-model="social.twitter" placeholder="nau_live">
            </div>

            <div class="form-group">
                <label>Facebook</label>
                <input type="text" class="form-control" v-model="social.facebook" placeholder="naumedia">
            </div>

            <div class="form-group">
                <label>Instagram</label>
                <input type="text" class="form-control" v-model="social.instagram" placeholder="carba37">
            </div>

        </div>





    </div>
</template>

<script>
    export default {
        data() {
            return {
                social: {
                    twitter: '',
                    facebook: '',
                    instagram: '',
                },
                workTypes: {},
                channels: {},
                roles: {},
                avatarChanged: false,
                user: {
                    name: '',
                    avatar: '',
                    email: '',
                    password: '',
                    passwordRepeat: '',
                    anonymous: false,
                    active: true,
                    community_banner: false,
                    roles: [],
                    channel: {},
                }
            }
        },

        created() {
            Api.http
                .get(`/users/${this.$route.params.id}`)
                .then(response => this.user = response.data)
            ;

            Api.http
                .get('/roles')
                .then(response => this.roles = response.data)
            ;

            Api.http
                .get('/work-types')
                .then(response => this.workTypes = response.data)
            ;

            Api.http
                .get('/channels')
                .then(response => this.channels = response.data)
            ;
        },

        watch: {
            user(user) {
                if(user.social_account_names != null) {
                    user.social_account_names.forEach((social) => {
                        this.social[social.provider] = social.name;
                    })
                }
            }
        },

        methods: {
            hasRole(role) {
                var has = false;

                $.each(this.user.roles, function(key, r) {
                    if(role.id === r.id) {
                        has = true;
                    }
                })

                return has;
            },

            updateChannel() {
                Api.http.put(`/users/${this.user.id}/channels/${this.user.channel.id}`);
            },

            updateWorkType() {
                Api.http.put(`/work-types/${this.user.work_type_id}/users/${this.user.id}`);
            },

            updateRole(role) {
                if(this.hasRole(role)) {
                    Api.http.put(`/users/${this.user.id}/roles/${role.id}`);
                } else {
                    Api.http.delete(`/users/${this.user.id}/roles/${role.id}`);
                }
            },

            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },

            createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.user.avatar = e.target.result;
                    vm.avatarChanged = true;
                };
                reader.readAsDataURL(file);
            },

            handleSubmit() {
                const { name, email, password, passwordRepeat, anonymous, community_banner, active } = this.user;

                if (name && (!password || (password && password === passwordRepeat))) {
                    let data = { name, email, password, anonymous, community_banner, active };
                    if(this.avatarChanged) {
                        data.avatar = this.user.avatar;
                    }

                    data.social_account_names = {
                        twitter: this.social.twitter,
                        facebook: this.social.facebook,
                        instagram: this.social.instagram,
                    };

                    Api.http
                        .put(`/users/${this.$route.params.id}`, data)
                        .then(response => this.$router.push({name: 'users.list'}))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            async impersonate() {
                var response = await Api.http.post(`/impersonate/${this.user.id}`)
                window.location.href = '/';
            },
        }
    }
</script>
