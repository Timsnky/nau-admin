<template>
    <tr>
        <td>
            <div class="video_section">
                <div class="video_section_left">
                    <div class="video_section_video">
                        <router-link :to="{name: 'videos.edit', params: {id: video.id}}">
                            <img :src="video.thumbnail" alt="Video Thumbnail">
                        </router-link>
                    </div>
                    <div class="video_section_details">
                        <router-link :to="{name: 'videos.edit', params: {id: video.id}}">
                            <p><strong>{{ video.name }}</strong></p>
                        </router-link>
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
                        Löschen
                    </button>
                    <div v-if="!video.processed">
                        <span><i class="fa fa-spin fa-spinner"></i> Wird verarbeitet ...</span>
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
    }

    .video_section_video {
        margin-right: 10px;
        margin-top: auto;
        margin-bottom: auto;
        width: 320px;
    }

    .video_section_video img {
        max-height: 180px;
        width: auto;
        max-width: 300px;
        height: auto;
    }

    .video_section_right {
        margin-left: auto;
        align-self: center;
    }

    .video_section_right span {
        margin-right: 10px;
    }
</style>
