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
                    <li>
                        <a href="#articleSocialMedia" data-toggle="tab">Social Media</a>
                    </li>
                    <li>
                        <a href="#articleBody" data-toggle="tab">Body</a>
                    </li>
                    <li>
                        <a href="#articleLearning" data-toggle="tab">Learnings</a>
                    </li>
                    <li>
                        <a href="#articleInfoBoxes" data-toggle="tab">Info Boxes</a>
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
                                    :disabled="!article.dateline || !article.title || !article.internal_title || !article.internal_dateline || !article.lead || !articleMainImage.url">
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
                                    :disabled="!article.dateline || !article.title || !article.internal_title || !article.internal_dateline || !article.lead || !articleMainImage.url">
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
                                        <i v-if="! articleMainImage.url" class="fa fa-image" ></i>
                                        <img v-if="articleMainImage.url" v-bind:src="articleMainImage.url" alt="">
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
                                    :disabled="!article.dateline || !article.title || !article.internal_title || !article.internal_dateline || !article.lead || !articleMainImage.url">
                                Save article <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
                    </div>

                    <!--Lead-->
                    <div class="tab-pane" id="articleLead">
                        <div class="form-body wysihtmlLead">
                            <div class="form-group">
                                <label>Lead</label>
                                <div id="lead-toolbar" style="display: none;" class="wysihtml_toolbar text-right">
                                    <a data-wysihtml5-command="bold" title="CTRL+B" class="btn btn-primary btn-sm">Bold</a>
                                    <a data-wysihtml5-command="createLink" class="btn btn-primary btn-sm">URL</a>

                                    <div data-wysihtml5-dialog="createLink" style="display: none;" class="toolbar_url">
                                        <input data-wysihtml5-dialog-field="href" class="form-control" value="http://">
                                        <a data-wysihtml5-dialog-action="save" class="btn btn-primary btn-sm">OK</a>&nbsp;&nbsp;&nbsp;<a data-wysihtml5-dialog-action="cancel" class="btn btn-danger btn-sm">Cancel</a>
                                    </div>
                                </div>
                                <textarea
                                        id="leadEditor"
                                        placeholder="Add lead"
                                        class="form-control articleEditor wysihtmlTextArea"
                                        v-model.trim="article.lead"
                                        maxlength="350"
                                        rows="5">
                                </textarea>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="submit"
                                    :disabled="!article.dateline || !article.title || !article.internal_title || !article.internal_dateline || !articleMainImage.url">
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
                                        <img v-if="image.id == null" :src="image.image" alt="">
                                        <img v-if="image.id != null" :src="image.image.url" alt="">
                                        <div class="form-group">
                                            <input class="form-control" type="text" v-model="image.lead" placeholder="Enter lead for image"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-primary" type="button" :disabled="articleImages.length == 0 || article.id == null" @click="uploadArticleImages()">Save images</button>
                        </div>
                        <div class="form-body">
                            <div class="form-group">
                                <h4>Videos</h4>
                                <input type="file" class="btn btn-primary" name="article_videos" id="article_videos" @change="articleVideosChange" multiple/>
                                <div id="media_videos" class="row">
                                    <div class="col-md-3 col-md-3" v-for="(video, index) in articleVideos" id="media_video">
                                        <video v-if="video.id == null" controls>
                                            <source :src="video.video">
                                        </video>
                                        <video v-if="video.id != null" controls>
                                            <source :src="video.video.urls[0]" type="video/mp4">
                                            <source :src="video.video.urls[1]" type="video/webm">
                                        </video>
                                        <div class="form-group">
                                            <input class="form-control" type="text" v-model="video.lead" placeholder="Enter lead for video"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-primary" type="button" :disabled="articleVideos.length == 0 || article.id == null" @click="uploadArticleVideos()">Save videos</button>
                        </div>
                    </div>

                    <!--Social Media-->
                    <div class="tab-pane" id="articleSocialMedia">
                        <p> Howdy, I'm in Section 6. </p>
                    </div>

                    <!--Bodies-->
                    <div class="tab-pane" id="articleBody">
                        <div class="form-body">
                            <label><b>Body</b></label>
                            <div v-for="(articleBody, index) in articleBodies" class="form-group wysihtmlBody">

                                <div id="body-toolbar" style="display: none;" class="wysihtml_toolbar text-right">
                                    <a data-wysihtml5-command="bold" title="CTRL+B" class="btn btn-primary btn-sm">Bold</a>
                                    <a data-wysihtml5-command="createLink" class="btn btn-primary btn-sm">URL</a>

                                    <div data-wysihtml5-dialog="createLink" style="display: none;" class="toolbar_url">
                                        <input data-wysihtml5-dialog-field="href" class="form-control" value="http://">
                                        <a data-wysihtml5-dialog-action="save" class="btn btn-primary btn-sm">OK</a>&nbsp;&nbsp;&nbsp;<a data-wysihtml5-dialog-action="cancel" class="btn btn-danger btn-sm">Cancel</a>
                                    </div>
                                </div>
                                <textarea
                                        id="bodyEditor"
                                        v-model.trim="articleBody.content"
                                        placeholder="Here is some text input"
                                        class="form-control articleEditor"
                                        rows="5">
                                </textarea>
                                <div class="form-actions">
                                    <button
                                            class="btn btn-danger remove_btn"
                                            type="button"
                                            @click="deleteArticleBody(index)">
                                        Remove Body
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="form-actions item_add">
                            <button
                                    @click="addArticleBody()"
                                    class="btn btn-primary item_add_btn"
                                    :disabled="articleBodies.length >= 5"
                                    type="button"> +
                            </button>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="button"
                                    @click="saveArticleBodies()"
                                    :disabled="article.id == null">
                                Save bodies <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
                    </div>

                    <!--Learnings-->
                    <div class="tab-pane" id="articleLearning">
                        <div class="form-body">

                            <p>Learnings</p>
                            <div v-for="(articleLearning, index) in articleLearnings" class="form-group">
                                <div class="form-group">
                                    <input
                                            type="text"
                                            maxlength="100"
                                            v-model.trim="articleLearning.text"
                                            placeholder="Input text (max 100chars)"
                                            class="form-control article_input">
                                    <button
                                            @click="deleteArticleLearning(index)"
                                            class="btn btn-danger btn-sm delete_btn"
                                            :disabled="articleLearnings.length <= 3"
                                            type="button"> x
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="form-actions item_add">
                            <button
                                    @click="addArticleLearning()"
                                    class="btn btn-primary item_add_btn"
                                    :disabled="articleLearnings.length >= 5"
                                    type="button"> +
                            </button>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="button"
                                    @click="saveArticleLearnings()"
                                    :disabled="disableLearningSubmit">
                                Save learnings <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
                    </div>

                    <!--Info Boxes-->
                    <div class="tab-pane" id="articleInfoBoxes">
                        <div class="form-body">
                            <label><b>Info Boxes</b></label>
                            <div v-for="(articleInfoBox, index) in articleInfoBoxes" class="form-group wysihtmlInfoBox">
                                <div id="infoBox-toolbar" style="display: none;" class="wysihtml_toolbar text-right">
                                </div>
                                <textarea
                                        id="infoBoxEditor"
                                        v-model.trim="articleInfoBox.content"
                                        placeholder="Here is some text input"
                                        class="form-control articleEditor"
                                        rows="5">
                                </textarea>
                                <div class="form-actions">
                                    <button
                                            class="btn btn-danger remove_btn"
                                            type="button"
                                            @click="deleteArticleInfoBox(index)">
                                        Remove InfoBox
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="form-actions item_add">
                            <button
                                    @click="addArticleInfoBox()"
                                    class="btn btn-primary item_add_btn"
                                    :disabled="articleInfoBoxes.length >= 5"
                                    type="button"> +
                            </button>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="button"
                                    @click="saveArticleInfoBoxes()"
                                    :disabled="article.id == null">
                                Save info box <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        data: () => {
            return {
                article: {
                    dateline: 'External Dateline',
                    title: 'External Title',
                    internal_dateline: 'Internal Dateline',
                    internal_title: 'Internal Title',
                    lead: 'Lead',
                    id: null
                },
                submitting_main: false,
                articleMainImage: {
                    url: null,
                    id: null
                },
                articleImages: [
                ],
                articleVideos: [
                ],
                articleBodies: [
                    {
                        content: '',
                        id: null
                    }
                ],
                articleBodyEditors: [
                ],
                articleBodyWithContent: false,
                articleLearnings: [
                    {
                        text: '',
                        id: null
                    },
                    {
                        text: '',
                        id: null
                    },
                    {
                        text: '',
                        id: null
                    }
                ],
                articleInfoBoxes: [
                    {
                        id: null,
                        content: ''
                    }
                ],
                articleInfoBoxEditors: [
                ],
                saveArticleImagesDisabled: true
            };
        },

        computed: {
            selectedImageId()
            {
                return Api.getImage();
            },

            disableLearningSubmit()
            {
                if(this.article.id === null)
                {
                    return true;
                }

                let totalLearnings = 0;

                this.articleLearnings.forEach(function (value, key)
                {
                    if(value.text !== '')
                    {
                        totalLearnings ++;
                    }
                });

                return ! (totalLearnings >= 3);
            }
        },

        watch: {
            selectedImageId(newId, oldId)
            {
                if(newId)
                {
                    Api.resetImage();
                    this.getMainImage(newId);
                }
            }
        },
        methods: {
            /**
             * INITIALIZE THE ARTICLE (EDIT ONLY)
             */
            initialiseArticle(id)
            {
                Api.http
                    .get(`/articles/${id}`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            if(response.data.image)
                            {
                                this.articleMainImage = response.data.image;
                            }
                            this.fillArticleData(response.data);
                            this.initializeLeadEditor(this);
                            this.initializeArticleBodies(id);
                            this.initializeArticleLearnings(id);
                            this.initializeArticleInfoBoxes(id);
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the article for edit. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Fill the aricle object with the data
            fillArticleData(data)
            {
                this.article.id = data.id;
                this.article.dateline = data.dateline;
                this.article.title = data.title;
                this.article.internal_dateline = data.internal_dateline;
                this.article.internal_title = data.internal_title;
                this.article.lead = data.lead;
            },

            //Get the data for the bodies linked to the article
            initializeArticleBodies(id)
            {
                Api.http
                    .get(`/articles/${id}/bodies`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            if(response.data.length !== 0)
                            {
                                this.articleBodies = response.data;
                            }

                            let vm = this;

                            setTimeout(() =>
                            {
                                this.articleBodies.forEach(function (value, key)
                                {
                                    vm.initializeBodyEditor(vm, key);
                                })
                            }, 100);
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the article bodies. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Get the data for the learnings linked to the article
            initializeArticleLearnings(id)
            {
                Api.http
                    .get(`/articles/${id}/learnings`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            if(response.data.length !== 0)
                            {
                                this.articleLearnings = response.data;
                            }
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the article learnings. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Get the data for the info boxes linked to the article
            initializeArticleInfoBoxes(id)
            {
                Api.http
                    .get(`/articles/${id}/infoboxes`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            if(response.data.length !== 0)
                            {
                                this.articleInfoBoxes = response.data;
                            }

                            let vm = this;

                            setTimeout(() =>
                            {
                                this.articleInfoBoxes.forEach(function (value, key)
                                {
                                    vm.initializeInfoBoxEditor(vm, key);
                                })
                            }, 100);
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the article info boxes. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            /**
             * EDITORS
             */
            //Initialize the editors when creating an article
            initializeEditors()
            {
                this.initializeLeadEditor(this);
                this.initializeBodyEditor(this, 0);
                this.initializeInfoBoxEditor(this, 0);
            },

            //Initialize lead editor
            initializeLeadEditor(vm)
            {
                let leadSection = $($('.wysihtmlLead')).get(0);

                let leadEditor = new wysihtml5.Editor($(leadSection).find('#leadEditor').get(0), {
                    toolbar:      $(leadSection).find('#lead-toolbar').get(0),
                    parserRules:  wysihtml5ParserRules
                }).on("change", function () {
                    vm.article.lead = this.getValue();
                });
            },

            //Initialize body editors
            initializeBodyEditor(vm, id)
            {
                let bodySection = $($('.wysihtmlBody')).get(id);

                let bodyEditor = new wysihtml5.Editor($(bodySection).find('#bodyEditor').get(0), {
                    toolbar: $(bodySection).find('#body-toolbar').get(0),
                    parserRules: wysihtml5ParserRules
                }).on("change", function () {
                    vm.articleBodies[id].content = this.getValue();
                });

                vm.articleBodyEditors.push({editor: bodyEditor});
            },

            //Initialize info box editors
            initializeInfoBoxEditor(vm, id)
            {
                let infoBoxSection = $($('.wysihtmlInfoBox')).get(id);

                let infoBoxEditor = new wysihtml5.Editor($(infoBoxSection).find('#infoBoxEditor').get(0), {
                    toolbar: $(infoBoxSection).find('#infoBox-toolbar').get(0),
                    parserRules: wysihtml5ParserRules
                }).on("change", function () {
                    vm.articleInfoBoxes[id].content = this.getValue();
                });

                vm.articleInfoBoxEditors.push({editor: infoBoxEditor});
            },

            /**
             * MAIN ARTICLE IMAGE
             */
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
                    vm.articleMainImage.url = e.target.result;
                    vm.articleMainImage.id = null;
                };

                reader.readAsDataURL(file);
            },

            //Get the image once we have obtained the selected id
            getMainImage(id) {
                Api.http
                    .get(`/images/${id}`)
                    .then(response =>
                    {
                        if(response.status === 200)
                        {
                            this.articleMainImage = response.data;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the selected Image. Please retry again', {
                                className : ['nau_toast','nau_warning'],
                            });
                        }
                    });
            },

            //Submit article image
            submitArticleImage()
            {
                Api.http
                    .post(`/images`, {
                        image: this.articleMainImage.url,
                        name: '',
                        source: '',
                        lead: ''
                    })
                    .then(response => {

                        if(response.status === 201)
                        {
                            this.articleMainImage = response.data;
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

            /**
             * SUBMIT OF ARTICLE DETAILS
             */
            //Handle the submission of the article
            handleSubmit()
            {
                this.article.lead = $('#leadEditor').val();

                if (this.article.lead !== '')
                {
                    if (this.articleMainImage.id)
                    {
                        this.submitArticleDetails();
                    }
                    else
                    {
                        this.submitArticleImage();
                    }
                }
                else
                {
                    Vue.toast('Please provide the lead for the article', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            },

            //Submit the details for the article
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

            //Create a new article
            createArticle()
            {
                Api.http
                    .post(`/articles`, this.article)
                    .then(response => {
                        if(response.status === 201)
                        {
                            this.fillArticleData(response.data);
                            this.linkMainImageToArticle();
                            Vue.toast('Article created successfully', {
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

            //Update an article
            updateArticle() {
                Api.http
                    .put(`/articles/${this.article.id}`, this.article)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.fillArticleData(response.data);
                            if(! (response.data.image && response.data.image.id === this.articleMainImage.id))
                            {
                                this.linkMainImageToArticle();
                            }

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

            //Link the article to the main image
            linkMainImageToArticle()
            {
                Api.http
                    .put(`/articles/${this.article.id}/preview/${this.articleMainImage.id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            Vue.toast('Article preview image added successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in updating the article main image. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            /**
             * ARTICLE MEDIA
             */
            //Handle when images are uploaded
            articleImagesChange: function () {
                var fileElement = document.getElementById('article_images');
                if (!fileElement) return;
                for (var i = 0; i < fileElement.files.length; i++) {
                    var reader = new FileReader();
                    reader.readAsDataURL(fileElement.files[i]);
                    reader.onload = (e) => {
                        this.articleImages.push({ image: e.target.result, lead: '', id: null });
                    };
                }
            },

            //Upload article images and link them to article
            uploadArticleImages()
            {
                let vm = this;

                this.articleImages.forEach(function (value, key)
                {
                    Api.http
                        .post(`/images`, {
                            image: value.image,
                            name: vm.article.title,
                            source: vm.article.title,
                            lead: (value.lead !== '') ? value.lead : vm.article.title
                        })
                        .then(response => {
                            if(response.status === 201)
                            {
                                value.image = response.data;
                                value.id = response.data.id;
                                value.lead = response.data.lead;
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

            //Link an image to an article
            linkImageToArticle(id)
            {
                Api.http
                    .put(`/articles/${this.article.id}/images/${id}`)
                    .then(response => {
                        if(response.status === 200)
                        {
                        }
                        else
                        {
                            Vue.toast('Error in linking the image. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });

            },

            //Handle when a video is  uploaded
            articleVideosChange: function ()
            {
                var fileElement = document.getElementById('article_videos');
                if (!fileElement) return;
                for (var i = 0; i < fileElement.files.length; i++) {
                    var reader = new FileReader();
                    reader.readAsDataURL(fileElement.files[i]);
                    reader.onload = (e) => {
                        this.articleVideos.push({ video: e.target.result, lead: '', id: null });
                    };
                }
            },

            //Upload article videos and link them to article
            uploadArticleVideos()
            {
                let vm = this;

                this.articleVideos.forEach(function (video, key)
                {
                    vm.submitVideoDetails(video);
                });
            },

            submitVideoDetails(video)
            {
                let vm = this;

                Api.http
                    .post(`/videos`, {
                        name: this.article.title,
                        lead: (video.lead !== '') ? video.lead : vm.article.title,
                        source: vm.article.title,
                        user_id: api.user().id
                    })
                    .then(response => {
                        if(response.status === 201)
                        {
                            vm.startVideoUpload(response, video);
                        }
                        else
                        {
                            Vue.toast('Error in uploading the selected video. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            startVideoUpload(data, video) {

                let uploadUrl = data.data.upload_url;
                let urlArray = uploadUrl.split("api-naut.livesystems.ch");
                let tokenString = urlArray[urlArray.length - 1];

                Api.http
                    .put(tokenString, {
                        video : video.video
                    })
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.completeVideoUpload(response, video);
                        }
                        else
                        {
                            Vue.toast('Error in uploading the selected video. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            completeVideoUpload(data, video)
            {
                let uploadUrl = data.data.complete_url;
                let urlArray = uploadUrl.split("api-naut.livesystems.ch");
                let tokenString = urlArray[urlArray.length - 1];

                Api.http
                    .post(tokenString)
                    .then(response => {
                        if (response.status === 200) {
                            video.video = response.data;
                            video.lead = response.data.lead;
                            video.id = response.data.id;
                            this.linkVideoToArticle(video.id);
                        }
                        else {
                            Vue.toast('Error in uploading the selected video. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Link the video to the article
            linkVideoToArticle(id)
            {
                Api.http
                    .put(`/articles/${this.article.id}/videos/${id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            Vue.toast('Video linked successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in linking the video. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            /**
             * ARTICLE BODY
             */
            //Add an article body
            addArticleBody()
            {
                let vm = this;
                this.articleBodies.push({content: '', id: null});
                setTimeout(() =>
                {
                    vm.initializeBodyEditor(vm, vm.articleBodies.length - 1);
                }, 100);
            },

            //Delete an article body
            deleteArticleBody(key)
            {
                let vm = this;

                if(vm.articleBodies[key].id)
                {
                    Api.http
                        .delete(`/articles/${vm.article.id}/bodies/${vm.articleBodies[key].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                vm.deleteLocalBody(vm, key);
                                Vue.toast('Article body deleted successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                        });
                }
                else
                {
                    vm.deleteLocalBody(vm, key);
                }
            },

            //Delete the body record from local data
            deleteLocalBody(vm, key)
            {
                vm.articleBodyEditors[vm.articleBodies.length - 1].editor.destroy();
                vm.articleBodies.splice(key, 1);
                vm.articleBodyEditors.splice(vm.articleBodyEditors.length - 1, 1);

                vm.articleBodyEditors.forEach(function (value, key)
                {
                    value.editor.setValue(vm.articleBodies[key].content);
                });
            },

            //Save the bodies for the articles
            saveArticleBodies()
            {
                this.articleBodyWithContent = false;
                let vm = this;

                this.articleBodies.forEach(function (value, key)
                {
                    value.content = vm.articleBodyEditors[key].editor.getValue();

                    if(value.content !== '')
                    {
                        vm.articleBodyWithContent = true;

                        if(value.id)
                        {
                            Api.http
                                .put(`/articles/${vm.article.id}/bodies/${value.id}`, {
                                    content: value.content,
                                })
                                .then(response => {
                                    if(response.status === 200)
                                    {
                                        vm.articleBodies[key] = response.data;
                                        Vue.toast('Article body updated successfully', {
                                            className: ['nau_toast', 'nau_success'],
                                        });
                                    }
                                });
                        }
                        else
                        {
                            Api.http
                                .post(`/articles/${vm.article.id}/bodies`, {
                                    content: value.content,
                                })
                                .then(response => {
                                    if(response.status === 201)
                                    {
                                        vm.articleBodies[key] = response.data;
                                        Vue.toast('Article body created successfully', {
                                            className: ['nau_toast', 'nau_success'],
                                        });
                                    }
                                });
                        }
                    }
                });

                if(! this.articleBodyWithContent)
                {
                    Vue.toast('Please make sure that you have content in the body', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            },

            /**
             * ARTICLE LEARNINGS
             */
            //Add article learnings
            addArticleLearning()
            {
                if(this.articleLearnings.length < 5)
                {
                    this.articleLearnings.push({text: '', id: null});
                }
                else
                {
                    Vue.toast('Only a maximum of 5 learnings can be added', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            },

            //Save article learnings
            saveArticleLearnings()
            {
                let vm = this;

                this.articleLearnings.forEach(function (value, key)
                {
                    if(value.text !== '')
                    {
                        if(value.id)
                        {
                            Api.http
                                .put(`/articles/${vm.article.id}/learnings/${value.id}`, {
                                    text: value.text,
                                })
                                .then(response => {
                                    if(response.status === 200)
                                    {
                                        vm.articleLearnings[key] = response.data;
                                        Vue.toast('Article learnings updated successfully', {
                                            className: ['nau_toast', 'nau_success'],
                                        });
                                    }
                                });
                        }
                        else
                        {
                            Api.http
                                .post(`/articles/${vm.article.id}/learnings`, {
                                    text: value.text,
                                })
                                .then(response => {
                                    if(response.status === 201)
                                    {
                                        vm.articleLearnings[key] = response.data;
                                        Vue.toast('Article learnings created successfully', {
                                            className: ['nau_toast', 'nau_success'],
                                        });
                                    }
                                });
                        }
                    }
                });
            },

            //Delete a learning
            deleteArticleLearning(key)
            {
                let vm = this;

                Api.http
                    .delete(`/articles/${vm.article.id}/learnings/${vm.articleLearnings[key].id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            vm.articleLearnings.splice(key, 1);
                            Vue.toast('Article learning deleted successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                    });
            },

            /**
             * ARTICLE INFOBOXES
             */
            //Add an info box
            addArticleInfoBox()
            {
                let vm = this;
                this.articleInfoBoxes.push({content: '', id: null});
                setTimeout(() =>
                {
                    vm.initializeInfoBoxEditor(vm, vm.articleInfoBoxes.length - 1);
                }, 100);
            },

            //Delete an article info box
            deleteArticleInfoBox(key)
            {
                let vm = this;

                if(vm.articleInfoBoxes[key].id)
                {
                    Api.http
                        .delete(`/articles/${vm.article.id}/infoboxes/${vm.articleInfoBoxes[key].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                vm.deleteLocalInfoBox(vm, key);
                                Vue.toast('Article infobox deleted successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                        });
                }
                else
                {
                    vm.deleteLocalInfoBox(vm, key);
                }
            },

            //Delete the info box record from local data
            deleteLocalInfoBox(vm, key)
            {
                vm.articleInfoBoxEditors[vm.articleInfoBoxes.length - 1].editor.destroy();
                vm.articleInfoBoxes.splice(key, 1);
                vm.articleInfoBoxEditors.splice(vm.articleInfoBoxEditors.length - 1, 1);

                vm.articleInfoBoxEditors.forEach(function (value, key)
                {
                    value.editor.setValue(vm.articleInfoBoxes[key].content);
                });
            },

            //Save the info boxes for the articles
            saveArticleInfoBoxes()
            {
                this.articleInfoBoxWithContent = false;
                let vm = this;

                this.articleInfoBoxes.forEach(function (value, key)
                {
                    value.content = vm.articleInfoBoxEditors[key].editor.getValue();

                    if(value.content !== '')
                    {
                        vm.articleInfoBoxWithContent = true;

                        if(value.id)
                        {
                            Api.http
                                .put(`/articles/${vm.article.id}/infoboxes/${value.id}`, {
                                    content: value.content,
                                })
                                .then(response => {
                                    if(response.status === 200)
                                    {
                                        vm.articleInfoBoxes[key] = response.data;
                                        Vue.toast('Article info box updated successfully', {
                                            className: ['nau_toast', 'nau_success'],
                                        });
                                    }
                                });
                        }
                        else
                        {
                            Api.http
                                .post(`/articles/${vm.article.id}/infoboxes`, {
                                    content: value.content,
                                })
                                .then(response => {
                                    if(response.status === 201)
                                    {
                                        vm.articleInfoBoxes[key] = response.data;
                                        Vue.toast('Article infobox created successfully', {
                                            className: ['nau_toast', 'nau_success'],
                                        });
                                    }
                                });
                        }
                    }
                });

                if(! this.articleInfoBoxWithContent)
                {
                    Vue.toast('Please make sure that you have content in the body', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            },
        },

        mounted: function ()
        {
            if(this.$route.params.hasOwnProperty('id'))
            {
                this.initialiseArticle(this.$route.params.id);
            }
            else
            {
                this.initializeEditors();
            }
        }
    }
</script>

<style lang="css">
    .wysihtml_toolbar {
        margin-bottom: 5px;
        width: 100%;
    }

    .toolbar_url {
        width: 100%;
        text-align: right;
        padding-top: 5px;
    }

    .toolbar_url input {
        display: inline-flex;
        max-width: 50%;
    }

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

    #media_videos {
        margin-top: 10px;
        display: inline-flex;
    }

    #media_video {
        padding: 10px;
        margin-left: 15px;
        width: 300px;
        height: 240px;
        border: 1px solid #E3E3E3;
        border-radius: 3px;
        background: #e3e3e3;
    }

    #media_video video {
        max-width: 100%;
        max-height: 180px;
        margin-bottom: 10px;
    }

    .item_add {
        margin-bottom: 10px;
    }

    .item_add_btn {
        width: 100%;
        border-radius: 3px;
        margin-bottom: 5px;
    }

    .remove_btn {
        margin-top: 10px;
    }

    .article_input {
        display: inline-flex;
        max-width: 94%;
    }

    .delete_btn {
        width: 5%;
        max-width: 28px;
        float: right;
    }
</style>