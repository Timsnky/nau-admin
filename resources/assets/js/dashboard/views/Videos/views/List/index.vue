<template>
    <div>
        <page-title title="Videos" sub="List"/>
        <div class="row">
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
                <router-link
                    :to="{name: 'videos.create'}"
                    class="btn btn-primary pull-right">
                    Upload
                </router-link>
                <button type="button" class="btn btn-primary image_selection_btn" data-toggle="modal" data-target="#videoSelectionModal">
                    Choose Video
                </button>
            </div>
        </div>

        <h2 v-if="!isLoaded" class="text-center">Loading...</h2>

        <div v-else-if="videos.length > 0">
            <div class="table-scrollable">
                <table class="table table-hover table-bordered">
                    <tbody>
                    <item
                        v-for="video in videos"
                        :key="video.id"
                        :video="video"
                        @deleteVideo="deleteVideo"/>
                    </tbody>
                </table>
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
    import Item from './components/Item';
    import Pagination from './components/Pagination';

    export default {
        data() {
            return {
                videos: [],
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

                    this.videos = data;
                    this.currentPage = current_page;
                    this.itemsPerPage = per_page;
                    this.pagesCount = last_page;
                    this.isLoaded = true;
                })
                .catch(err => {
                    Vue.toast('Error in retreiving the videos', {
                        className : ['nau_toast','nau_warning'],
                    });
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
            deleteVideo(video) {
                Api.http
                    .delete(`/videos/${video.id}`)
                    .then(response => this.videos = this.videos.filter(item => item.id !== video.id))
                    .catch(err => Vue.toast('Error occured while deleting video. Please retry', {
                        className : ['nau_toast','nau_warning'],
                    }));
            },

            navigate(page) {
                this.getPaginatedData(page)
                    .then(response => {
                        const { data, current_page, last_page, from } = response.data;

                        this.videos = data;
                        this.currentPage = current_page;
                        this.pagesCount = last_page;
                    })
                    .catch(err => Vue.toast('Error occured while retrieving the Images. Please retry', {
                        className : ['nau_toast','nau_warning'],
                    }));
            },

            getPaginatedData(page) {
                if (this.searchTerm !== '') {
                    return Api.http.get(`/videos?search=${this.searchTerm}&page=${page}`);
                }

                return Api.http.get(`/videos?page=${page}`);

//                Echo.private('notifications.' + Api.user().id)
//                    .listen('VideoProcessed', (e) => {
//                        this.notifications.unshift({
//                            text: e.video.name + ' is done processing',
//                            time: moment()
//                        });
//                        this.newNotificationsCount++;
//                    });
            }
        }
    }
</script>

<style>
    .table > tbody > tr > td {
        vertical-align: middle;
    }
</style>
