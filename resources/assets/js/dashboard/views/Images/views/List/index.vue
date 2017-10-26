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
                        placeholder="Suche"
                        name="searchTerm"
                        v-model.trim="searchTerm">
                </div>
            </div>

            <div class="col-md-6 text-right">
                <router-link
                    :to="{name: 'images.create'}"
                    class="btn btn-primary">
                    Bild hochladen
                </router-link>
            </div>
            <image-select-modal></image-select-modal>
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

        <h2 v-else class="text-center">Keine Bilder gefunden</h2>
    </div>
</template>
<script>
    import Item from './components/Item';
    import ImageSelectModal from 'dashboard/components/ImageSelectModal';

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
                    Vue.toast('Error in loading the Images list. Please refresh the page', {
                        className : ['nau_toast','nau_warning'],
                    });
                    this.isLoaded = true;
                });
        },

        components: {
            Item,
            ImageSelectModal
        },

        watch: {
            searchTerm() {
                this.navigate(1);
            }
        },

        methods: {
            deleteImage(image) {
                Api.http
                    .delete(`/images/${image.id}`)
                    .then(response => this.images = this.images.filter(item => item.id !== image.id))
                    .catch(err => Vue.toast('Error in deleting the Image. Please retry again', {
                        className : ['nau_toast','nau_warning'],
                    }));
            },

            navigate(page) {
                this.getPaginatedData(page)
                    .then(response => {
                        const { data, current_page, last_page, from } = response.data;

                        this.images = data;
                        this.currentPage = current_page;
                        this.pagesCount = last_page;
                    })
                    .catch(err => Vue.toast('Error in loading the Images list. Please refresh the page', {
                        className : ['nau_toast','nau_warning'],
                    }));
            },

            getPaginatedData(page) {
                if (this.searchTerm !== '') {
                    return Api.http.get(`/images?search=${this.searchTerm}&page=${page}`);
                }

                return Api.http.get(`/images?page=${page}`);
            }
        }
    }
</script>

<style>
    .table > tbody > tr > td {
        vertical-align: middle;
    }

    .image_selection_btn {
        margin-right: 10px;
    }
</style>
