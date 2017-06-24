<template>
    <div>
        <page-title title="Videos" sub="Create"/>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="video_dropbox">
                    <input v-if="!videoupload" class="input-file" @dragover.prevent @drop="onDrop"  type="file" name="videoupload" @change="onChange">
                    <p v-if="!videoupload">
                        Drag your video here to begin<br> or click to browse
                    </p>
                    <div class="video_hidden_section display-inline align-center" v-else v-bind:class="{ 'video': true }">
                        <div class="video_hidden_section_video">
                            <img :src="videoupload" alt="" class="img"/>
                        </div>
                        <div class="video_hidden_section_remove">
                            <button class="btn btn-danger" @click="removeFile">Remove video</button>
                        </div>
                    </div>
                    </label>
                </div>

                <div v-if="videoupload" class="form-group">
                    <label for="name">Name</label>
                    <input
                            id="name"
                            type="text"
                            name="name"
                            v-model.trim="video.name"
                            placeholder="Name"
                            class="form-control">
                </div>

                <div v-if="videoupload" class="form-group">
                    <label for="lead">Lead</label>
                    <textarea
                            id="lead"
                            name="lead"
                            v-model.trim="video.lead"
                            placeholder="Lead"
                            class="form-control"
                            rows="3"></textarea>
                </div>

                <div v-if="videoupload" class="form-group">
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

            <div v-if="videoupload" class="form-actions">
                <button
                        class="btn btn-primary"
                        type="submit"
                        :disabled="!video.name || !video.lead || !video.source">
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
    import request from 'dashboard/utils/request';
    import api from 'dashboard/utils/api';

    export default {
        data() {
            return {
                video: {
                    name: '',
                    lead: '',
                    source: '',
                    user_id: ''
                },
                videoBlob : {
                    video: ''
                },
                videoupload: null,
                uploadToken: null
            }
        },

        methods: {
            handleSubmit() {
                const {name, lead, source, user_id} = this.video;

                if (name && lead && source) {
                    request
                        .post('/videos', {name, lead, source, user_id})
                        .then(response => this.handleVideoUpload(response))
                        .catch(err => console.log(err));
                } else {
                    console.log('Please provide the name, lead and source for the video');
                }
            },

            handleVideoUpload(data) {

                var uploadUrl = data.data.upload_url;
                var urlArray = uploadUrl.split("api-naut.livesystems.ch");
                var tokenString = urlArray[urlArray.length - 1];

                const {video} = this.videoBlob;

                request
                    .put(tokenString, {video})
                    .then(response => this.completeUpload(response))
                    .catch(err => console.log('Error in uploading the Video2. Please retry the upload', err));
            },

            completeUpload(data) {
                var uploadUrl = data.data.complete_url;
                var urlArray = uploadUrl.split("api-naut.livesystems.ch");
                var tokenString = urlArray[urlArray.length - 1];

                request
                    .post(tokenString)
                    .then(response => this.$router.push('/videos'))
                    .catch(err => console.log('Error in uploading the Video3. Please retry the upload', err));
            },

            reset() {
                this.video = {
                    name: '',
                    lead: '',
                    source: '',
                    user_id: ''
                };
                this.videoBlob = {
                    video: ''
                };
                this.videoupload = null;
            },

            onDrop(e) {
                e.stopPropagation();
                e.preventDefault();
                const files = e.dataTransfer.files;
                let file = files[0];
                this.video.name = this.getFileName(file.name);
                this.createFile(file);
            },

            getFileName(name) {
                return name.split('.')[0];
            },

            onChange(e) {
                let files = e.target.files;
                let file = files[0];
                this.video.name = this.getFileName(file.name);
                this.createFile(file);
            },

            createFile(file) {
                if (!file.type.match('video.*')) {
                    alert('The selected file is not an video. Please select and video and retry.');
                    return;
                }

                let img = new Blob();
                let reader = new FileReader();
                let vm = this;

                reader.onload = function (e) {
                    vm.videoupload = e.target.result;
                    vm.videoBlob.video = e.target.result;
                    vm.video.user_id = api.user().id;
                };

                reader.readAsDataURL(file);
            },

            removeFile() {
                this.reset();
            }
        }
    }
</script>

<style lang="scss">
    .video_dropbox {
        outline: 2px dashed grey;
        outline-offset: -10px;
        background: #E3E3E3;
        color: dimgray;
        padding: 10px 10px;
        height: 400px;
        position: relative;
        cursor: pointer;
        margin-bottom: 20px;
    }

    .input-file {
        opacity: 0;
        width: 100%;
        height: 380px;
        position: absolute;
        cursor: pointer;
    }

    .video_dropbox:hover {
        background: #BFBFBF;
    }

    .video_dropbox p {
        font-size: 1.2em;
        text-align: center;
        padding: 140px 0;
    }

    .video_hidden_section {
        display: none;
    }

    .video_hidden_section.video {
        display: inline-block;
        height: 380px;
        width: 100%;
        text-align: center;
    }

    .video_hidden_section_video {
        width: 100%;
        height: 340px;
        margin-bottom: 6px;
    }

    .video_hidden_section_video img {
        height: 100%;
    }
</style>