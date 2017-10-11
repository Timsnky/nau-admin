<template>
    <div>
        <page-title title="Videos" sub="Edit" />

        <div class="row">
            <div class="col-md-6">
                <div v-if="!video.processed" class="video-processing"><i class="fa fa-spin fa-spinner"></i> Video wird verarbeitet ...</div>
                <div v-else class="edit_video_section" >
                    <video controls :poster="video.thumbnail">
                        <source :src="video.urls[0]" type="video/mp4" />
                        <source :src="video.urls[1]" type="video/webm" />
                    </video>
                </div>
            </div>

            <div class="col-md-6">
                <form @submit.prevent="handleSubmit">
                    <div class="form-body">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input
                            id="name"
                            type="text"
                            name="name"
                            v-model.trim="video.name"
                            placeholder="Name"
                            class="form-control">
                        </div>

                        <div class="form-group">
                            <label for="lead">Lead</label>
                            <textarea
                            id="lead"
                            name="lead"
                            v-model.trim="video.lead"
                            placeholder="Lead"
                            class="form-control"
                            rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="name">Source</label>
                            <input
                            id="source"
                            type="text"
                            name="source"
                            v-model.trim="video.source"
                            placeholder="Source"
                            class="form-control">
                        </div>
                    </div>

                    <div class="form-actions">
                        <button
                        class="btn btn-primary"
                        type="submit"
                        :disabled="!video.name || !video.lead || !video.source"
                        >Speichern</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import _pick from 'lodash/pick';

    export default {
        data() {
            return {
                video: {}
            }
        },

        mounted() {
            Api.http
            .get(`/videos/${this.$route.params.id}`)
            .then(response => {
                this.video = response.data;
            })
            .catch(err => Vue.toast('Error in retreiving the Video. Please refresh the page', {
                className : ['nau_toast','nau_warning'],
            }));
        },

        methods: {
            handleSubmit() {
                const { name, lead, source } = this.video;

                if (name && lead && source) {
                    Api.http
                    .put(`/videos/${this.video.id}`, { name, lead, source })
                    .then(response => this.$router.push('/videos'))
                    .catch(err => Vue.toast('Error in updating the Video. Please retry', {
                        className : ['nau_toast','nau_warning'],
                    }));
                } else {
                    Vue.toast('Please provide the name, lead and source for the video', {
                        className : ['nau_toast','nau_warning'],
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
    .edit_video_section {
        width: 100%;
    }

    .edit_video_section video {
        width: 100%;
    }

    .video-processing {
        width: 100%;
        text-align: center;
        font-size: 1.5em;
    }
</style>
