<template>
    <tr>
        <td>
            <div class="image_section">
                <div class="image_section_left">
                    <div class="image_section_image">
                        <router-link
                                :to="{name: 'images.edit', params: {id: image.id}}">
                            <img class="media-object" :src="image.url" alt="...">
                        </router-link>
                    </div>
                    <div class="image_section_details">
                        <p><strong>{{ image.name }}</strong></p>
                        <p>{{ image.lead }}</p>
                    </div>
                </div>
                <div class="image_section_right">
                    <span>
                        {{ date }}
                    </span>
                    <button
                            class="btn btn-danger"
                            type="button"
                            @click="handleDeleteImage">
                        Delete
                    </button>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
    export default {
        props: {
            image: Object,
            index: Number,
        },

        computed: {
            date() {
                return moment(this.image.created_at).format('DD.MM.YYYY');
            }
        },

        methods: {
            handleDeleteImage() {
                this.$emit('deleteImage', this.image);
            }
        }
    }
</script>

<style>
    .image_section {
        display: inline-flex;
        width: 100%;
    }

    .image_section_left {
        display: inline-flex;
        height: 240px;
    }

    .image_section_image {
        margin-right: 10px;
        margin-top: auto;
        margin-bottom: auto;
        width: 320px;
    }

    .image_section_image img {
        max-height: 240px;
        width: auto;
        max-width: 320px;
        height: auto;
    }

    .image_section_right {
        margin-left: auto;
        align-self: center;
    }

    .image_section_right span {
        margin-right: 10px;
    }
</style>
