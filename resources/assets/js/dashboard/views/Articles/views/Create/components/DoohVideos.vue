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
                videoSelectorId: 2
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
            }
        }
    }
</script>
