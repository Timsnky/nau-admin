<template>
    <div>
        <div class="row image_selection_filters">
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
                <select class="form-control" name="user_id" id="user_id" v-model="userId">
                    <option :value="myUserId">My Images</option>
                    <option :value="0">All Images</option>
                </select>
            </div>
        </div>

        <h2 v-if="!isLoaded" class="text-center">Loading...</h2>

        <div v-else-if="images.length > 0">
            <div class="row image_selection_rows">
                <div v-for="image in images" class="col-md-6 col-lg-6 col-sm-6">
                    <div class="image_section_left image_chooser_section">
                        <div class="image_selection_section_image">
                            <img height="100px" width="150px" class="media-object image_choice" :src="image.url" alt="..." @click="dispatchImageSelected(image.id)">
                        </div>
                        <div class="image_section_details">
                            <p><strong>{{ image.name }}</strong></p>
                            <p>{{ image.lead }}</p>
                        </div>
                    </div>
                </div>
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
    import Pagination from 'dashboard/views/Images/views/List/components/Pagination';
    import api from 'dashboard/utils/api';

    export default {
        data() {
            return {
                images: [],
                isLoaded: false,
                currentPage: 1,
                pagesCount: 1,
                itemsPerPage: 15,
                searchTerm: '',
                userId : 0,
                myUserId : 0
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
                    this.myUserId = api.user().id;
                    this.userId = this.myUserId;
                })
                .catch(err => {
                    Vue.toast('Error in loading the Images. Please refresh the page', {
                        className : ['nau_toast','nau_warning'],
                    });
                    this.isLoaded = true;
                });
        },

        components: {
            Pagination
        },

        watch: {
            searchTerm() {
                this.navigate(1);
            },
            userId() {
                this.navigate(1);
            }
        },

        methods: {
            deleteImage(image) {
                request
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
                    .catch(err => Vue.toast('Error in retreiving the Images. Please retry again', {
                        className : ['nau_toast','nau_warning'],
                    }));
            },

            getPaginatedData(page) {
                var searchString = '';
                var userString = '';

                if (this.searchTerm !== '') {
                    searchString += `search=${this.searchTerm}&`;
                }

                if(this.userId != 0)
                {
                    userString += `user_id=${this.userId}&`;
                }

                return request.get(`/images?` + searchString + userString + `page=${page}`);
            },

            dispatchImageSelected(id) {
                api.setImage(id);
                this.reset();
                $('#imageSelectionModal').modal('hide');
            },

            reset() {
                this.searchTerm = "";
                this.myUserId = api.user().id;
                this.userId = this.myUserId;
            }
        }
    }
</script>

<style>
    .image_selection_filters {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .image_selection_rows {
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .image_selection_section_image {
        margin-right: 10px;
        margin-top: auto;
        margin-bottom: auto;
        width: 240px;
    }

    .image_selection_section_image img, .image_selection_section_image video {
        max-height: 180px;
        width: auto;
        max-width: 240px;
        height: auto;
    }

    .close {
        text-indent: initial;
    }

    .image_choice {
        cursor: pointer;
    }

    .image_chooser_section {
        padding-top: 10px;
        padding-bottom: 10px;
        height: 120px;
    }
</style>
