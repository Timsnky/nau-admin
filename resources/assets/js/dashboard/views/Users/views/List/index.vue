<template>
    <div>
        <page-title title="Benutzer" sub="Liste" />

        <div class="row">
            <div class="col-xs-12 text-right">
                <router-link
                    :to="{name: 'users.create'}"
                    class="btn btn-primary pull-right">
                    Erstellen
                </router-link>
            </div>
        </div>

        <h2 v-if="!isLoaded" class="text-center">Loading...</h2>

        <div v-else-if="users.length > 0">
            <div class="table-scrollable">
                <table class="table table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>E-Mail</th>
                        <th>Erstellt</th>
                        <th>Aktionen</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users">
                            <td>{{ user.id }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ formatDate(user.created_at) }}</td>
                            <td>
                                <router-link
                                    :to="{name: 'users.edit', params: {id: user.id}}"
                                    class="btn btn-warning">
                                    Edit
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <h2 v-else class="text-center">No users found</h2>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                users: [],
                isLoaded: false,
            }
        },

        created() {
            Api.http
                .get('/users')
                .then(response => {
                    this.users = response.data;
                    this.isLoaded = true;
                })
                .catch(err => {
                    console.log('Show some error message here');
                    this.isLoaded = true;
                });
        },

        components: {

        },

        methods: {
            formatDate(date) {
                return moment(date).format('DD.MM.YYYY');
            }
        }
    }
</script>
