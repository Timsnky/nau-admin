<template>
    <div>
        <page-title title="Images" sub="Create"/>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="drop align-center" @dragover.prevent @drop="onDrop">
                    <div class="helper"></div>
                    <label v-if="!imageupload" class="fa fa-upload">
                        SELECT OR DROP AN IMAGE
                        <input type="file" name="imageupload" @change="onChange">
                    </label>
                    <div class="hidden display-inline align-center" v-else v-bind:class="{ 'image': true }">
                        <img :src="imageupload" alt="" class="img"/>
                        <br>
                        <br>
                        <button class="btn" @click="removeFile">REMOVE</button>
                    </div>
                    </label>
                </div>

                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                            id="name"
                            type="text"
                            name="name"
                            v-model.trim="image.name"
                            placeholder="Name"
                            class="form-control">
                </div>

                <div class="form-group">
                    <label for="lead">Lead</label>
                    <textarea
                            id="lead"
                            name="lead"
                            v-model.trim="image.lead"
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
                            v-model.trim="image.source"
                            placeholder="Source"
                            class="form-control">
                </div>
            </div>

            <div class="form-actions">
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
    import request from 'dashboard/utils/request';

    export default {
        data() {
            return {
                image: {
                    name: '',
                    lead: '',
                    source: '',
                    image: ''
                },
                imageupload: null
            }
        },

        methods: {
            handleSubmit() {
                const {name, lead, source, image} = this.image;

                if (name && lead && source && image) {
                    request
                        .post('/images', {name, lead, source, image})
                        .then(response => this.$router.push('/images'))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.image = {
                    name: '',
                    lead: '',
                    source: '',
                    image: ''
                }
            },

            onDrop(e) {
                e.stopPropagation();
                e.preventDefault();
                const files = e.dataTransfer.files;
                this.createFile(files[0]);
            },

            onChange(e) {
                let files = e.target.files;
                let file = files[0];
                this.image.name = file.name;
                this.createFile(file);
            },

            createFile(file) {
                if (!file.type.match('image.*')) {
                    alert('Select an image');
                    return;
                }
                let img = new Video();
                let reader = new FileReader();
                let vm = this;

                reader.onload = function (e) {
                    vm.imageupload = e.target.result;
                    vm.image.image = e.target.result;
                };

                reader.readAsDataURL(file);
                console.log(file, reader);
            },

            removeFile() {
                this.imageupload = '';
            }
        }
    }
</script>