<template>
    <div>
        <page-title title="Images" sub="List"/>
        <div class="row">
            <div class="col-md-6">
                <div v-if="images.length > 0 || searchTerm !== ''" class="input-icon">
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
                    :to="{name: 'images.create'}"
                    class="btn btn-primary pull-right">
                    Upload
                </router-link>
            </div>
        </div>

        <h2 v-if="!isLoaded" class="text-center">Loading...</h2>

        <div v-else-if="images.length > 0">
            <div class="table-scrollable">
                <table class="table table-hover table-bordered">
                    <tbody>
                    <item
                        v-for="image in images"
                        :key="image.id"
                        :image="image"
                        @deleteImage="deleteImage"/>
                    </tbody>
                </table>
            </div>

            <div class="clearfix">
                <pagination
                    class="pull-right"
                    :items="images"
                    :currentPage="currentPage"
                    :pagesCount="pagesCount"
                    :itemsPerPage="itemsPerPage"
                    @navigate="navigate"/>
            </div>
        </div>

        <h2 v-else class="text-center">No images uploaded</h2>
    </div>
</template>
<script>
    import request from 'dashboard/utils/request';
    import Item from './components/Item';
    import Pagination from './components/Pagination';

    export default {
        data() {
            return {
                images: [],
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

                    this.images = data;
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
            Pagination
        },

        watch: {
            searchTerm() {
                this.navigate(1);
            }
        },

        methods: {
            deleteImage(image) {
                request
                    .delete(`/images/${image.id}`)
                    .then(response => this.images = this.images.filter(item => item.id !== image.id))
                    .catch(err => console.log('Show some error message here'));
            },

            navigate(page) {
                this.getPaginatedData(page)
                    .then(response => {
                        const { data, current_page, last_page, from } = response.data;

                        this.images = data;
                        this.currentPage = current_page;
                        this.pagesCount = last_page;
                    })
                    .catch(err => console.log('Show some error message here'));
            },

            getPaginatedData(page) {
                if (this.searchTerm !== '') {
                    return request.get(`/images/search?query=${this.searchTerm}&page=${page}`);
                }

                return request.get(`/images?page=${page}`);
            }
        }
    }
</script>

<style>
    .table > tbody > tr > td {
        vertical-align: middle;
    }
</style>
