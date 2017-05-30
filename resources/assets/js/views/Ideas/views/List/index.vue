<template>
    <div>
        <page-title title="Idea List" sub="sub heading"/>
        <h2 v-if="!isLoaded" class="text-center">Loading...</h2>

        <div v-else-if="ideas.length > 0">
            <div class="clearfix">
                <form class="form-inline pull-left">
                    <div class="input-icon">
                        <i class="fa fa-search"></i>
                        <input
                            type="search"
                            class="form-control"
                            placeholder="Search">
                    </div>
                </form>

                <router-link
                    :to="{name: 'ideas.create'}"
                    class="btn btn-primary pull-right">
                    Create
                </router-link>
            </div>

            <div class="table-scrollable">
                <table class="table table-hover table-bordered">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                    <item
                        v-for="(idea, index) in ideas"
                        :key="idea.id"
                        :index="indexStartsFrom + index"
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
    import Pagination from './components/Pagination';

    export default {
        data() {
            return {
                ideas: [],
                isLoaded: false,
                currentPage: 1,
                pagesCount: 1,
                itemsPerPage: 15,
                indexStartsFrom: 1
            }
        },

        mounted() {
            this.getPaginatedData()
                .then(response => {
                    const { data, current_page, per_page, last_page, from } = response.data;

                    this.ideas = data;
                    this.currentPage = current_page;
                    this.itemsPerPage = per_page;
                    this.pagesCount = last_page;
                    this.indexStartsFrom = from;
                    this.isLoaded = true;
                })
                .catch(err => {
                    console.log('Show some error message here');
                    this.isLoaded = true;
                });
        },

        components: {
            item: Item,
            pagination: Pagination
        },

        methods: {
            deleteIdea(idea) {
                this.ideas = this.ideas.filter(item => item.id !== idea.id);

                axios
                    .delete(`https://api-naut.livesystems.ch/ideas/${idea.id}`)
                    .then(response => console.log(response))
                    .catch(err => console.log('Show some error message here'));
            },

            navigate(page) {
                this.getPaginatedData(page)
                    .then(response => {
                        const { data, current_page, last_page, from } = response.data;

                        this.ideas = data;
                        this.currentPage = current_page;
                        this.pagesCount = last_page;
                        this.indexStartsFrom = from;
                    })
                    .catch(err => console.log('Show some error message here'));
            },

            getPaginatedData(page = 1) {
                return axios.get(`https://api-naut.livesystems.ch/ideas?page=${page}`);
            }
        }
    }
</script>

<style>
    .table > tbody > tr > td {
        vertical-align: middle;
    }
</style>
