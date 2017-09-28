<template>
    <div class="form-body">
        <div class="form-body">
            <label><b>DOOH Videos</b></label>
            <div class="form-group">
                <div v-if="doohVideo.id" class="edit_video_section">
                    <video controls>
                        <source v-if="doohVideo.urls[0]" :src="doohVideo.urls[0]" type="video/mp4">
                        <source v-if="doohVideo.urls[1]" :src="doohVideo.urls[1]" type="video/webm">
                    </video>
                </div>
            </div>
        </div>
        <div class="form-actions">
            <button v-if="! doohVideo.id" type="button" class="btn btn-primary image_selection_btn" @click="showVideoSelectionModal()">
                Select Video
            </button>
            <button
                    v-if="doohVideo.id"
                    class="btn btn-danger"
                    type="button"
                    @click="confirmDelete()">
                Remove DOOH Video
            </button>
        </div>
        <div class="form-group">
            <div class="form-group no_margin_bottom">
                <label>Dooh Regions</label>
            </div>
            <div class="form-group">
                <div class="col-md-3 col-sm-12 idea_images_section no_padding_left"
                     v-for="(region, index) in regions">
                    <label class="mt-checkbox no_margin_bottom">
                        <input type="checkbox" v-model="region.id" value="checkRegion(region.id)">{{ region.name }}
                        <span></span>
                    </label>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                doohVideo: {
                    id: null,
                    url: ''
                },
                videoSelectorId: 2,
                regions:[],
                doohRegions: []
            }
        },

        props: {
            articleId : {
                type: Number,
            },
            doohVideoId : {
                type: Number,
            }
        },

        computed: {
            //Get the selected video id from the modal
            selectedVideoId()
            {
                return Api.getVideo();
            },
        },

        watch: {
            doohVideoId()
            {
                if(this.doohVideoId)
                {
                    this.getVideo(this.doohVideoId);
                }
            },

            selectedVideoId(newId, oldId)
            {
                if(newId && Api.getVideoSelector() === this.videoSelectorId)
                {
                    Api.resetVideo();
                    Api.resetVideoSelector();
                    this.getVideo(newId);
                    this.submitVideo(newId);
                }
            },
        },

        mounted()
        {
            if(this.doohVideoId)
            {
                this.getVideo(this.doohVideoId);
            }

            this.initializeRegions();
        },

        methods: {
            //Trigger the video selection modal
            showVideoSelectionModal()
            {
                Api.setVideoSelector(this.videoSelectorId);

                $('#videoSelectionModal').modal('show');
            },

            //Get the select vide and display it
            getVideo(id)
            {
                Api.http
                    .get(`/videos/${id}`)
                    .then(response =>
                    {
                        if(response.status === 200)
                        {
                            this.doohVideo = response.data;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the selected video. Please retry again', {
                                className : ['nau_toast','nau_warning'],
                            });
                        }
                    });
            },

            //Submit the selected video and disply it
            submitVideo(id)
            {
                Api.http
                    .put(`/articles/${this.articleId}/dooh/${id}`)
                    .then(response =>
                    {
                        if(response.status === 204)
                        {
                            Vue.toast('DOOH Video linked successfully to article', {
                                className : ['nau_toast','nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the selected video. Please retry again', {
                                className : ['nau_toast','nau_warning'],
                            });
                        }
                    });
            },

            //Confirm detach
            confirmDelete()
            {
                swal({
                    title: 'Bist du sicher?',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Verwerfen',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ja, löschen'
                }).then(() => {
                    this.detachDoohVideo()
                }).catch(swal.noop);
            },

            //Detach the video
            detachDoohVideo()
            {
                Api.http
                    .delete(`/articles/${this.articleId}/dooh`)
                    .then(response =>
                    {
                        if(response.status === 204)
                        {
                            this.reset();
                            Vue.toast('DOOH Video detached successfully', {
                                className : ['nau_toast','nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in detaching the DOOH video. Please retry again', {
                                className : ['nau_toast','nau_warning'],
                            });
                        }
                    });

            },

            //Reset the dooh video
            reset()
            {
                this.doohVideo = {
                    id: null,
                    url: ''
                };

                this.doohVideoId = null;
            },

            //Get the regions for the checkboxes
            initializeRegions()
            {
                Api.http
                    .get(`/regions`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.regions = response.data;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the regions. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Get the dooh regions
            initializeDoohRegions(id)
            {
                Api.http
                    .get(`/articles/${id}/dooh-regions`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.doohRegions = response.data;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the dooh regions. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Link regions to dooh video
            linkRegionsToDooh(articleId)
            {
                let vm = this;

                this.doohRegions.forEach(function (value, key)
                {
                    if(! (value.pivot && value.pivot.article_id === articleId))
                    {
                        Api.http
                            .put(`/articles/${articleId}/dooh-regions/${value.id}`)
                            .then(response => {
                                if(response.status === 204)
                                {
                                    Vue.toast('Article dooh region linked successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                                else
                                {
                                    Vue.toast('Error in linking the article dooh regio. Please retry again', {
                                        className: ['nau_toast', 'nau_warning'],
                                    });
                                }
                            });
                    }
                });
            },

            //Delete any dooh regions
            deleteDoohRegions(region)
            {
                let vm = this;

                vm.doohRegions.forEach(function (value, key)
                {
                    if(value.id === region.id && value.pivot)
                    {
                        Api.http
                            .delete(`/articles/${vm.article.id}/dooh-regions/${vm.doohRegions[key].id}`)
                            .then(response => {
                                if(response.status === 204)
                                {
                                    Vue.toast('Article dooh region deleted successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                            });
                    }
                });
            },

        }
    }
</script>
