<template>
    <div>
        <page-title title="Videos" sub="Edit" />

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="edit_video_section">
                    <img class="media-object" :src="oldVideoDetails.thumbnail" alt="...">
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        v-model.trim="newVideoDetails.name"
                        placeholder="Name"
                        class="form-control">
                </div>

                <div class="form-group">
                    <label for="lead">Lead</label>
                    <textarea
                        id="lead"
                        name="lead"
                        v-model.trim="newVideoDetails.lead"
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
                            v-model.trim="newVideoDetails.source"
                            placeholder="Source"
                            class="form-control">
                </div>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!newVideoDetails.name || !newVideoDetails.lead || !newVideoDetails.source">
                    Submit
                </button>
                <button
                    class="btn btn-default"
                    type="button"
                    @click="reset">
                    Reset
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
                oldVideoDetails: {},
                newVideoDetails: {}
            }
        },

        mounted() {
            Api.http
                .get(`/videos/${this.$route.params.id}`)
                .then(response => {
                    this.oldVideoDetails = response.data;
                    this.newVideoDetails = _pick(this.oldVideoDetails, ['name', 'lead', 'source']);
                })
                .catch(err => Vue.toast('Error in retreiving the Video. Please refresh the page', {
                    className : ['nau_toast','nau_warning'],
                }));
        },

        methods: {
            handleSubmit() {
                const { name, lead, source } = this.newVideoDetails;

                if (name && lead && source) {
                    Api.http
                        .put(`/videos/${this.oldVideoDetails.id}`, { name, lead, source })
                        .then(response => this.$router.push('/videos'))
                        .catch(err => Vue.toast('Error in updating the Video. Please retry', {
                            className : ['nau_toast','nau_warning'],
                        }));
                } else {
                    Vue.toast('Please provide the name, lead and source for the video', {
                        className : ['nau_toast','nau_warning'],
                    });
                }
            },

            reset() {
                this.newVideoDetails = _pick(this.oldVideoDetails, ['name', 'lead' , 'source']);
            }
        }
    }
</script>

<style lang="scss">
    .edit_video_section {
        height: 400px;
        margin-bottom: 20px;
    }

    .edit_video_section img {
        height: 100%;
        display: block;
        margin: auto;
    }
</style>
