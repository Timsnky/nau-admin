<template>
    <tr>
        <td>
            <div class="video_section">
                <div class="video_section_left">
                    <div class="video_section_video">
                        <router-link
                                :to="{name: 'videos.edit', params: {id: video.id}}">
                            <img :src="video.thumbnail" alt="Video Thumbnail">
                        </router-link>
                    </div>
                    <div class="video_section_details">
                        <p><strong>{{ video.name }}</strong></p>
                        <p>{{ video.lead }}</p>
                    </div>
                </div>
                <div class="video_section_right">
                    <span>
                        {{ date }}
                    </span>
                    <button
                            class="btn btn-danger"
                            type="button"
                            @click="handleDeleteVideo">
                        Delete
                    </button>
                    <div class="loader_section" :class="(video.processed) ? '' : 'display_Loader' ">
                        <div class="loader"></div>
                        <span>Processing ...</span>
                    </div>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
    export default {
        props: {
            video: Object,
            index: Number,
        },

        computed: {
            date() {
                return moment(this.video.created_at).format('DD.MM.YYYY');
            }
        },

        methods: {
            handleDeleteVideo() {
                this.$emit('deleteVideo', this.video);
            }
        }
    }
</script>

<style>
    .video_section {
        display: inline-flex;
        width: 100%;
    }

    .video_section_left {
        display: inline-flex;
        height: 240px;
    }

    .video_section_video {
        margin-right: 10px;
        margin-top: auto;
        margin-bottom: auto;
        width: 320px;
    }

    .video_section_video img {
        max-height: 240px;
        width: auto;
        max-width: 320px;
        height: auto;
    }

    .video_section_right {
        margin-left: auto;
        align-self: center;
    }

    .video_section_right span {
        margin-right: 10px;
    }

    .loader_section {
        margin-top: 15px;
        display: none;
    }

    .display_Loader {
        display: block;
    }

    .loader_section span {
        vertical-align: bottom;
    }

    .loader {
        border: 10px solid #bbbaba;
        border-top: 10px solid #337ab7;
        border-bottom: 10px solid #337ab7;
        border-radius: 50% !important;
        width: 10px;
        height: 10px;
        animation: spin 2s linear infinite;
        margin-right: 10px;
        display: inline-flex;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>