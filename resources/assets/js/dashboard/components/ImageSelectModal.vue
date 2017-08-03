<template>
    <div class="modal fade" id="imageSelectionModal" tabindex="-1" role="dialog" aria-labelledby="imageSelectionModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal_title_bar">
                        <h4 class="modal-title" id="myModalLabel">Images</h4>
                        <button type="button" class="btn btn-primary btn-sm add_btn" :disabled="addingImage" @click="showAddImage()"><i class="fa fa-plus"></i></button>
                        <button type="button" class="btn btn-danger btn-sm close_btn" data-dismiss="modal" aria-label="Close"><i class="fa fa-close"></i></button>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form-group" v-if="addingImage">
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Image</label>
                                <input
                                        class="form-control"
                                        type="file"
                                        name="image"
                                        id="image"
                                        @change="imageAdded"/>

                            </div>
                            <div class="col-md-6 form-group">
                                <label>Name</label>
                                <input
                                        type="text"
                                        name="name"
                                        v-model.trim="image.name"
                                        placeholder="Name"
                                        class="form-control">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label>Lead</label>
                                <input
                                        type="text"
                                        name="lead"
                                        v-model.trim="image.lead"
                                        placeholder="Lead"
                                        class="form-control">
                                </input>
                            </div>

                            <div class="col-md-6 form-group">
                                <label>Source</label>
                                <input
                                        type="text"
                                        name="source"
                                        v-model.trim="image.source"
                                        placeholder="Source"
                                        class="form-control">
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                    @click="closeAddImage()"
                                    class="btn btn-danger"
                                    type="button">
                                Close
                            </button>
                            <button
                                    @click="uploadImage()"
                                    class="btn btn-primary"
                                    type="button"
                                    :disabled="! image.image || !image.name || !image.source || !image.lead">
                                Add Video
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
                                    <option :value="myUserId">My Images</option>
                                    <option :value="0">All Images</option>
                                </select>
                            </div>
                        </div>

                        <h3 v-if="!isLoaded" class="text-center">Loading...</h3>

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

                        <h3 v-else class="text-center">No images uploaded</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Pagination from 'dashboard/views/Images/views/List/components/Pagination';

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
                    source: ''
                },
                addingImage: false
            }
        },

        mounted() {
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
            Pagination
        },

        watch: {
            searchTerm() {
                this.navigate(1);
            },
            userId() {
                this.navigate(1);
            }
        },

        methods: {
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

                return Api.http.get(`/images?` + searchString + userString + `page=${page}`);
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
                }
            },

            //Handle when images are uploaded
            imageAdded()
            {
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
                }
            },

            //Upload image
            uploadImage()
            {
                Api.http
                    .post(`/images`, {
                        image: this.image.image,
                        name: this.image.name,
                        source: this.image.source,
                        lead: this.image.lead
                    })
                    .then(response => {
                        if(response.status === 201)
                        {
                            this.closeAddImage();
                            this.navigate(1);
                        }
                        else
                        {
                            Vue.toast('Error in uploading the Image. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },
        }
    }
</script>

<style>
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
</style>