<template>
    <div class="form-body">
        <div class="form-body">
            <label><b>DOOH Videos</b><span class="text-warning" v-if="$parent.article.dooh && $parent.article.dooh.should_include_video"> (Sollte ein Video enthalten)</span></label>
            <div v-if="doohVideo.id" class="form-group">
                <div class="edit_video_section">
                    <video controls>
                        <source v-if="doohVideo.urls[0]" :src="doohVideo.urls[0]" type="video/mp4">
                        <source v-if="doohVideo.urls[1]" :src="doohVideo.urls[1]" type="video/webm">
                    </video>
                </div>
            </div>

            <div v-if="doohVideo.id" class="form-group">
                <label>Letzte Ausstrahlung</label>
                <date-time format="DD.MM.YYYY HH:mm" v-model="timeout" />
            </div>
        </div>
        <div v-if="doohVideo.url || doohVideo.id" class="form-group">
            <div class="form-group no_margin_bottom">
                <label>Dooh Regions</label>
            </div>
            <div class="form-group">
                <div class="col-md-3 col-sm-12 idea_images_section no_padding_left"
                     v-for="(region, index) in regions">
                    <label class="mt-checkbox no_margin_bottom">
                        <input type="checkbox" v-model="region.checked" value="true">{{ region.name }}
                        <span></span>
                    </label>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <div class="form-actions">
            <button v-if="! doohVideo.id" type="button" class="btn btn-primary image_selection_btn" @click="showVideoSelectionModal()">
                Select Video
            </button>
            <button
                    v-if="doohVideo.id"
                    class="btn btn-primary"
                    type="button"
                    @click="handleSubmit(articleId)">
                Speichern
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
    import DateTime from 'dashboard/components/DateTime';

    export default {
        components: {
            DateTime
        },

        data() {
            return {
                doohVideo: {
                    id: null,
                    url: ''
                },
                timeout: null,
                videoSelectorId: 2,
                regions:[
                ],
                doohRegions: [
                ]
            }
        },

        props: {
            articleId : {
                type: Number,
            },
            doohVideoId : {
                type: Number,
            },
            doohTimeout: String,
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

            articleId()
            {
                if(this.articleId)
                {
                    this.initializeDoohRegions(this.articleId);
                }
            },

            selectedVideoId(newId, oldId)
            {
                if(newId && Api.getVideoSelector() === this.videoSelectorId)
                {
                    Api.resetVideo();
                    Api.resetVideoSelector();
                    this.getVideo(newId);
                }
            },
        },

        mounted()
        {
            if(this.doohVideoId) {
                this.getVideo(this.doohVideoId);
            }

            if(this.articleId) {
                this.initializeDoohRegions(this.articleId);
            }

            if(this.doohTimeout) {
                this.timeout = this.doohTimeout;
            }
        },

        created()
        {
            this.$parent.$on('duplicateData', this.duplicateData);
            this.$parent.$on('saveData', this.handleSubmit);
        },

        methods: {
            //Receive the event to duplicate data and do so
            duplicateData(articleId)
            {
                this.handleSubmit(articleId);
            },

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
                    this.detachDoohVideo();
                    this.clearDoohRegions();
                }).catch(swal.noop);
            },

            //Detach the video
            detachDoohVideo()
            {
                Api.http
                    .put(`/articles/${this.articleId}/dooh`, {video: null})
                    .then(response => {
                        if(response.status === 200) {
                            this.reset();
                            Vue.toast('Dooh Video erfolgreich entfernt', {
                                className : ['nau_toast','nau_success'],
                            });
                        } else {
                            Vue.toast('Error in detaching the DOOH video. Please retry again', {
                                className : ['nau_toast','nau_warning'],
                            });
                        }
                    });
            },

            //Remove the dooh regions too when you delete the dooh video
            clearDoohRegions()
            {
                let vm = this;

                this.doohRegions.forEach(function (value, key)
                {
                    vm.deleteDoohRegions(vm.articleId, key)
                })
            },

            //Reset the dooh video
            reset()
            {
                this.doohVideo = {
                    id: null,
                    url: ''
                };
            },

            //Get the regions for the checkboxes
            initializeRegions()
            {
                this.regions = [];
                Api.http
                    .get(`/regions`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.regions = response.data;
                            this.setupDoohRegions();
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
            initializeDoohRegions(articleId)
            {
                Api.http
                    .get(`/articles/${articleId}/dooh-regions`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.doohRegions = response.data;
                            this.initializeRegions();
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the dooh regions. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Setup the dooh regions
            setupDoohRegions()
            {
                let vm = this;

                this.doohRegions.forEach(function (value, key)
                {
                    vm.regions.forEach(function (regionValue, regionKey)
                    {
                        if(value.id === regionValue.id)
                        {
                            vm.regions[regionKey].checked = 1;
                            vm.regions[regionKey].linked = vm.articleId;
                        }
                    })
                })
            },

            //Submit the data in the dooh tab
            async handleSubmit(articleId)
            {
                var {timeout} = this;
                try {
                    await Api.http.put(`/articles/${articleId}/dooh`, {
                        timeout: timeout ? moment(timeout).format('YYYY-MM-DD HH:mm:ss') : null,
                        video: this.doohVideo.id,
                    });
                    await this.submitArticleDoohRegions(articleId);
                } catch(error) {
                    console.error(error);
                    Vue.toast('Ein Fehler ist aufgetreten', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            },

            //Submit the dooh regions for an article
            submitArticleDoohRegions(articleId)
            {
                return new Promise((resolve, reject) => {
                    this.regions.forEach((value, key) => {
                        if(value.checked === true && value.linked !== articleId) {
                            this.linkDoohRegionsToArticle(articleId, key);
                        } else if(value.linked === articleId && value.checked == false) {
                            this.deleteDoohRegions(articleId, key);
                        }
                    });

                    resolve(true);
                });
            },

            //Link regions to article dooh video
            linkDoohRegionsToArticle(articleId, key)
            {
                return Api.http
                    .put(`/articles/${articleId}/dooh-regions/${this.regions[key].id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            this.regions[key].linked = articleId;

                            Vue.toast('Article dooh region linked successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in linking the article dooh region. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Delete any dooh regions
            deleteDoohRegions(articleId, key)
            {
                return Api.http
                    .delete(`/articles/${articleId}/dooh-regions/${this.regions[key].id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            this.regions[key].linked = null;
                            this.regions[key].checked = 0;

                            Vue.toast('Article dooh region deleted successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                    });
            },
        }
    }
</script>
