<template>
    <div>
        <div class="row">
            <div class="col-md-4">
                <div v-if="ideas.length > 0 || searchTerm !== ''" class="input-icon">
                    <i class="fa fa-search"></i>
                    <input
                        type="search"
                        class="form-control"
                        placeholder="Suche"
                        name="searchTerm"
                        v-model.trim="searchTerm">
                </div>
            </div>

            <div class="col-md-3">
                <multiselect
                    v-model="regionsFilter"
                    :options="regions"
                    label="name"
                    :multiple="true"
                    :hide-selected="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    track-by="id"
                    placeholder="Regionen auswählen"
                    select-label=""
                    selected-label=""
                    deselect-label=""
                />
            </div>

            <div class="col-md-5 text-right">
                <router-link
                    :to="{name: 'ideas.create'}"
                    class="btn blue">
                    <i class="fa fa-plus"></i> Neue Idee erstellen
                </router-link>
            </div>
        </div>

        <h2 v-if="!isLoaded" class="text-center">Loading...</h2>

        <div v-else-if="ideas.length > 0">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Titel</th>
                    <th>Autor</th>
                    <th>Channel</th>
                    <th>Datum</th>
                    <th class="text-right">Optionen</th>
                </tr>
                </thead>
                <tbody>
                <item
                    v-for="idea in ideas"
                    :key="idea.id"
                    :idea="idea"
                    @deleteIdea="deleteIdea"/>
                </tbody>
            </table>

            <div class="clearfix">
                <pagination
                    class="pull-right"
                    :items="ideas"
                    :currentPage="currentPage"
                    :pagesCount="pagesCount"
                    :itemsPerPage="itemsPerPage"
                    @navigate="navigate"/>
            </div>
        </div>

        <h2 v-else class="text-center">No ideas found</h2>
    </div>
</template>
<script>
    import Item from './components/Item';

    export default {
        data() {
            return {
                ideas: [],
                isLoaded: false,
                currentPage: 1,
                pagesCount: 1,
                itemsPerPage: 15,
                regionsFilter: [],
            }
        },

        mounted() {
            this.$store.dispatch('FETCH_REGIONS');
            this.getPaginatedData(this.currentPage)
                .then(response => {
                    const { data, current_page, per_page, last_page } = response.data;

                    this.ideas = data;
                    this.currentPage = current_page;
                    this.itemsPerPage = per_page;
                    this.pagesCount = last_page;
                    this.isLoaded = true;
                })
                .catch(err => {
                    console.log('Show some error message here');
                    this.isLoaded = true;
                });
        },

        computed: {
            regions() {
                return this.$store.state.regions;
            },
            searchTerm: {
                get() {
                    return this.$route.query.search || '';
                },
                set(value) {
                    this.$router.push({ query: Object.assign({}, this.$route.query, {search: value}) });
                }
            },
        },

        components: {
            Item,
        },

        watch: {
            searchTerm() {
                this.navigate(1);
            },
            regionsFilter() {
                this.navigate(1);
            }
        },

        methods: {
            deleteIdea(idea) {
                Api.http
                    .delete(`/ideas/${idea.id}`)
                    .then(response => this.ideas = this.ideas.filter(item => item.id !== idea.id))
                    .catch(err => console.log('Show some error message here'));
            },

            navigate(page) {
                this.getPaginatedData(page)
                    .then(response => {
                        const { data, current_page, last_page, from } = response.data;

                        this.ideas = data;
                        this.currentPage = current_page;
                        this.pagesCount = last_page;
                    })
                    .catch(err => console.log('Show some error message here'));
            },

            getPaginatedData(page) {
                let params = {};

                if (this.searchTerm !== '') {
                    params.search = this.searchTerm;
                }

                if(this.regionsFilter.length > 0) {
                    params.regions = this.regionsFilter.map((region) => {
                        return region.id;
                    });
                }

                return Api.http.get(`/ideas?${$.param(params)}`);
            }
        }
    }
</script>

<style>
    .table > tbody > tr > td {
        vertical-align: middle;
    }
</style>
