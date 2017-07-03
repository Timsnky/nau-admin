<template>
    <div>
        <div class="row image_selection_filters">
            <div class="col-md-6">
                <div v-if="videos.length > 0 || searchTerm !== ''" class="input-icon">
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
                    <option :value="myUserId">My Videos</option>
                    <option :value="0">All Videos</option>
                </select>
            </div>
        </div>

        <h2 v-if="!isLoaded" class="text-center">Loading...</h2>

        <div v-else-if="videos.length > 0">
            <div class="row image_selection_rows">
                <div v-for="video in videos" class="col-md-6 col-lg-6 col-sm-6">
                    <div class="image_section_left image_chooser_section">
                        <div class="image_section_image">
                            <video width="240" height="180" controls>
                                <source :src="video.urls[0]" type="video/mp4">
                                <source :src="video.urls[1]" type="video/webm">
                            </video>
                        </div>
                        <div class="image_section_details">
                            <p><strong>{{ video.name }}</strong></p>
                            <p>{{ video.lead }}</p>
                            <p><a href="#" class="btn btn-primary btn-sm" @click="dispatchVideoSelected(video.id)">Select Video</a></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="clearfix">
                <pagination
                        class="pull-right"
                        :items="videos"
                        :currentPage="currentPage"
                        :pagesCount="pagesCount"
                        :itemsPerPage="itemsPerPage"
                        @navigate="navigate"/>
            </div>
        </div>

        <h2 v-else class="text-center">No videos uploaded</h2>
    </div>
</template>
<script>
    import request from 'dashboard/utils/request';
    import Pagination from 'dashboard/views/Videos/views/List/components/Pagination';
    import api from 'dashboard/utils/api';

    export default {
        data() {
            return {
                videos: [],
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

                    this.videos = data;
                    this.currentPage = current_page;
                    this.itemsPerPage = per_page;
                    this.pagesCount = last_page;
                    this.isLoaded = true;
                    this.myUserId = api.user().id;
                    this.userId = this.myUserId;
                })
                .catch(err => {
                    console.log('Show some error message here');
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
            navigate(page) {
                this.getPaginatedData(page)
                    .then(response => {
                        const { data, current_page, last_page, from } = response.data;

                        this.videos = data;
                        this.currentPage = current_page;
                        this.pagesCount = last_page;
                    })
                    .catch(err => console.log('Show some error message here'));
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

                return request.get(`/videos?` + searchString + userString + `page=${page}`);
            },

            dispatchVideoSelected(id) {
                this.$emit('videoSelected', id);
                this.reset();
                $('#videoSelectionModal').modal('hide');
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
        padding-top: 10px;
        padding-bottom: 10px;
    }
</style>
