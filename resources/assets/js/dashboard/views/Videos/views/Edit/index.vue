<template>
    <div>
        <page-title title="Videos" sub="Edit" /> <span><i class="fa fa-spin fa-spinner"></i> Wird verarbeitet ...</span>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="edit_video_section">
                    <video controls :poster="video.thumbnail">
                        <source v-if="!video.processing" :src="video.urls[0]" type="video/mp4">
                        <source v-if="!video.processing" :src="video.urls[1]" type="video/webm">
                    </video>
                </div>
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
                    :disabled="!video.name || !video.lead || !video.source">
                    Submit
                </button>
            </div>
        </form>
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
        height: 400px;
        margin-bottom: 20px;
    }

    .edit_video_section video {
        height: 100%;
        display: block;
        margin: auto;
    }
</style>
