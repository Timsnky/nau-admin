<template>
    <div class="modal fade" id="imageSelectionModal" tabindex="-1" role="dialog" aria-labelledby="imageSelectionModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal_title_bar">
                        <h4 class="modal-title" id="myModalLabel">Bilder <small>{{imageType.name}}</small></h4>
                        <button type="button" class="btn btn-primary btn-sm add_btn" :disabled="addingImage" @click="showAddImage()"><i class="fa fa-plus"></i></button>
                        <button type="button" class="btn btn-danger btn-sm close_btn" data-dismiss="modal" aria-label="Close"><i class="fa fa-close"></i></button>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form-group" v-if="addingImage">
                        <div v-if="image.image" class="article_image_section">
                            <div class="article_image_section_div auto_height">
                                <img id="cropImage"  :src="image.image" alt="">
                            </div>
                        </div>
                        <image-quality :display="imageCropper ? 1 : 0" :image-height="imageCropHeight" :image-width="imageCropWidth"></image-quality>
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Bild</label>
                                <input
                                        class="form-control"
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        id="image"
                                        @change="imageAdded"/>
                            </div>

                            <div v-if="imageType.id == 1" class="col-md-6 form-group">
                                <label>Aspect Ratio *</label>
                                <select class="form-control helper_input" @change="aspectRatioSelected()" v-model="imageAspectRatio">
                                    <option v-bind:value="ratio" v-for="ratio in aspectRatios">
                                        {{ ratio.name}}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Dateiname * </label>
                                <input
                                        type="text"
                                        name="name"
                                        v-model.trim="image.name"
                                        placeholder="Dateiname"
                                        class="form-control">
                            </div>
                            <div class="col-md-6 form-group">
                                <label>Bildunterschrift *</label>
                                <input
                                        type="text"
                                        name="lead"
                                        v-model.trim="image.lead"
                                        placeholder="Bildunterschrift"
                                        class="form-control">
                                </input>
                            </div>
                        </div>

                        <div class="row">

                            <div class="col-md-6 form-group">
                                <label>Quelle *</label>
                                <div class="source_div">
                                    <input
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
                        <div class="form-actions">
                            <button @click="uploadImage()" class="btn btn-primary" type="button">
                                <span v-if="submitting">
                                    Hochladen {{ this.uploadPercentage }}% <i class="fa fa-spinner fa-spin"></i>
                                </span>
                                <span v-else>Bild hinzufügen</span>
                            </button>
                            <button
                                    @click="closeAddImage()"
                                    class="btn btn-danger"
                                    type="button"
                                    :disabled="submitting">
                                Schliessen
                            </button>
                        </div>
                    </div>

                    <div v-if="!addingImage">
                        <div class="row image_selection_filters">
                            <div class="col-md-6">
                                <div v-if="images.length > 0 || searchTerm !== ''" class="input-icon">
                                    <i class="fa fa-search"></i>
                                    <input
                                            type="search"
                                            class="form-control"
                                            placeholder="Search"
                                            name="searchTerm"
                                            v-model.trim="searchTerm">
                                </div>
                            </div>

                            <div class="col-md-6">
                                <select class="form-control" name="user_id" id="user_id" v-model="userId">
                                    <option :value="myUserId">Meine Bilder</option>
                                    <option :value="0">Alle Bilder</option>
                                </select>
                            </div>
                        </div>

                        <h3 v-if="!isLoaded" class="text-center">Laden...</h3>

                        <div v-else-if="images.length > 0">
                            <div class="row image_selection_rows">
                                <div v-for="image in images" class="col-md-6 col-lg-6 col-sm-6">
                                    <div class="image_section_left image_chooser_section">
                                        <div class="image_selection_section_image">
                                            <img height="100px" width="150px" class="media-object image_choice" :src="image.url" alt="..." @click="dispatchImageSelected(image.id)">
                                        </div>
                                        <div class="image_section_details">
                                            <p><strong>{{ image.name }}</strong></p>
                                            <p>{{ image.lead }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="clearfix">
                                <pagination
                                        class="pull-right"
                                        :items="images"
                                        :currentPage="currentPage"
                                        :pagesCount="pagesCount"
                                        :itemsPerPage="itemsPerPage"
                                        @navigate="navigate"/>
                            </div>
                        </div>

                        <h3 v-else class="text-center">Keine Bilder Hochgeladen</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ImageQuality from 'dashboard/components/ImageQuality';

    export default {
        data() {
            return {
                images: [],
                isLoaded: false,
                currentPage: 1,
                pagesCount: 1,
                itemsPerPage: 15,
                searchTerm: '',
                userId : 0,
                myUserId : 0,
                image: {
                    image: '',
                    lead: '',
                    name: '',
                    source: '',
                    selectedSource: ''
                },
                addingImage: false,
                imageCropper: null,
                imageCropHeight: 0,
                imageCropWidth: 0,
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
                submitting: false,
                imageType: {
                    id: 1,
                    name: 'Normal Image'
                },
                uploadPercentage: 0,
                aspectRatios: [
                    {
                        value: NaN,
                        name: 'Frei auswählbar'
                    },
                    {
                        value: 2,
                        name: '2:1'
                    }
                ],
                imageAspectRatio: {
                    value: NaN,
                    name: 'Frei auswählbar'
                }
            }
        },

        created()
        {
            this.$parent.$on('imageTypeChange', this.changeImageType);
        },

        mounted() {
            this.imageType = Api.getImageTypes();

            this.getPaginatedData(this.currentPage)
                .then(response => {
                    const { data, current_page, per_page, last_page } = response.data;

                    this.images = data;
                    this.currentPage = current_page;
                    this.itemsPerPage = per_page;
                    this.pagesCount = last_page;
                    this.isLoaded = true;
                    this.myUserId = Api.user().id;
                    this.userId = this.myUserId;
                })
                .catch(err => {
                    Vue.toast('Error in loading the Images. Please refresh the page', {
                        className : ['nau_toast','nau_warning'],
                    });
                    this.isLoaded = true;
                });
        },

        components: {
            ImageQuality
        },

        watch: {
            searchTerm() {
                this.navigate(1);
            },

            userId() {
                this.navigate(1);
            },
        },

        methods: {
            //Update the image type when it is changed
            changeImageType()
            {
                let type = Api.getImageType();

                if(type.id !== this.imageType.id)
                {
                    this.imageType = type;

                    this.navigate(1);
                }

                this.imageAspectRatio = this.imageType.id !== 1 ? this.aspectRatios[1] : this.aspectRatios[0];

                this.reset();
                this.closeAddImage();
            },

            //Change the aspect ratio of cropper
            aspectRatioSelected()
            {
                if(this.imageCropper)
                {
                    this.imageCropper.setAspectRatio( this.imageAspectRatio.value);
                }
            },

            deleteImage(image) {
                Api.http
                    .delete(`/images/${image.id}`)
                    .then(response => this.images = this.images.filter(item => item.id !== image.id))
                    .catch(err => Vue.toast('Error in deleting the Image. Please retry again', {
                        className : ['nau_toast','nau_warning'],
                    }));
            },

            navigate(page) {
                this.isLoaded = false;
                this.getPaginatedData(page)
                    .then(response => {
                        const { data, current_page, last_page, from } = response.data;

                        this.images = data;
                        this.currentPage = current_page;
                        this.pagesCount = last_page;
                        this.isLoaded = true;
                    })
                    .catch(err => Vue.toast('Error in retreiving the Images. Please retry again', {
                        className : ['nau_toast','nau_warning'],
                    }));
            },

            getPaginatedData(page) {
                var searchString = '';
                var userString = '';


                if (this.searchTerm !== '') {
                    searchString += `search=${this.searchTerm}&`;
                }

                if(this.userId != 0)
                {
                    userString += `user_id=${this.userId}&`;
                }

                return Api.http.get(`/images?type=${this.imageType.id}&` + searchString + userString + `page=${page}`);
            },

            dispatchImageSelected(id) {
                Api.setImage(id);
                this.$emit('selected', id);
                this.reset();
                $('#imageSelectionModal').modal('hide');
            },

            reset()
            {
                this.searchTerm = "";
                this.myUserId = Api.user().id;
                this.userId = this.myUserId;
                this.submitting = false;
            },

            //Show the input to add an image
            showAddImage()
            {
                this.addingImage = true;
            },

            //Close the add image section
            closeAddImage()
            {
                this.addingImage = false;
                this.image = {
                    image: '',
                    lead: '',
                    name: '',
                    source: ''
                };
                this.submitting = false;

                if(this.imageCropper)
                {
                    this.imageCropper.destroy();
                    this.imageCropper = null;
                }
            },

            //Handle when images are uploaded
            imageAdded()
            {
                if(this.imageCropper)
                {
                    this.imageCropper.destroy();
                    this.imageCropper = null;
                }

                let fileElement = document.getElementById('image');
                let vm = this;
                if (!fileElement) return;
                for (var i = 0; i < fileElement.files.length; i++) {
                    var reader = new FileReader();
                    reader.readAsDataURL(fileElement.files[i]);
                    reader.onload = (e) =>
                    {
                        vm.image.image = e.target.result;
                    };

                    setTimeout(() =>
                    {
                        vm.startCrop();
                    }, 400);
                }
            },

            //Start the image cropping process
            startCrop()
            {
                let file = document.getElementById('cropImage');
                let vm = this;

                this.imageCropper = new Cropper(file, {
                    dragMode: 'move',
                    aspectRatio: vm.imageAspectRatio.value,
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

            //Save selected source of article image
            imageSourceSelected()
            {
                this.image.source = this.image.selectedSource;
            },

            //Validate the image save process
            validateImageSave()
            {
                let errorString = "";
                let errorArray = [];

                if(! this.image.image)
                {
                    errorArray.push('image');
                }

                if(! this.image.name)
                {
                    errorArray.push('name');
                }

                if(! this.image.source)
                {
                    errorArray.push('source');
                }

                if(! this.image.lead)
                {
                    errorArray.push('lead');
                }

                if(errorArray.length === 1)
                {
                    errorString = errorArray[0];
                }
                else
                {
                    errorArray.forEach(function (value, key)
                    {
                        if(key !== errorArray.length - 1)
                        {
                            errorString += value + ', ';
                        }
                        else
                        {
                            errorString += 'and ' + value;
                        }
                    });
                }

                return errorString;

            },

            //Upload image
            uploadImage()
            {
                this.submitting = true;
                this.uploadPercentage = 0;

                let errorString = this.validateImageSave();

                if(errorString !== "")
                {
                    Vue.toast('Please provide the ' + errorString + ' for the image in order to save', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                    this.submitting = false;
                    return false;
                }

                this.imageCropper.getCroppedCanvas().toBlob((blob) => {
                    let formData = new FormData();

                    formData.append('image', blob);
                    formData.append('name', this.image.name);
                    formData.append('source', this.image.source);
                    formData.append('lead', this.image.lead);
                    formData.append('type', this.imageType.id);

                    var vm = this;

                    Api.http
                        .post('/images', formData, {
                            onUploadProgress(e) {
                                vm.uploadPercentage = Math.round(90 / e.total * e.loaded);
                            }
                        })
                        .then(async (response) => {
                            if(response.status === 201)
                            {
                                // Wait for the image to be available
                                var loaded = false;
                                var interval = await setInterval(() => {
                                    var img = new Image();
                                    img.onload = () => {
                                        this.uploadPercentage = 100;
                                        clearInterval(interval);
                                        setTimeout(() => {
                                            this.closeAddImage();
                                            this.navigate(1);
                                        }, 200);
                                    };
                                    img.onerror = () => {
                                        if(this.uploadPercentage < 99) {
                                            this.uploadPercentage += 1;
                                        }
                                    }
                                    img.src = response.data.url + '?' + Math.floor(Date.now() / 1000);
                                }, 1000);
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
        },
    }
</script>

<style lang="scss" scoped>
    .modal_title_bar {
        display: inline-flex;
        width: 100%;
    }

    .modal_title_bar .add_btn {
        margin-right: 0px;
        margin-left: auto;
    }

    .modal_title_bar .close_btn {
        margin-right: 0px;
        margin-left: 10px;
    }

    .image_selection_filters {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .image_selection_rows {
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .image_selection_section_image {
        margin-right: 10px;
        margin-top: auto;
        margin-bottom: auto;
        width: 240px;
    }

    .image_selection_section_image img, .image_selection_section_image video {
        max-height: 180px;
        width: auto;
        max-width: 240px;
        height: auto;
    }

    #imageSelectionModal .close {
        text-indent: initial !important;
    }

    #imageSelectionModal .modal-content {
        min-width: 900px;
    }

    .image_choice {
        cursor: pointer;
    }

    .image_chooser_section {
        padding-top: 10px;
        padding-bottom: 10px;
        height: 120px;
    }

    .nau_warning {
        z-index: 1000000;
    }
</style>
