<template>
    <div class="modal fade" id="videoSelectionModal" tabindex="-1" role="dialog" aria-labelledby="videoSelectionModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal_title_bar">
                        <h4 class="modal-title" id="myModalLabel">Videos</h4>
                        <button type="button" class="btn btn-primary btn-sm add_btn" :disabled="addingVideo" @click="showAddVideo()"><i class="fa fa-plus"></i></button>
                        <button type="button" class="btn btn-danger btn-sm close_btn" data-dismiss="modal" aria-label="Close"><i class="fa fa-close"></i></button>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form-group" v-if="addingVideo">
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Video</label>
                                <input
                                        class="form-control"
                                        type="file"
                                        name="video"
                                        id="video"
                                        @change="videoAdded"/>

                            </div>
                            <div class="col-md-6 form-group">
                                <label>Dateiname *</label>
                                <input
                                        type="text"
                                        name="name"
                                        v-model.trim="video.name"
                                        placeholder="Dateiname"
                                        class="form-control">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Bildunterschrift</label>
                                <input
                                        type="text"
                                        name="lead"
                                        v-model.trim="video.lead"
                                        placeholder="Bildunterschrift"
                                        class="form-control">
                                </input>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Quelle *</label>
                                <input
                                        type="text"
                                        name="source"
                                        v-model.trim="video.source"
                                        placeholder="Quelle"
                                        class="form-control">
                            </div>
                        </div>

                        <div class="form-actions">
                            <button
                                    @click="closeAddVideo()"
                                    class="btn btn-danger"
                                    type="button">
                                Schliessen
                            </button>
                            <button
                                    @click="submitVideoDetails()"
                                    class="btn btn-primary"
                                    type="button"
                                    :disabled="! video.video || !video.name || !video.source || !video.lead || submitting">
                                Video hinzufügen <span v-if="submitting"> &nbsp;(Uploading <i class="fa fa-spinner fa-spin"></i>)</span>
                            </button>
                        </div>
                    </div>
                    <div v-if="! addingVideo">
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
                                    <option :value="myUserId">Meine Videos</option>
                                    <option :value="0">Alle Videos</option>
                                </select>
                            </div>
                        </div>

                        <h2 v-if="!isLoaded" class="text-center">Laden...</h2>

                        <div v-else-if="videos.length > 0">
                            <div class="row image_selection_rows">
                                <div v-for="video in videos" class="col-md-6 col-lg-6 col-sm-6">
                                    <div class="image_section_left video_chooser_section">
                                        <div class="image_selection_section_image">
                                            <video controls>
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

                        <h2 v-else class="text-center">Keine Videos Hochgeladen</h2>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import Pagination from 'dashboard/views/Videos/views/List/components/Pagination';

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
                myUserId : 0,
                addingVideo: false,
                video: {
                    video: '',
                    name: '',
                    lead: '',
                    source: ''
                },
                submitting : false
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
                    this.myUserId = Api.user().id;
                    this.userId = this.myUserId;
                })
                .catch(err => {
                    Vue.toast('Error in retreiving the Videos. Please retry again', {
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
            navigate(page) {
                this.isLoaded = false;
                this.getPaginatedData(page)
                    .then(response => {
                        const { data, current_page, last_page, from } = response.data;

                        this.videos = data;
                        this.currentPage = current_page;
                        this.pagesCount = last_page;
                        this.isLoaded = true;
                    })
                    .catch(err => {
                        Vue.toast('Error in retreiving the Videos. Please retry again', {
                            className : ['nau_toast','nau_warning'],
                        });
                    });
            },

            getPaginatedData(page) {
                var searchString = '';
                var userString = '';

                if (this.searchTerm !== '') {
                    searchString += `search=${this.searchTerm}&`;
                }

                if(this.userId !== 0)
                {
                    userString += `user_id=${this.userId}&`;
                }

                return Api.http.get(`/videos?` + searchString + userString + `page=${page}`);
            },

            dispatchVideoSelected(id) {
                Api.setVideo(id);
                this.reset();
                $('#videoSelectionModal').modal('hide');
            },

            reset() {
                this.searchTerm = "";
                this.myUserId = Api.user().id;
                this.userId = this.myUserId;
                this.submitting = false;
            },

            //Show the video addition form
            showAddVideo()
            {
                this.addingVideo = true;
            },

            //Close the add video section
            closeAddVideo()
            {
                this.addingVideo = false;
                this.submitting = false;
                this.video = {
                    video: '',
                    lead: '',
                    name: '',
                    source: ''
                }
            },

            //Handle when video is uploaded
            videoAdded()
            {
                let fileElement = document.getElementById('video');
                let vm = this;

                if (!fileElement) return;

                for (var i = 0; i < fileElement.files.length; i++)
                {
                    var reader = new FileReader();

                    reader.readAsDataURL(fileElement.files[i]);

                    reader.onload = (e) =>
                    {
                        vm.video.video = e.target.result;
                    };
                }
            },

            //Submit the video details
            submitVideoDetails()
            {
                this.submitting = true;
                let vm = this;

                Api.http
                    .post(`/videos`, {
                        name: this.video.name,
                        lead: this.video.lead,
                        source: this.video.source,
                        user_id: Api.user().id
                    })
                    .then(response => {
                        if(response.status === 201)
                        {
                            vm.startVideoUpload(response);
                        }
                        else
                        {
                            Vue.toast('Error in uploading the selected video. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Start the video upload
            startVideoUpload(data)
            {
                let uploadUrl = data.data.upload_url;
                let urlArray = uploadUrl.split("api-naut.livesystems.ch");
                let tokenString = urlArray[urlArray.length - 1];

                Api.http
                    .put(tokenString, {
                        video : this.video.video
                    })
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.completeVideoUpload(response);
                        }
                        else
                        {
                            Vue.toast('Error in uploading the selected video. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Complete the video upload
            completeVideoUpload(data)
            {
                let uploadUrl = data.data.complete_url;
                let urlArray = uploadUrl.split("api-naut.livesystems.ch");
                let tokenString = urlArray[urlArray.length - 1];

                Api.http
                    .post(tokenString)
                    .then(response => {
                        if (response.status === 200)
                        {
                            this.closeAddVideo();
                            this.navigate(1);
                        }
                        else
                        {
                            Vue.toast('Error in uploading the selected video. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },
        }
    }

</script>

<style>
    #videoSelectionModal .close {
        text-indent: initial !important;
    }

    #videoSelectionModal .modal-content {
        min-width: 900px;
    }

    .image_selection_filters {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .image_selection_rows {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .video_chooser_section {
        padding-top: 10px;
        padding-bottom: 10px;
        overflow: scroll;
    }

    .modal_title_bar {
        display: inline-flex;
        width: 100%;
    }

    .modal_title_bar .add_btn {
        margin-right: 0px;
        margin-left: auto;
    }

    .modal_title_bar .close_btn {
        margin-right: 0px;
        margin-left: 10px;
    }
</style>