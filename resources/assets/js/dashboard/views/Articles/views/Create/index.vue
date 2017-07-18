<template>
    <div>
        <page-title title="Articles" sub="Create" />
        <form @submit.prevent="handleSubmit">
            <div class="tabbable tabbable-tabdrop">
                <ul class="nav nav-tabs">
                    <li class="dropdown pull-right tabdrop">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false"><i class="fa fa-ellipsis-v"></i>&nbsp;<i class="fa fa-angle-down"></i> <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="#tab6" data-toggle="tab">Section 6</a>
                            </li>
                            <li>
                                <a href="#tab7" data-toggle="tab">Section 7</a>
                            </li>
                            <li>
                                <a href="#tab8" data-toggle="tab">Section 8</a>
                            </li>
                        </ul>
                    </li>
                    <li class="active">
                        <a href="#externalTitle" data-toggle="tab">External Title</a>
                    </li>
                    <li>
                        <a href="#internalTitle" data-toggle="tab">Internal Title</a>
                    </li>
                    <li>
                        <a href="#articleImage" data-toggle="tab">Main Image</a>
                    </li>
                    <li>
                        <a href="#articleLead" data-toggle="tab">Lead</a>
                    </li>
                    <li>
                        <a href="#articleMedia" data-toggle="tab">Media</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <!--External Title-->
                    <div class="tab-pane active" id="externalTitle">
                        <div class="form-body">
                            <div class="form-group">
                                <label for="dateline">Dateline</label>
                                <input
                                    id="dateline"
                                    type="text"
                                    name="dateline"
                                    maxlength="100"
                                    v-model.trim="article.dateline"
                                    placeholder="Add dateline (max 100chars)"
                                    class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="title">Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    maxlength="100"
                                    v-model.trim="article.title"
                                    placeholder="Add title (max 100chars)"
                                    class="form-control">
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="submit"
                                    :disabled="!article.dateline || !article.title || !article.internal_title || !article.internal_dateline || !article.lead || !articleMainImage.image">
                                Save article <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
                    </div>

                    <!--Internal Title-->
                    <div class="tab-pane" id="internalTitle">
                        <div class="form-body">
                            <div class="form-group">
                                <label for="internal_dateline">Dateline internal</label>
                                <input
                                    id="internal_dateline"
                                    type="text"
                                    name="internal_dateline"
                                    maxlength="100"
                                    v-model.trim="article.internal_dateline"
                                    placeholder="Add dateline internal"
                                    class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="internal_title">Title internal</label>
                                <input
                                    id="internal_title"
                                    type="text"
                                    name="internal_title"
                                    maxlength="100"
                                    v-model.trim="article.internal_title"
                                    placeholder="Add title internal"
                                    class="form-control">
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="submit"
                                    :disabled="!article.dateline || !article.title || !article.internal_title || !article.internal_dateline || !article.lead || !articleMainImage.image">
                                Save article <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
                    </div>

                    <!--Main Image-->
                    <div class="tab-pane" id="articleImage">
                        <div class="form-body">
                            <div class="form-group">
                                <h4 for="article_image">Article image</h4>
                                <div class="article_image_section">
                                    <div class="article_image_section_div">
                                        <i v-if="articleMainImage.image === '' && article.image_id === null" class="fa fa-image" ></i>
                                        <img v-if="article.image_id === null" v-bind:src="articleMainImage.image" alt="">
                                        <img v-if="article.image_id" v-bind:src="articleMainImage.image.url" alt="">
                                    </div>
                                </div>
                                <input class="btn btn-primary" type="file" name="article_image" id="article_image" v-on:change="mainArticleImageChange"/>
                                <button type="button" class="btn btn-primary image_selection_btn" data-toggle="modal" data-target="#imageSelectionModal">
                                    Select Uploaded Image
                                </button>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="submit"
                                    :disabled="!article.dateline || !article.title || !article.internal_title || !article.internal_dateline || !article.lead || !articleMainImage.image">
                                Save article <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
                    </div>

                    <!--Lead-->
                    <div class="tab-pane" id="articleLead">
                        <div class="form-body">
                            <div class="form-group">
                                <label for="lead">Lead</label>
                                <textarea
                                    id="lead"
                                    name="lead"
                                    maxlength="350"
                                    v-model.trim="article.lead"
                                    placeholder="Add lead"
                                    class="wysihtml5 form-control"
                                    rows="5"></textarea>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="submit"
                                    :disabled="!article.dateline || !article.title || !article.internal_title || !article.internal_dateline || !article.lead || !articleMainImage.image">
                                Save article <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
                    </div>

                    <!--Images, Videos and Sliders-->
                    <div class="tab-pane" id="articleMedia">
                        <div class="form-body">
                            <div class="form-group">
                                <h4>Images</h4>
                                <input type="file" class="btn btn-primary" name="article_images" id="article_images" @change="articleImagesChange" multiple/>
                                <div id="media_images" class="row">
                                    <div class="col-md-3 col-md-3" v-for="(image, index) in articleImages" id="media_image">
                                        <img :src="image.image" alt="">
                                        <div class="form-group">
                                            <input class="form-control" type="text" v-model="image.lead" placeholder="Enter lead for image"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-primary" type="button" :disabled="articleImages.length == 0 || article.id == null" @click="uploadArticleImages()">Save images</button>
                        </div>
                    </div>

                    <div class="tab-pane" id="tab6">
                        <p> Howdy, I'm in Section 6. </p>
                    </div>
                    <div class="tab-pane" id="tab7">
                        <p> Howdy, I'm in Section 7. </p>
                    </div>
                    <div class="tab-pane" id="tab8">
                        <p> Howdy, I'm in Section 8. </p>
                    </div>
                    <div class="tab-pane" id="tab9">
                        <p> Howdy, I'm in Section 9. </p>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    import request from 'dashboard/utils/request';
    import api from 'dashboard/utils/api';

    export default {
        data: () => {
            return {
                article: {
                    dateline: 'External Dateline',
                    title: 'External Title',
                    internal_dateline: 'Internal Dateline',
                    internal_title: 'Internal Title',
                    lead: 'Lead',
                    image_id: null,
                    id: null
                },
                submitting_main: false,
                articleMainImage: {
                    image: '',
                    imageId: null
                },
                articleImages: [
                ],
                saveArticleImagesDisabled: true
            };
        },

        computed: {
            selectedImageId()
            {
                return api.getImage();
            }
        },

        watch: {
            selectedImageId(newId, oldId)
            {
                if(newId)
                {
                    this.article.image_id = newId;
                    this.articleMainImage.imageId = newId;
                    api.resetImage();
                    this.getMainImage(newId);
                }
            }
        },
        methods: {
            //Receive the image from the upload button
            mainArticleImageChange() {
                let fileInput = document.getElementById('article_image');
                let file = fileInput.files[0];

                if (!file.type.match('image.*')) {
                    Vue.toast('The selected file is not an image. Please select and image and retry.', {
                        className : ['nau_toast','nau_warning'],
                    });
                    return;
                }

                let reader = new FileReader();
                let vm = this;

                reader.onload = function (e) {
                    vm.articleMainImage.image = e.target.result;
                    vm.articleMainImage.imageId = null;
                    vm.article.image_id = null;
                };

                reader.readAsDataURL(file);
            },

            //Get the image once we have obtained the selected id
            getMainImage(id) {
                request
                    .get(`/images/${id}`)
                    .then(response => {
                        this.articleMainImage.image = response.data;
                    })
                    .catch(err => Vue.toast('Error in retrieving the selected Image. Please retry again', {
                        className : ['nau_toast','nau_warning'],
                    }));
            },

            //Handle the submission of the article
            handleSubmit()
            {
                if (this.article.image_id)
                {
                    this.submitArticleDetails();
                }
                else
                {
                    this.submitArticleImage();
                }
            },

            submitArticleImage()
            {
                request
                    .post(`/images`, {
                        image: this.articleMainImage.image,
                        name: this.article.title,
                        source: this.article.title,
                        lead: this.article.title
                    })
                    .then(response => {

                        if(response.status === 201)
                        {
                            this.article.image_id = response.data.id;
                            this.articleMainImage.image = response.data;
                            this.submitArticleDetails();
                        }
                        else
                        {
                            Vue.toast('Error in uploading the selected Image. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            submitArticleDetails()
            {
                if(this.article.id)
                {
                    this.updateArticle();
                }
                else
                {
                    this.createArticle();
                }
            },

            createArticle()
            {
                request
                    .post(`/articles`, this.article)
                    .then(response => {
                        if(response.status === 201)
                        {
                            this.article.id = response.data.id;
                            Vue.toast('Article updated successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in creation of the article. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            updateArticle() {
                request
                    .put(`/articles/${this.article.id}`, this.article)
                    .then(response => {
                        if(response.status === 201)
                        {
                            Vue.toast('Article updated successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in updating the article. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            articleImagesChange: function () {
                var fileElement = document.getElementById('article_images');
                if (!fileElement) return;
                for (var i = 0; i < fileElement.files.length; i++) {
                    var reader = new FileReader();
                    reader.readAsDataURL(fileElement.files[i]);
                    reader.onload = (e) => {
                        this.articleImages.push({ image: e.target.result, lead: '' });
                    };
                }
            },

            //Upload article images and link them to article
            uploadArticleImages()
            {
                let vm = this;

                this.articleImages.forEach(function (value, key)
                {
                    request
                        .post(`/images`, {
                            image: value.image,
                            name: vm.article.title,
                            source: vm.article.title,
                            lead: (value.lead !== '') ? value.lead : vm.article.title
                        })
                        .then(response => {
                            if(response.status === 201)
                            {
                                vm.linkImageToArticle(response.data.id);
                            }
                            else
                            {
                                Vue.toast('Error in uploading the selected Image. Please retry again', {
                                    className: ['nau_toast', 'nau_warning'],
                                });
                            }
                        });

                });
            },

            linkImageToArticle(id)
            {
                request
                    .put(`/articles/${this.article.id}/images/${id}`)
                    .then(response => {
                        if(response.status === 201)
                        {
                            console.log(response);
                        }
                        else
                        {
                            Vue.toast('Error in uploading the selected Image. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });

            }
        },
        mounted: function () {

            var editor = $('#lead').wysihtml5({
                name: 'lead',
                image: false,
                lists: false,
                emphasis: true,
                html: false,
                'font-styles': false
            });
            setTimeout(() => {
                $('.wysihtml5-sandbox.lead').contents().find('body').on('keyup', () => {
                    setTimeout(() => { this.article.lead = $('#lead').val(); }, 256);
                });
            }, 0);
        }
    };
</script>

<style lang="css">
    .article_image_section {
        padding: 10px;
    }

    .article_image_section_div {
        position: relative;
        background-color: grey;
        display: inline-block;
        width: 600px;
        height: 300px;
        text-align: center;
    }

    .article_image_section_div i {
        position: absolute;
        color: #999;
        left: 300px;
        top: 150px;
        transform: translate(-50%, -50%);
        font-size: 32px;
    }

    .article_image_section_div img {
        max-width: 100%;
        max-height: 300px;
    }

    #article_image {
        display: inline-flex;
    }

    #media_images {
        margin-top: 10px;
        display: inline-flex;
    }

    #media_image {
        padding: 10px;
        margin-left: 15px;
        width: 300px;
        height: 240px;
        border: 1px solid #E3E3E3;
        border-radius: 3px;
        background: #e3e3e3;
    }

    #media_image img {
        max-width: 100%;
        max-height: 180px;
        margin-bottom: 10px;
    }





</style>