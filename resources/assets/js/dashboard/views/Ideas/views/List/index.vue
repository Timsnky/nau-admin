<template>
    <div>
        <page-title title="Ideas" sub="List"/>
        <div class="row">
            <div class="col-md-6">
                <div v-if="ideas.length > 0 || searchTerm !== ''" class="input-icon">
                    <i class="fa fa-search"></i>
                    <input
                        type="search"
                        class="form-control"
                        placeholder="Search"
                        name="searchTerm"
                        v-model.trim="searchTerm">
                </div>
            </div>

            <div class="col-md-6 text-right">
                <router-link
                    :to="{name: 'ideas.create'}"
                    class="btn btn-primary pull-right">
                    Create
                </router-link>
            </div>
        </div>

        <h2 v-if="!isLoaded" class="text-center">Loading...</h2>

        <div v-else-if="ideas.length > 0">
            <div class="table-scrollable">
                <table class="table table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Autor</th>
                        <th>Options</th>
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
            </div>

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
                searchTerm: ''
            }
        },

        mounted() {
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

        components: {
            Item,
        },

        watch: {
            searchTerm() {
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
                if (this.searchTerm !== '') {
                    return Api.http.get(`/ideas?page=${page}&search=${this.searchTerm}`);
                }

                return Api.http.get(`/ideas?page=${page}`);
            }
        }
    }
</script>

<style>
    .table > tbody > tr > td {
        vertical-align: middle;
    }
</style>
