<template>
    <tr>
        <td>
            <div class="image_section">
                <div class="image_section_left">
                    <div class="image_section_image">
                        <img height="100px" width="150px" class="media-object" :src="image.url" alt="...">
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
    }

    .image_section_image {
        margin-right: 10px;
    }

    .image_section_right {
        margin-left: auto;
        align-self: center;
    }

    .image_section_right span {
        margin-right: 10px;
    }
</style>
