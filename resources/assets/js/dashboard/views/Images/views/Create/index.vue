<template>
    <div>
        <page-title title="Images" sub="Create"/>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="image_dropbox">
                    <input v-if="!imageupload" class="input-file" @dragover.prevent @drop="onDrop"  type="file" name="imageupload" @change="onChange">
                    <p v-if="!imageupload">
                        Drag your image here to begin<br> or click to browse
                    </p>
                    <div class="image_hidden_section display-inline align-center" v-else v-bind:class="{ 'image': true }">
                        <div class="image_hidden_section_image">
                            <img :src="imageupload" alt="" class="img"/>
                        </div>
                        <div class="image_hidden_section_remove">
                            <button class="btn btn-danger" @click="removeFile">Remove image</button>
                        </div>
                    </div>
                    </label>
                </div>

                <div v-if="imageupload" class="form-group">
                    <label for="name">Name</label>
                    <input
                            id="name"
                            type="text"
                            name="name"
                            v-model.trim="image.name"
                            placeholder="Name"
                            class="form-control">
                </div>

                <div v-if="imageupload" class="form-group">
                    <label for="lead">Lead</label>
                    <textarea
                            id="lead"
                            name="lead"
                            v-model.trim="image.lead"
                            placeholder="Lead"
                            class="form-control"
                            rows="3"></textarea>
                </div>

                <div v-if="imageupload" class="form-group">
                    <label for="name">Source</label>
                    <input
                            id="source"
                            type="text"
                            name="source"
                            v-model.trim="image.source"
                            placeholder="Source"
                            class="form-control">
                </div>
            </div>

            <div v-if="imageupload" class="form-actions">
                <button
                        class="btn btn-primary"
                        type="submit"
                        :disabled="!image.name || !image.lead || !image.source">
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
    export default {
        data() {
            return {
                image: {
                    name: '',
                    lead: '',
                    source: '',
                    image: '',
                    user_id: ''
                },
                imageupload: null
            }
        },

        methods: {
            handleSubmit() {
                const {name, lead, source, image, user_id} = this.image;

                if (name && lead && source && image) {
                    Api.http
                        .post('/images', {name, lead, source, image, user_id})
                        .then(response => this.$router.push('/images'))
                        .catch(err => Vue.toast('Error in uploading the Image. Please retry the upload', {
                            className : ['nau_toast','nau_warning'],
                        }));
                } else {
                    Vue.toast('Please provide the name, lead and source for the image', {
                        className : ['nau_toast','nau_warning'],
                    });
                }
            },

            reset() {
                this.image = {
                    name: '',
                    lead: '',
                    source: '',
                    image: '',
                    user_id: ''
                }
                this.imageupload = null;
            },

            onDrop(e) {
                e.stopPropagation();
                e.preventDefault();
                const files = e.dataTransfer.files;
                let file = files[0];
                this.image.name = this.getFileName(file.name);
                this.createFile(file);
            },

            getFileName(name) {
                return name.split('.')[0];
            },

            onChange(e) {
                let files = e.target.files;
                let file = files[0];
                this.image.name = this.getFileName(file.name);
                this.createFile(file);
            },

            createFile(file) {
                if (!file.type.match('image.*')) {
                    Vue.toast('The selected file is not an image. Please select and image and retry.', {
                        className : ['nau_toast','nau_warning'],
                    });
                    return;
                }
                let img = new Image();
                let reader = new FileReader();
                let vm = this;

                reader.onload = function (e) {
                    vm.imageupload = e.target.result;
                    vm.image.image = e.target.result.split(';base64,')[1];
                    vm.image.user_id = Api.user().id;
                };

                reader.readAsDataURL(file);
            },

            removeFile() {
                this.reset();
            }
        }
    }
</script>

<style lang="css">
    .image_dropbox {
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

    .image_dropbox:hover {
        background: #BFBFBF;
    }

    .image_dropbox p {
        font-size: 1.2em;
        text-align: center;
        padding: 140px 0;
    }

    .image_hidden_section {
        display: none;
    }

    .image_hidden_section.image {
        display: inline-block;
        height: 380px;
        width: 100%;
        text-align: center;
    }

    .image_hidden_section_image {
        width: 100%;
        height: 340px;
        margin-bottom: 6px;
    }

    .image_hidden_section_image img {
        height: 100%;
    }
</style>
