<template>
    <div>
        <div class="form-body">
            <h4><strong>External Videos</strong></h4>
            <div class="form-group" v-if="addingExternalVideo">
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label>URL</label>
                        <input
                                type="url"
                                v-model.trim="externalVideo.url"
                                placeholder="https://streamable.com/1535 / https://www.youtube.com/watch?v=XB2g7-HgE_g"
                                class="form-control">
                    </div>
                    <div class="col-md-6 form-group">
                        <label>Name</label>
                        <input
                                type="text"
                                name="name"
                                v-model.trim="externalVideo.name"
                                placeholder="Name"
                                class="form-control">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 form-group">
                        <label>Lead</label>
                        <input
                                type="text"
                                name="lead"
                                v-model.trim="externalVideo.lead"
                                placeholder="Lead"
                                class="form-control">
                        </input>
                    </div>

                    <div class="col-md-6 form-group">
                        <label>Description</label>
                        <input
                                type="text"
                                name="source"
                                v-model.trim="externalVideo.alt"
                                placeholder="Description"
                                class="form-control">
                    </div>
                </div>
            </div>
            <div class="form-actions">
                <button
                        class="btn btn-primary"
                        type="button"
                        @click="saveExternalVideo()"
                        :disabled="articleId == null || !(externalVideo.url && externalVideo.name && externalVideo.lead)">
                    Save Video
                </button>
                <button
                        @click="addArticleExternalVideo()"
                        class="btn btn-primary"
                        type="button"
                        :disabled="addingExternalVideo">
                    Add Video
                </button>
            </div>
            <div class="timeline">
                <timeline-item v-for="(articleExternalVideo, index) in articleExternalVideos" :key="articleExternalVideo.id" :liveticker="articleExternalVideo" @delete="deleteArticleExternalVideo(index)">
                    <external-video-element :element="articleExternalVideo" />
                </timeline-item>
            </div>
        </div>
    </div>
</template>

<script>

    import TimelineItem from '../../Liveticker/views/Show/components/TimelineItem';
    import ExternalVideoElement from '../../Liveticker/views/Show/components/Elements/ExternalVideoElement';

    export default {
        data() {
            return {
                articleExternalVideos: [],
                addingExternalVideo: false,
                externalVideo: {
                    url: '',
                    lead: '',
                    name: '',
                    alt: ''
                }
            }
        },

        props: {
            articleId : {
                type: Number,
            }
        },

        components: {
            TimelineItem,
            ExternalVideoElement
        },

        mounted()
        {
            if(this.articleId)
            {
                this.initializeArticleExternalVideos(this.articleId);
            }
        },

        watch: {
            articleId()
            {
                if(this.articleId)
                {
                    this.initializeArticleExternalVideos(this.articleId);
                }
            }
        },

        methods: {
            //Get the external videos linked to the specified article
            initializeArticleExternalVideos(id)
            {
                Api.http
                    .get(`/articles/${id}/livetickers`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.articleExternalVideos = response.data;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the external videos. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Add an article external video record
            addArticleExternalVideo()
            {
                this.addingExternalVideo = true;
            },

            //Save an external video record
            saveExternalVideo()
            {
                Api.http
                    .post(`/external-videos`, this.externalVideo)
                    .then(response => {
                        this.linkExternalVideoToArticle(response.data);
                    });
            },

            //Link the external video to an article
            linkExternalVideoToArticle(video)
            {
                Api.http
                    .put(`/livetickers/${this.articleId}/external-videos/${video.id}`)
                    .then(response =>
                    {
                        if(response.status === 200)
                        {
                            this.articleExternalVideos.push(video);
                            this.addingExternalVideo = false;
                            this.articleExternalVideos = [];
                            this.initializeArticleExternalVideos(this.articleId);
                            Vue.toast('External video linked to article successfully', {
                                className : ['nau_toast','nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('External video linked to article successfully', {
                                className : ['nau_toast','nau_success'],
                            });
                        }
                    });
            },

            //Detach a external video from an article
            deleteArticleExternalVideo(key)
            {
                Api.http
                    .delete(`/article/${this.articleId}/livetickers/${this.articleExternalVideos[key].id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            this.articleExternalVideos.splice(key, 1);
                            Vue.toast('Article external video detached successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                    });
            },
        }
    }
</script>
