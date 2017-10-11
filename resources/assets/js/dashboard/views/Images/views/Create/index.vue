<template>
    <div>
        <page-title title="Bild" sub="erstellen "/>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div v-if="! imageupload" class="form-group">
                    <label for="name">Image Type *</label>
                    <select class="form-control helper_input" @change="imageTypeSelected()" v-model="imageType">
                        <option v-bind:value="type" v-for="type in imageTypes">
                            {{ type.name}}
                        </option>
                    </select>
                </div>

                <div class="image_dropbox center_text">
                    <input v-if="!imageupload" class="input-file" @dragover.prevent @drop="onDrop"  type="file" name="imageupload" @change="onChange">
                    <p v-if="!imageupload">
                        Drag your image here to begin<br> or click to browse
                    </p>
                    <div class="image_hidden_section display-inline align-center no_width" v-else v-bind:class="{ 'image': true }">
                        <div class="image_crop_section">
                            <div class="image_hidden_section_image">
                                <img id="croppedImage"  :src="imageupload" alt="" class="img"/>
                            </div>
                        </div>
                        <div class="image_hidden_section_remove">
                            <button class="btn btn-danger" @click="removeFile">Bild entfernen </button>
                        </div>
                    </div>
                    </label>
                </div>

                <div class="form-group">
                    <image-quality :display="imageCropper ? 1 : 0" :image-height="imageCropHeight" :image-width="imageCropWidth"></image-quality>
                </div>

                <div v-if="imageupload" class="form-group">
                    <label for="name">Name *</label>
                    <input
                            id="name"
                            type="text"
                            name="name"
                            v-model.trim="image.name"
                            placeholder="Name"
                            class="form-control">
                </div>

                <div v-if="imageupload" class="form-group">
                    <label for="lead">SEO - Beschrieb</label>
                    <textarea
                            id="lead"
                            name="lead"
                            v-model.trim="image.lead"
                            placeholder="SEO - Beschrieb"
                            class="form-control"
                            rows="3"></textarea>
                </div>

                <div v-if="imageupload" class="form-group">
                    <label for="name">Quelle *</label>
                    <div class="source_div">
                        <input
                                id="source"
                                type="text"
                                name="source"
                                v-model.trim="image.source"
                                placeholder="Quelle"
                                class="form-control source_input">
                        <select class="form-control helper_input" @change="imageSourceSelected()" v-model="image.selectedSource">
                            <option v-bind:value="source.name" v-for="source in sources">
                                {{ source.displayName}}
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <div v-if="imageupload" class="form-actions">
                <button
                        class="btn btn-primary"
                        type="submit"
                        :disabled="!image.name || !image.lead || !image.source">
                        <span v-if="uploadPercentage !== 0">
                            Hochladen {{ this.uploadPercentage }}% <i class="fa fa-spinner fa-spin"></i>
                        </span>
                        <span v-else>Bild hinzufügen</span>
                </button>
                <button
                        class="btn btn-default"
                        type="button"
                        @click="reset">
                    Verwerfen
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import ImageQuality from 'dashboard/components/ImageQuality';

    export default {
        data() {
            return {
                image: {
                    name: '',
                    lead: '',
                    source: '',
                    image: '',
                    selectedSource: ''
                },
                imageupload: null,
                imageCropper: null,
                imageCropHeight: 0,
                imageCropWidth: 0,
                uploadPercentage: 0,
                sources: [
                    {
                        name: '',
                        displayName: 'Quelle  auswählen'
                    },
                    {
                        name: 'Dpa',
                        displayName: 'Dpa'
                    },
                    {
                        name: 'Getty',
                        displayName: 'Getty'
                    },
                    {
                        name: 'Dukas',
                        displayName: 'Dukas'
                    },
                    {
                        name: 'Reuters',
                        displayName: 'Reuters'
                    },
                    {
                        name: 'Zvg',
                        displayName: 'Zvg'
                    }
                ],
                imageType: {
                    id: 1,
                    name: 'Normal Image'
                },
                imageAspectRatio: NaN
            }
        },

        components: {
            ImageQuality
        },

        computed: {
            imageTypes() {
                return Api.getImageTypes();
            }
        },

        mounted() {
            this.imageType = this.imageTypes[0];
        },

        methods: {
            handleSubmit() {
                const {name, lead, source, image} = this.image;

                if(!name || !lead || !source || !image) {
                    Vue.toast('Please provide the name, lead and source for the image', {
                        className : ['nau_toast','nau_warning'],
                    });
                    return false;
                }

                this.imageCropper.getCroppedCanvas().toBlob((blob) => {
                    let formData = new FormData();

                    formData.append('image', blob);
                    formData.append('name', name);
                    formData.append('source', source);
                    formData.append('lead', lead);
                    formData.append('type', vm.imageType.id);

                    let vm = this;

                    Api.http
                        .post('/images', formData, {
                            onUploadProgress(e) {
                                vm.uploadPercentage = Math.round(100 / e.total * e.loaded);
                            }
                        })
                        .then(response => {
                            if(response.status === 201)
                            {
                                this.$router.push('/images');
                            }
                            else
                            {
                                Vue.toast('Fehler beim hochladen des Bildes.', {
                                    className: ['nau_toast', 'nau_warning'],
                                });
                            }
                        });
                });
                this.imageCropper.destroy();
                this.imageCropper = null;
            },

            reset() {
                this.image = {
                    name: '',
                    lead: '',
                    source: '',
                    image: '',
                }
                this.imageupload = null;
                if(this.imageCropper)
                {
                    this.imageCropper.destroy();
                    this.imageCropper = null;
                }
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

            createFile(file)
            {
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
                };

                reader.readAsDataURL(file);

                setTimeout(() =>
                {
                    vm.startCrop();
                }, 400);
            },

            removeFile() {
                this.reset();

                if(this.imageCropper)
                {
                    this.imageCropper.destroy();
                    this.imageCropper = null;
                }
            },

            //Start the image cropping process
            startCrop()
            {
                let file = document.getElementById('croppedImage');
                let vm = this;

                this.imageCropper = new Cropper(file, {
                    dragMode: 'move',
                    aspectRatio: vm.imageAspectRatio,
                    autoCropArea: 1,
                    restore: true,
                    guides: true,
                    center: true,
                    highlight: true,
                    cropBoxMovable: true,
                    cropBoxResizable: true,
                    toggleDragModeOnDblclick: true,
                    crop: function(e) {
                        vm.imageCropHeight = parseInt(e.detail.height);
                        vm.imageCropWidth = parseInt(e.detail.width);
                    }
                });
            },

            //Finish the cropping process and save image
            finishCrop()
            {
                this.image.image = this.imageCropper.getCroppedCanvas().toDataURL('image/jpeg');
                this.imageCropper.destroy();
                this.imageCropper = null;
            },

            //Save selected source of article image
            imageSourceSelected()
            {
                this.image.source = this.image.selectedSource;
            },

            //Save the selected image type
            imageTypeSelected()
            {
                this.imageAspectRatio = this.imageType.id !== 1 ? 2 : NaN;
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

    .image_crop_section {
        width: 100%;
        margin-bottom: 6px;
    }

    .image_hidden_section_image {
        width: auto;
        height: 340px;
    }

    .image_hidden_section_image img {
        height: 100%;
    }

    .center_text {
        text-align: center;
    }

    .no_width {
        width: auto !important;
    }

    .source_div {
        display: flex;
    }

    .source_div .source_input{
        width: 70%;
    }

    .source_div .helper_input {
        width: 30%;
    }
</style>
