<template>
    <div>
        <page-title title="Benutzer" sub="Liste" />

        <div class="row">
            <div class="col-md-6">
                <div v-if="users.length > 0 || search !== ''" class="input-icon">
                    <i class="fa fa-search"></i>
                    <input
                        type="search"
                        class="form-control"
                        placeholder="Suche"
                        :value="search"
                        @input="$router.push({ query: Object.assign({}, $route.query, {search: $event.target.value}) });"
                        >
                </div>
            </div>

            <div class="col-md-6 text-right">
                <router-link
                    :to="{name: 'users.create'}"
                    class="btn blue pull-right">
                    <i class="fa fa-plus"></i> Erstellen
                </router-link>
            </div>
        </div>

        <h2 v-if="!isLoaded" class="text-center">Loading...</h2>

        <div v-else-if="users.length > 0">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>E-Mail</th>
                    <th>Erstellt</th>
                    <th class="text-right">Aktionen</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ moment(user.created_at).format('DD.MM.YYYY HH:mm') }}</td>
                        <td class="text-right">
                            <router-link
                                :to="{name: 'users.edit', params: {id: user.id}}"
                                class="btn default">
                                <i class="fa fa-edit"></i> Bearbeiten
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="clearfix">
                <pagination
                    class="pull-right"
                    :items="users"
                    :currentPage="page"
                    :pagesCount="pagesCount"
                    :itemsPerPage="itemsPerPage"
                    @navigate="navigate"/>
            </div>
        </div>

        <h2 v-else class="text-center">Keine Benutzer gefunden</h2>
    </div>
</template>
<script>
    export default {
        props: {
            search: { type: String, default: '' },
            page: { type: Number, default: 1 },
        },

        data() {
            return {
                users: [],
                isLoaded: false,
                pagesCount: 1,
                itemsPerPage: 15,
            }
        },

        computed: {
            moment() {
                return moment;
            }
        },

        watch: {
            search: _.debounce(function() {
                this.navigate(1);
            }, 200)
        },

        created() {
            this.getPaginatedData(this.page)
                .then(response => {
                    const { data, current_page, per_page, last_page } = response.data;

                    this.users = data;
                    this.itemsPerPage = per_page;
                    this.pagesCount = last_page;
                    this.isLoaded = true;
                })
                .catch(err => {
                    console.error(err);
                    this.isLoaded = true;
                });
        },

        methods: {
            getPaginatedData(page) {
                var params = {
                    search: this.search,
                    page,
                };

                return Api.http.get(`/users?${$.param(params)}`);
            },

            navigate(page) {
                this.getPaginatedData(page)
                    .then(response => {
                        const { data, current_page, last_page, from } = response.data;

                        this.users = data;
                        this.$router.push({ query: Object.assign({}, this.$route.query, {page: current_page}) });
                        this.pagesCount = last_page;
                    });
            },
        }
    }
</script>
