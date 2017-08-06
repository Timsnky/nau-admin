<template>
    <div>
        <page-title title="Articles" sub="Create" />
        <div class="row">
            <div class="col-md-6">
            </div>
            <div class="col-md-6 text-right">
                <button
                        class="btn btn-primary pull-right margin_left_5"
                        @click="saveAndExit()">
                    Save Article and Exit
                </button>
                <button
                        class="btn btn-primary pull-right margin_left_5"
                        @click="handleSubmit()">
                    Save Article
                </button>
                <button
                        class="btn btn-primary pull-right"
                        @click="duplicateArticle()">
                    Duplicate Article
                </button>
            </div>
        </div>
        <form @submit.prevent="handleSubmit">
            <div class="tabbable tabbable-tabdrop">
                <ul class="nav nav-tabs">
                    <li class="active">
                        <a href="#externalTitle" data-toggle="tab">External Title</a>
                    </li>
                    <li @click="updateInternalDetails()">
                        <a href="#internalTitle" data-toggle="tab">Internal Title/Lead</a>
                    </li>
                    <li>
                        <a href="#articleImage" data-toggle="tab">Main Image</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleMedia" data-toggle="tab">Media</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleSocialMedia" data-toggle="tab">Social Media</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleExternalVideos" data-toggle="tab">External Videos</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleBody" data-toggle="tab">Body</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleLearning" data-toggle="tab">Learnings</a>
                    </li>
                    <!--<li :class="[article.id == null ? 'disabledTab' : '']">-->
                        <!--<a href="#articleInfoBoxes" data-toggle="tab">Info Boxes</a>-->
                    <!--</li>-->
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleTags" data-toggle="tab">Tags</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleSurveys" data-toggle="tab">Surveys</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleSettings" data-toggle="tab">Settings</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']" @click="refreshSortingData()">
                        <a href="#articleSorting" data-toggle="tab">Sorting</a>
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
                            <div class="form-group">
                                <label for="title">SEO Title</label>
                                <input
                                        id="seo_title"
                                        type="text"
                                        name="seo_title"
                                        maxlength="100"
                                        v-model.trim="article.seo_title"
                                        placeholder="Add seo title (max 100chars)"
                                        class="form-control">
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="submit">
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
                                    placeholder="Add dateline internal (max 100chars)"
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
                                    placeholder="Add title internal (max 100chars)"
                                    class="form-control">
                            </div>
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
                                            placeholder="Add lead (max 350chars)"
                                            class="form-control articleEditor wysihtmlTextArea"
                                            v-model.trim="article.lead"
                                            maxlength="350"
                                            rows="5">
                                </textarea>
                                </div>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="submit">
                                Save article <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
                    </div>

                    <!--Main Image-->
                    <div class="tab-pane" id="articleImage">
                        <div class="form-body">
                            <div class="form-group">
                                <h4>Article Main Image</h4>
                                <div class="article_image_section">
                                    <div class="article_image_section_div">
                                        <i v-if="! articleMainImage.url" class="fa fa-image" ></i>
                                        <img v-if="articleMainImage.url" :src="articleMainImage.url" alt="">
                                    </div>
                                </div>
                                <!--<input class="btn btn-primary" type="file" name="article_image" id="article_image" @change="mainArticleImageChange"/>-->
                                <button type="button" class="btn btn-primary image_selection_btn" @click="showImageSelectionModal(1,null)">
                                    Select Uploaded Image
                                </button>
                            </div>
                            <div class="form-group">
                                <h4>Article Teaser image</h4>
                                <div class="article_image_section">
                                    <div class="article_image_section_div">
                                        <i v-if="! articleTeaserImage.url" class="fa fa-image" ></i>
                                        <img v-if="articleTeaserImage.url" :src="articleTeaserImage.url" alt="">
                                    </div>
                                </div>
                                <!--<input class="btn btn-primary" type="file" name="article_image" id="article_teaser_image" @change="teaserArticleImageChange"/>-->
                                <button type="button" class="btn btn-primary image_selection_btn" @click="showImageSelectionModal(4,null)">
                                    Select Uploaded Image
                                </button>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="submit">
                                Save article <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
                    </div>

                    <!--Images, Videos and Sliders-->
                    <div class="tab-pane" id="articleMedia">
                        <!--Images-->
                        <div class="form-body">
                            <div class="form-group">
                                <h4>Images</h4>
                                <div class="row media_overflow">
                                    <div class="media_images">
                                        <div class="col-md-3 media_image" v-for="(image, index) in articleImages">
                                            <img :src="image.url" alt="">
                                            <div class="form-group">
                                                <input class="form-control" type="text" v-model="image.source" placeholder="Enter source for image (required)"/>
                                                <input class="form-control margin_top_5" type="text" v-model="image.lead" placeholder="Enter lead for image"/>
                                                <button
                                                        class="btn btn-danger btn-sm remove_btn"
                                                        type="button"
                                                        @click="confirmArticleImageDelete(index)">
                                                    <i class="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-actions selection_sections">
                                    <button type="button" class="btn btn-primary image_selection_btn" @click="showImageSelectionModal(2, null)">
                                        Select Uploaded Image
                                    </button>
                                    <!--<input type="file" class="btn btn-primary" name="article_images" id="article_images" @change="articleImagesChange" multiple/>-->
                                </div>
                            </div>
                            <button class="btn btn-primary" type="button" :disabled="articleImages.length == 0 || disableArticleImagesSubmit" @click="uploadArticleImages(article.id)">Save images</button>
                        </div>

                        <!--Sliders-->
                        <div class="form-body">
                            <h4>Sliders</h4>
                            <div class="media_images sliders">
                                <div v-for="(slider, sliderIndex) in articleSliders" class="slider_section">
                                    <div class="form-group">
                                        <input class="form-control" type="text" v-model="slider.name"
                                               placeholder="Enter name for slider (required)"/>
                                    </div>
                                    <div class="media_overflow">
                                        <div class="slider_images_section">
                                            <div v-for="(image, index) in slider.images" class="col-md-3 slider_image">
                                                <img :src="image.url" alt="">
                                                <div class="form-group">
                                                    <input class="form-control" type="text" v-model="image.pivot.order" placeholder="Enter order for image"/>
                                                    <button
                                                            class="btn btn-danger btn-sm remove_btn"
                                                            type="button"
                                                            @click="confirmSliderImageDelete(sliderIndex, index)">
                                                        <i class="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-actions">
                                        <button type="button" class="btn btn-primary image_selection_btn" @click="showImageSelectionModal(3, sliderIndex)">
                                            Select Uploaded Image
                                        </button>
                                        <button type="button" class="btn btn-danger image_selection_btn" @click="confirmSliderDelete(sliderIndex)">
                                            Remove slider
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary" @click="addArticleSlider()">Add Slider
                            </button>
                            <button class="btn btn-primary" type="button"
                                    :disabled="articleSliders.length == 0 || article.id == null"
                                    @click="uploadArticleSliders(article.id)">Save sliders
                            </button>
                        </div>

                        <!--Vidoes-->
                        <div class="form-body">
                            <div class="form-group">
                                <h4>Videos</h4>
                                <div  class="row media_overflow">
                                    <div class="media_images">
                                        <div class="col-md-3 col-md-3 media_image" v-for="(video, index) in articleVideos">
                                            <video v-if="video.id == null" controls>
                                                <source :src="video.video">
                                            </video>
                                            <video v-if="video.id != null" controls>
                                                <source :src="video.urls[0]" type="video/mp4">
                                                <source :src="video.urls[1]" type="video/webm">
                                            </video>
                                            <div class="form-group">
                                                <input class="form-control" type="text" v-model="video.source" placeholder="Enter source for video (required)"/>
                                                <input class="form-control margin_top_5" type="text" v-model="video.lead" placeholder="Enter lead for video"/>
                                                <button
                                                        class="btn btn-danger btn-sm remove_btn"
                                                        type="button"
                                                        @click="confirmVideoDelete(index)">
                                                    <i class="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-actions selection_sections">
                                    <button type="button" class="btn btn-primary image_selection_btn" data-toggle="modal" data-target="#videoSelectionModal">
                                        Select Uploaded Video
                                    </button>
                                    <!--<input type="file" class="btn btn-primary" name="article_videos" id="article_videos" @change="articleVideosChange" multiple/>-->
                                </div>

                            </div>
                            <button class="btn btn-primary" type="button" :disabled="articleVideos.length == 0 || disableArticleVideosSubmit" @click="uploadArticleVideos(article.id)">Save videos</button>
                        </div>
                    </div>

                    <!--Social Media-->
                    <div class="tab-pane" id="articleSocialMedia">
                        <social-media :article-id="article.id"></social-media>
                    </div>

                    <!--External Videos-->
                    <div class="tab-pane" id="articleExternalVideos">
                        <div class="form-body">
                            <external-videos :article-id="article.id"></external-videos>
                        </div>
                    </div>

                    <!--Bodies-->
                    <div class="tab-pane" id="articleBody">
                        <bodies :article-id="article.id"></bodies>
                    </div>

                    <!--Learnings-->
                    <div class="tab-pane" id="articleLearning">
                        <learnings :article-id="article.id"></learnings>
                    </div>

                    <!--Info Boxes-->
                    <!--<div class="tab-pane" id="articleInfoBoxes">-->
                        <!--<info-boxes :article-id="article.id"></info-boxes>-->
                    <!--</div>-->

                    <!--Tags and Related Stories-->
                    <div class="tab-pane" id="articleTags">
                        <tags :article-id="article.id"></tags>
                    </div>

                    <!--Surveys-->
                    <div class="tab-pane" id="articleSurveys">
                        <surveys :article-id="article.id"></surveys>
                    </div>

                    <!--Authors and Ideas-->
                    <div class="tab-pane" id="articleSettings">
                        <div class="form-body">

                            <div class="form-group">
                                <label>Authors</label>
                                <multiselect
                                        id="authorsMultiSelect"
                                        v-model="articleAuthors"
                                        :options="existingAuthors"
                                        placeholder="Type to search author"
                                        label="name"
                                        :max-height="500"
                                        :options-limit="100"
                                        :clear-on-select="false"
                                        :close-on-select="false"
                                        track-by="id"
                                        :multiple="true"
                                        open-direction="bottom"
                                        :internal-search="false"
                                        @search-change="searchAuthors"
                                        @remove="deleteAuthors">
                                </multiselect>
                            </div>

                            <div class="form-group">
                                <label>Informants</label>
                                <multiselect
                                        id="informantsMultiSelect"
                                        v-model="articleInformants"
                                        :options="existingInformants"
                                        placeholder="Type to search informant"
                                        label="name"
                                        :max-height="500"
                                        :options-limit="100"
                                        :clear-on-select="false"
                                        :close-on-select="false"
                                        track-by="id"
                                        :multiple="true"
                                        open-direction="bottom"
                                        :internal-search="false"
                                        @search-change="searchInformants"
                                        @remove="deleteInformants">
                                </multiselect>
                            </div>
                            <div class="form-group">
                                <label>Channel</label>
                                <select class="form-control" v-model="articleChannel">
                                    <option v-bind:value="channel.id" v-for="channel in existingChannels">
                                        {{ channel.display_name }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Publication Datetime</label>
                                <date-and-time
                                        @changeDate="changeDate"
                                        :date="article.published_at ? publicationDate : '' "/>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="button"
                                    @click="saveSettings(article.id)"
                                    :disabled="articleAuthors.length < 1 || article.id == null">
                                Save <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
                    </div>

                    <!--Sorting-->
                    <div class="tab-pane" id="articleSorting">
                        <div class="form-body">
                            <draggable v-model="articleElements">
                                <div v-for="(articleElement, index) in articleElements" :key="articleElement.element_id" class="form-group">
                                    <!--Image-->
                                    <div v-if="articleElement.type == 'image'" class="elementImageSection sectionDiv">
                                        <img :src="articleElement.url" alt="">
                                    </div>
                                    <!--Body-->
                                    <div v-if="articleElement.type == 'body'" class="sectionDiv">
                                        <p v-html="articleElement.content"></p>
                                    </div>
                                    <!--Slider-->
                                    <div v-if="articleElement.type == 'slider'" class="sliderSection sectionDiv">
                                        <div class="container">
                                            <div :id="getSliderIdName(articleElement.element_id)" class="carousel slide sliderSection" data-ride="carousel">
                                                <!-- Indicators -->
                                                <ol class="carousel-indicators">
                                                    <li v-for="(image, index) in getSliderImages(articleElement.id)" :data-target="getSliderIdNameHashed(articleElement.element_id)" :data-slide-to="index" v-bind:class="index == 0 ? 'active' : ''"></li>
                                                </ol>

                                                <!-- Wrapper for slides -->
                                                <div class="carousel-inner">
                                                    <div v-for="(image, index) in getSliderImages(articleElement.id)" v-bind:class="index == 0 ? 'active item elementImageSection' : 'item elementImageSection'">
                                                        <img :src="image.url">
                                                    </div>
                                                </div>

                                                <!-- Left and right controls -->
                                                <a class="left carousel-control" :href="getSliderIdNameHashed(articleElement.element_id)" data-slide="prev">
                                                    <span class="glyphicon glyphicon-chevron-left"></span>
                                                    <span class="sr-only">Previous</span>
                                                </a>
                                                <a class="right carousel-control" :href="getSliderIdNameHashed(articleElement.element_id)" data-slide="next">
                                                    <span class="glyphicon glyphicon-chevron-right"></span>
                                                    <span class="sr-only">Next</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <!--Learnings-->
                                    <div v-if="articleElement.type == 'learning'" class="sectionDiv">
                                        <p v-html="articleElement.text"></p>
                                    </div>
                                    <!--Social Media-->
                                    <div v-if="articleElement.type == 'socialmedia'" class="sectionDiv">
                                        <twitter-element :url="articleElement.url"></twitter-element>
                                    </div>
                                    <!--Info Box-->
                                    <!--<div v-if="articleElement.type == 'infobox'" class="sectionDiv">-->
                                        <!--<p v-html="articleElement.content"></p>-->
                                    <!--</div>-->
                                    <!--Videos-->
                                    <div v-if="articleElement.type == 'video'" class="elementImageSection sectionDiv">
                                        <video controls>
                                            <source :src="articleElement.urls[0]" type="video/mp4">
                                            <source :src="articleElement.urls[1]" type="video/webm">
                                        </video>
                                    </div>

                                    <!--Surveys-->
                                    <div v-if="articleElement.type == 'survey'" class="sectionDiv">
                                        <p>{{ articleElement.question }}</p>
                                    </div>
                                </div>
                            </draggable>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="button"
                                    @click="saveSortedElements()"
                                    :disabled="article.id == null">
                                Save Order
                            </button>
                        </div>
                    </div>
                </div>
                <image-select-modal></image-select-modal>
                <video-select-modal></video-select-modal>
            </div>
        </form>
    </div>
</template>
<script>
    import Multiselect from 'vue-multiselect';
    import TwitterElement from 'dashboard/components/TwitterTweet';
    import DateAndTime from 'dashboard/components/DateAndTime';
    import draggable from 'vuedraggable';
    import Surveys from './components/Surveys';
    import ExternalVideos from './components/ExternalVideos';
    import ImageSelectModal from 'dashboard/components/ImageSelectModal';
    import VideoSelectModal from 'dashboard/components/VideoSelectModal';
    import Tags from './components/Tags';
    import Learnings from './components/Learnings';
    import SocialMedia from './components/SocialMedia';
    import Bodies from './components/Bodies';
//    import InfoBoxes from './components/InfoBoxes';

    export default {
        data: () => {
            return {
                article: {
                    dateline: '',
                    title: '',
                    seo_title: '',
                    internal_dateline: '',
                    internal_title: '',
                    lead: '',
                    id: null,
                    published_at: null
                },
                duplicateArticleId: null,
                type: 1,
                leadEditor: null,
                submitting_main: false,
                articleMainImage: {
                    url: null,
                    id: null
                },
                articleTeaserImage: {
                    url: null,
                    id: null
                },
                articleImages: [
                ],
                articleVideos: [
                ],
                articleSliders: [
                ],
                selectectedSlider: null,
                articleAuthors: [
                ],
                existingAuthors: [
                ],
                searchedAuthor: {
                    query: '',
                    promise: true
                },
                articleInformants: [
                ],
                existingInformants: [
                ],
                searchedInformant: {
                    query: '',
                    promise: true
                },
                articleElements: [
                ],
                existingChannels: [
                ],
                articleChannel: null,
                saveArticleImagesDisabled: true,
            };
        },

        components: {
            Multiselect,
            TwitterElement,
            DateAndTime,
            draggable,
            Surveys,
            ExternalVideos,
            ImageSelectModal,
            VideoSelectModal,
            Tags,
            Learnings,
            SocialMedia,
            Bodies,
//            InfoBoxes
        },

        computed: {
            //Get the selected image id from the modal
            selectedImageId()
            {
                return Api.getImage();
            },

            //Get the selected video id from the modal
            selectedVideoId()
            {
                return Api.getVideo();
            },

            //Disable the submit images button
            disableArticleImagesSubmit()
            {
                if(this.article.id === null)
                {
                    return true;
                }

                for (let [key, value] of this.articleImages.entries())
                {
                    if(value.source === '')
                    {
                        return true
                    }
                }

                return false;
            },

            //Disable the video submit button
            disableArticleVideosSubmit()
            {
                if(this.article.id === null)
                {
                    return true;
                }

                for (let [key, value] of this.articleVideos.entries())
                {
                    if(value.source === '')
                    {
                        return true;
                    }
                }

                return false;
            },

            //Compute the publication date
            publicationDate()
            {
                return moment(this.article.published_at).format('YYYY-MM-DD HH:mm');
            },

            //Check if the lead editor is empty
            leadEditorEmpty()
            {
                if(this.leadEditor)
                {
                    return this.leadEditor.getValue() === '';
                }

                return false;
            },

            //Disable the saving of an article
            disableArticleSave()
            {
                return ! this.article.dateline || ! this.article.title || ! this.articleMainImage.url;
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
            },

            selectedVideoId(newId, oldId)
            {
                if(newId)
                {
                    Api.resetVideo();
                    this.getVideo(newId);
                }
            },
        },

        methods: {
            //Duplicate an article
            duplicateArticle()
            {
                if(this.article.id)
                {
                    this.prepareDuplication();
                    this.createDuplicateArticle();
                }
                else
                {
                    Vue.toast('Please create an article first inorder to duplicate', {
                        className: ['nau_toast', 'nau_warning'],
                    });

                }
            },

            //Prepare the article data before duplication
            prepareDuplication()
            {
                this.article.lead = this.leadEditor.getValue();
            },

            //Create a duplicate article
            createDuplicateArticle()
            {
                Api.http
                    .post(`/articles`, {
                        dateline: this.article.dateline,
                        title: this.article.title,
                        seo_title: this.article.seo_title,
                        internal_dateline: this.article.internal_dateline,
                        internal_title: this.article.internal_title,
                        lead: this.article.lead,
                    })
                    .then(response => {
                        if(response.status === 201)
                        {
                            this.duplicateArticleId = response.data.id;
                            this.duplicateLinkedItems();

                            Vue.toast('Article duplicated successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in duplication of the article. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });

            },

            //Duplicate the linked items
            duplicateLinkedItems()
            {
                this.sendDuplicationEvent(this.duplicateArticleId);
                this.submitArticleImage(this.duplicateArticleId);
                this.submitArticleTeaserImage(this.duplicateArticleId);
                this.uploadArticleImages(this.duplicateArticleId);
                this.uploadArticleSliders(this.duplicateArticleId);
                this.uploadArticleVideos(this.duplicateArticleId);
                this.saveArticleAuthorsAndIdeas(this.duplicateArticleId);
                this.$router.push('/articles/' + this.duplicateArticleId + '/edit');
            },

            //Send a request for data duplication to specified article id
            sendDuplicationEvent(articleId)
            {
                this.$emit('duplicateData', articleId);
            },

            //Save and exit an article
            saveAndExit()
            {
                if(this.article.id)
                {
                    Api.http
                        .put(`/articles/${this.article.id}`, this.article)
                        .then(response => {
                            if(response.status === 200)
                            {
                                this.article = response.data;
                                if(! (response.data.image && response.data.image.id === this.articleMainImage.id))
                                {
                                    this.submitArticleImage(this.article.id);
                                }
                                if(! (response.data.teaser_id === this.articleTeaserImage.id))
                                {
                                    this.submitArticleTeaserImage(this.article.id);
                                }
                                Vue.toast('Article updated and published successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });

                                this.$router.push('/articles');
                            }
                            else
                            {
                                Vue.toast('Error in updating and publish the article. Please retry again', {
                                    className: ['nau_toast', 'nau_warning'],
                                });
                            }
                        });
                }
                else
                {
                    Api.http
                        .post(`/articles`, this.article)
                        .then(response => {
                            if(response.status === 201)
                            {
                                this.article = response.data;
                                this.submitArticleImage(this.article.id);
                                this.submitArticleTeaserImage(this.article.id);
                                Vue.toast('Article created and published successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                            else
                            {
                                Vue.toast('Error in creation and publish of the article. Please retry again', {
                                    className: ['nau_toast', 'nau_warning'],
                                });
                            }

                            this.$router.push('/articles');
                        });
                }
            },

            /**
             * SORTING
             */
            //Get the id for the slider carousel
            getSliderIdName(elementId)
            {
                return "slider_" + elementId;
            },

            //Get the slider name string with the #
            getSliderIdNameHashed(elementId)
            {
                return "#slider_" + elementId;
            },

            //Get the images linked to a given slider
            getSliderImages(id)
            {
                for (let [key, value] of this.articleSliders.entries())
                {
                    if(value.id === id)
                    {
                        return value.images;
                    }
                }

                return [];
            },

            //Submit order elements
            saveSortedElements()
            {
                let orderArray = {};
                this.articleElements.forEach(function (value, key)
                {
                    orderArray[value.element_id] = key;
                });

                Api.http
                    .put(`/articles/${this.article.id}/elements`, orderArray)
                    .then(response => {
                        console.log(response);
//                        if(response.status === 204)
//                        {
//                            Vue.toast('Article preview image added successfully', {
//                                className: ['nau_toast', 'nau_success'],
//                            });
//                        }
//                        else
//                        {
//                            Vue.toast('Error in updating the article main image. Please retry again', {
//                                className: ['nau_toast', 'nau_warning'],
//                            });
//                        }
                    });
            },

            //Reload the sorting page data
            refreshSortingData()
            {
                if(this.article.id)
                {
                    this.initializeArticleElements(this.article.id);
                }
            },

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
                            this.article = response.data;
                            delete this.article['image'];
                            this.initializeLeadEditor(this);
                            if(this.article.teaser_id)
                            {
                                this.initializeArticleTeaserImage(this.article.teaser_id);
                            }
                            this.initializeArticleImages(id);
                            this.initializeArticleSliders(id);
                            this.initializeArticleVideos(id);
                            this.initializeArticleAuthors(id);
                            this.initializeArticleInformants(id);
                            this.initializeArticleElements(id);
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the article for edit. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Initialise article teaser image
            initializeArticleTeaserImage(id)
            {
                Api.http
                    .get(`/images/${id}`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.articleTeaserImage = response.data;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the article teaser image. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Get the images linked to the article
            initializeArticleImages(id)
            {
                Api.http
                    .get(`/articles/${id}/images`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.articleImages = response.data;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the article images. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Get the sliders and images for the article
            initializeArticleSliders(id)
            {
                Api.http
                    .get(`/articles/${id}/sliders`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.articleSliders = response.data;
                            let vm = this;

                            this.articleSliders.forEach(function (value, key)
                            {
                                vm.initializeSliderImages(key);
                            })
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the article images. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Get the slider images for a given slider
            initializeSliderImages(key)
            {
                Api.http
                    .get(`/sliders/${this.articleSliders[key].id}/images`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.articleSliders[key].images = response.data;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the article images. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });

            },

            //Get the videos linked to the article
            initializeArticleVideos(id)
            {
                Api.http
                    .get(`/articles/${id}/videos`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.articleVideos = response.data;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the article videos. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Get the authors for the article
            initializeArticleAuthors(id)
            {
                Api.http
                    .get(`/articles/${id}/authors`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.articleAuthors = response.data;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the authors. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Get the informants for the article
            initializeArticleInformants(id)
            {
                Api.http
                    .get(`/articles/${id}/informants`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.articleInformants = response.data;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the informants. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Get the channels for the dropdown
            initializeChannels()
            {
                Api.http
                    .get(`/channels`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.existingChannels = response.data;
                            this.articleChannel = this.existingChannels[0].id;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the channels. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });

            },

            //Get the article elements for ordering
            initializeArticleElements(id)
            {
                Api.http
                    .get(`/articles/${id}/elements`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.articleElements = response.data;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the elements. Please retry again', {
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
            },

            //Initialize lead editor
            initializeLeadEditor(vm)
            {
                let leadSection = $($('.wysihtmlLead')).get(0);

                let leadEditor = new wysihtml5.Editor($(leadSection).find('#leadEditor').get(0), {
                    toolbar:      $(leadSection).find('#lead-toolbar').get(0),
                    parserRules:  wysihtml5ParserRules,
                }).on("change", function () {
                    vm.article.lead = this.getValue();
                });

                this.leadEditor = leadEditor;
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

            //Trigger the image selection modal
            showImageSelectionModal(type, key)
            {
                if(key !== null)
                {
                    this.selectectedSlider = key;
                }

                this.type = type;

                $('#imageSelectionModal').modal('show');
            },

            //Get the image once we have obtained the selected id
            getMainImage(id) {
                Api.http
                    .get(`/images/${id}`)
                    .then(response =>
                    {
                        if(response.status === 200)
                        {
                            if(this.type === 1)
                            {
                                this.articleMainImage = response.data;
                            }
                            else if(this.type === 2)
                            {
                                this.articleImages.push(response.data);
                            }
                            else if(this.type === 3)
                            {
                                let sliderImage = response.data;
                                sliderImage.pivot = {
                                    order: '',
                                    slider_id: null
                                };
                                this.articleSliders[this.selectectedSlider].images.push(sliderImage);
                            }
                            else if(this.type === 4)
                            {
                                this.articleTeaserImage = response.data;
                            }
                            else {

                            }
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
            submitArticleImage(articleId)
            {
                if (this.articleMainImage.id)
                {
                    this.linkMainImageToArticle(articleId);
                }
                else
                {
                    Api.http
                        .post(`/images`, {
                            image: this.articleMainImage.url,
                            name: this.article.title,
                            source: this.article.title,
                            lead: this.article.title
                        })
                        .then(response => {

                            if(response.status === 201)
                            {
                                this.articleMainImage = response.data;
                                this.linkMainImageToArticle(articleId);
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

            /**
             * TEASER IMAGE
             */
            //Receive the teaser image from the upload button
            teaserArticleImageChange() {
                let fileInput = document.getElementById('article_teaser_image');
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
                    vm.articleTeaserImage.url = e.target.result;
                    vm.articleTeaserImage.id = null;
                };

                reader.readAsDataURL(file);
            },

            //Submit article teaser image
            submitArticleTeaserImage(articleId)
            {
                if(this.articleTeaserImage.url)
                {
                    if (this.articleTeaserImage.id)
                    {
                        this.linkTeaserImageToArticle(articleId);
                    }
                    else
                    {
                        Api.http
                            .post(`/images`, {
                                image: this.articleTeaserImage.url,
                                name: this.article.title,
                                source: this.article.title,
                                lead: this.article.title
                            })
                            .then(response => {

                                if(response.status === 201)
                                {
                                    this.articleTeaserImage = response.data;
                                    this.linkTeaserImageToArticle(articleId);
                                }
                                else
                                {
                                    Vue.toast('Error in uploading the selected Image. Please retry again', {
                                        className: ['nau_toast', 'nau_warning'],
                                    });
                                }
                            });
                    }
                }
            },

            //Link the teaser image to an article
            linkTeaserImageToArticle(articleId)
            {
                Api.http
                    .put(`/articles/${articleId}/teaser/${this.articleTeaserImage.id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            Vue.toast('Article teaser image added successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in updating the article teaser image. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            /**
             * SUBMIT OF ARTICLE DETAILS
             */
            //Check the value of title and update internal title
            updateInternalDetails()
            {
                if(this.article.internal_title === '')
                {
                    this.article.internal_title = this.article.title;
                }

                if(this.article.internal_dateline === '')
                {
                    this.article.internal_dateline = this.article.dateline;
                }
            },

            //Validate the article submission process
            validateSubmit()
            {
                let errorString = "";
                let errorArray = [];
                this.article.lead = this.leadEditor.getValue();

                if(! this.article.dateline)
                {
                    errorArray.push('dateline');
                }

                if(! this.article.title)
                {
                    errorArray.push('title');
                }

                if(! this.articleMainImage.url)
                {
                    errorArray.push('main article image');
                }

                if(this.article.lead === '')
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

            //Handle the submission of the article
            handleSubmit()
            {
                let errorString = this.validateSubmit();

                if(errorString !== "")
                {
                    Vue.toast('Please provide the ' + errorString + ' for the article in order to save', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
                else
                {
                    if(this.article.internal_title === '')
                    {
                        this.article.internal_title = this.article.title;
                    }

                    if(this.article.internal_dateline === '')
                    {
                        this.article.internal_dateline = this.article.dateline;
                    }

                    if(this.article.seo_title === '')
                    {
                        this.article.seo_title = this.article.title;
                    }

                    this.submitArticleDetails();

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
                            this.article = response.data;
                            this.submitArticleImage(this.article.id);
                            this.submitArticleTeaserImage(this.article.id);
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
                            this.article = response.data;
                            if(! (response.data.image && response.data.image.id === this.articleMainImage.id))
                            {
                                this.submitArticleImage(this.article.id);
                            }
                            if(! (response.data.teaser_id === this.articleTeaserImage.id) && this.articleTeaserImage.url)
                            {
                                this.submitArticleTeaserImage(this.article.id);
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
            linkMainImageToArticle(articleId)
            {
                Api.http
                    .put(`/articles/${articleId}/preview/${this.articleMainImage.id}`)
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
            /**
             * IMAGES
             */
            //Handle when images are uploaded
            articleImagesChange: function () {
                var fileElement = document.getElementById('article_images');
                if (!fileElement) return;
                for (var i = 0; i < fileElement.files.length; i++) {
                    var reader = new FileReader();
                    reader.readAsDataURL(fileElement.files[i]);
                    reader.onload = (e) => {
                        this.articleImages.push({ url: e.target.result, lead: '', id: null });
                    };
                }
            },

            //Upload article images and link them to article
            uploadArticleImages(articleId)
            {
                let vm = this;

                this.articleImages.forEach(function (value, key)
                {
                    if(! value.id)
                    {
                        Api.http
                            .post(`/images`, {
                                image: value.url,
                                name: vm.article.title,
                                source: vm.article.title,
                                lead: (value.lead !== '') ? value.lead : vm.article.title,
                            })
                            .then(response => {
                                if(response.status === 201)
                                {
                                    vm.articleImages[key] = response.data;
                                    vm.linkImageToArticle(key, articleId);
                                }
                                else
                                {
                                    Vue.toast('Error in uploading the selected Image. Please retry again', {
                                        className: ['nau_toast', 'nau_warning'],
                                    });
                                }
                            });
                    }
                    else
                    {
                        if(! (value.pivot && value.pivot.article_id === articleId))
                        {
                            vm.linkImageToArticle(key, articleId);
                        }
                    }
                });
            },

            //Link an image to an article
            linkImageToArticle(key, articleId)
            {
                Api.http
                    .put(`/articles/${articleId}/images/${this.articleImages[key].id}`)
                    .then(response => {
                        if (response.status === 204)
                        {
                            this.articleImages[key].pivot = {
                                article_id: articleId,
                                element_id: this.articleImages[key].id
                            };
                        }
                        else
                        {
                            Vue.toast('Error in linking the image. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Confirm the delete of an image
            confirmArticleImageDelete(key)
            {
                swal({
                    title: 'Are you sure?',
                    text: "The entry can not be restored!",
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Abort',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete!'
                }).then(() => {
                    this.deleteArticleImage(key)
                }).catch(swal.noop);
            },

            //Delete an image from an article
            deleteArticleImage(key)
            {
                let vm = this;

                if(vm.articleImages[key].pivot)
                {
                    Api.http
                        .delete(`/articles/${vm.article.id}/images/${vm.articleImages[key].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                vm.articleImages.splice(key, 1);
                                Vue.toast('Article image detached successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                        });
                }
                else
                {
                    vm.articleImages.splice(key, 1);
                }
            },

            /**
             * SLIDERS
             */
            //Add an article slider
            addArticleSlider()
            {
                this.articleSliders.push({name: '', id: null, images: []});
            },

            //Confirm the delete of a slider
            confirmSliderDelete(key)
            {
                swal({
                    title: 'Are you sure?',
                    text: "The entry can not be restored!",
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Abort',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete!'
                }).then(() => {
                    this.deleteArticleSlider(key)
                }).catch(swal.noop);
            },

            //Remove article slider
            deleteArticleSlider(key)
            {
                let vm = this;

                if(vm.articleSliders[key].id)
                {
                    Api.http
                        .delete(`/articles/${vm.article.id}/sliders/${vm.articleSliders[key].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                vm.articleSliders.splice(key, 1);
                                Vue.toast('Article slider detached successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                        });
                }
                else
                {
                    vm.articleSliders.splice(key, 1);
                }
            },

            //Create or Update a slider
            uploadArticleSliders(articleId)
            {
                let vm = this;

                this.articleSliders.forEach(function (value, key)
                {
                    if(value.id && value.pivot && value.pivot.article_id === articleId)
                    {
                        vm.updateSliderDetails(value, key);
                    }
                    else
                    {
                        vm.createSliderDetails(value, key, articleId)
                    }
                })
            },

            //Create a slider details
            createSliderDetails(slider, key, articleId)
            {
                let vm = this;
                Api.http
                    .post(`/articles/${articleId}/sliders`, {
                        name: slider.name
                    })
                    .then(response => {
                        if(response.status === 201)
                        {
                            let images = vm.articleSliders[key].images;
                            vm.articleSliders[key] = response.data;
                            vm.articleSliders[key]['images'] = images;
                            vm.linkImagesToSlider(key);
                            Vue.toast('Article slider added successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in creating the slider. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Update a slider details
            updateSliderDetails(slider, key)
            {
                let vm = this;
                Api.http
                    .put(`/articles/${this.article.id}/sliders/${slider.id}`, {
                        name: slider.name
                    })
                    .then(response => {
                        if(response.status === 200)
                        {
                            let images = vm.articleSliders[key].images;
                            vm.articleSliders[key] = response.data;
                            vm.articleSliders[key]['images'] = images;
                            vm.linkImagesToSlider(key);
                            Vue.toast('Article slider updated successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in updating the slider. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Link images to the slider
            linkImagesToSlider(sliderKey)
            {
                let vm = this;

                this.articleSliders[sliderKey].images.forEach(function (value, key)
                {
                    if(! (value.pivot.slider_id === vm.articleSliders[sliderKey].id))
                    {
                        let order = (value.pivot.order === '') ? 0 : value.pivot.order;

                        Api.http
                            .put(`/sliders/${vm.articleSliders[sliderKey].id}/images/${value.id}`, {
                                'order' : order
                            })
                            .then(response => {
                                if (response.status === 204)
                                {
                                    vm.articleSliders[sliderKey].images[key].pivot.slider_id = vm.articleSliders[sliderKey].id;
                                }
                                else
                                {
                                    Vue.toast('Error in linking the image. Please retry again', {
                                        className: ['nau_toast', 'nau_warning'],
                                    });
                                }
                            });
                    }
                });
            },

            //Confirm the delete of a slider image
            confirmSliderImageDelete(key, imageKey)
            {
                swal({
                    title: 'Are you sure?',
                    text: "The entry can not be restored!",
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Abort',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete!'
                }).then(() => {
                    this.deleteSliderImage(key, imageKey)
                }).catch(swal.noop);
            },

            //Delete an image from a slider
            deleteSliderImage(key, imageKey)
            {
                let vm = this;

                if(! (vm.articleSliders[key].id) || ! (vm.articleSliders[key].images[imageKey].pivot.slider_id))
                {
                    vm.articleSliders[key].images.splice(imageKey, 1);
                }
                else
                {
                    Api.http
                        .delete(`/sliders/${vm.articleSliders[key].id}/images/${vm.articleSliders[key].images[imageKey].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                vm.articleSliders[key].images.splice(imageKey, 1);
                                Vue.toast('Article slider image detached successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                        });
                }
            },

            /**
             * VIDEOS
             */
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

            //Get a video after a selection via the modal
            getVideo(id)
            {
                Api.http
                    .get(`/videos/${id}`)
                    .then(response =>
                    {
                        if(response.status === 200)
                        {
                            this.articleVideos.push(response.data);
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the selected video. Please retry again', {
                                className : ['nau_toast','nau_warning'],
                            });
                        }
                    });
            },

            //Upload article videos and link them to article
            uploadArticleVideos(articleId)
            {
                let vm = this;

                this.articleVideos.forEach(function (video, key)
                {
                    if(! video.id)
                    {
                        vm.submitVideoDetails(video, key, articleId);
                    }
                    else
                    {
                        if(! (video.pivot && video.pivot.article_id === articleId))
                        {
                            vm.linkVideoToArticle(video.id, key, articleId);
                        }
                    }

                });
            },

            //Submit the video details
            submitVideoDetails(video, key, articleId)
            {
                let vm = this;

                Api.http
                    .post(`/videos`, {
                        name: this.article.title,
                        lead: (video.lead !== '') ? video.lead : vm.article.title,
                        source: vm.article.title,
                        user_id: Api.user().id
                    })
                    .then(response => {
                        if(response.status === 201)
                        {
                            vm.startVideoUpload(response, video, key, articleId);
                        }
                        else
                        {
                            Vue.toast('Error in uploading the selected video. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Start the video upload
            startVideoUpload(data, video, key, articleId)
            {
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
                            this.completeVideoUpload(response, video, key, articleId);
                        }
                        else
                        {
                            Vue.toast('Error in uploading the selected video. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Complete the video upload
            completeVideoUpload(data, video, key, articleId)
            {
                let uploadUrl = data.data.complete_url;
                let urlArray = uploadUrl.split("api-naut.livesystems.ch");
                let tokenString = urlArray[urlArray.length - 1];

                Api.http
                    .post(tokenString)
                    .then(response => {
                        if (response.status === 200)
                        {
                            video.video = response.data;
                            video.lead = response.data.lead;
                            video.id = response.data.id;
                            this.linkVideoToArticle(video.id, key, articleId);
                        }
                        else {
                            Vue.toast('Error in uploading the selected video. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Link the video to the article
            linkVideoToArticle(id, key, articleId)
            {
                Api.http
                    .put(`/articles/${articleId}/videos/${id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            this.articleVideos[key].pivot = {
                                article_id: articleId,
                                element_id: id
                            };
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

            //Confirm the delete of a video
            confirmVideoDelete(key)
            {
                swal({
                    title: 'Are you sure?',
                    text: "The entry can not be restored!",
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Abort',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete!'
                }).then(() => {
                    this.deleteArticleVideo(key)
                }).catch(swal.noop);
            },

            //Delete a video from an article
            deleteArticleVideo(key)
            {
                let vm = this;

                if(vm.articleVideos[key].pivot)
                {
                    Api.http
                        .delete(`/articles/${vm.article.id}/videos/${vm.articleVideos[key].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                vm.articleVideos.splice(key, 1);
                                Vue.toast('Article video detached successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                        });
                }
                else
                {
                    vm.articleVideos.splice(key, 1);
                }
            },

            /**
             * CHANNELS
             */
            linkChannelToArticle(articleId)
            {
                Api.http
                    .put(`/articles/${articleId}/channels/${this.articleChannel}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            Vue.toast('Article channel linked successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in linking the article channel. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            /**
             *  PUBLICATION DATE
             */
            changeDate(date)
            {
                this.article.published_at = date;
            },

            /**
             * ARTICLE INFORMANTS
             */
            //Search for an informant
            searchInformants(query)
            {
                this.searchedInformant.query = query;

                if(this.searchedInformant.promise)
                {
                    this.searchedInformant.promise = false;

                    setTimeout(() => {
                        Api.http
                            .get(`/users?search=${this.searchedInformant.query}`)
                            .then(response => {
                                this.existingInformants = response.data;
                                this.searchedInformant.promise = true;
                            });
                    }, 400);
                }
            },

            //Link informant to article
            linkInformantToArticle(articleId)
            {
                let vm = this;

                this.articleInformants.forEach(function (value, key)
                {
                    if(! (value.pivot && value.pivot.article_id === articleId))
                    {
                        Api.http
                            .put(`/articles/${articleId}/informants/${value.id}`)
                            .then(response => {
                                if(response.status === 204)
                                {
                                    vm.articleInformants[key].pivot = {
                                        article_id : articleId,
                                        informant_id : vm.articleInformants[key].id
                                    };
                                    Vue.toast('Article informant linked successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                                else
                                {
                                    Vue.toast('Error in linking the article informant. Please retry again', {
                                        className: ['nau_toast', 'nau_warning'],
                                    });
                                }
                            });
                    }
                });
            },

            //Delete any informants
            deleteInformants(informant)
            {
                let vm = this;

                vm.articleInformants.forEach(function (value, key)
                {
                    if(value.id === informant.id && value.pivot)
                    {
                        Api.http
                            .delete(`/articles/${vm.article.id}/informants/${vm.articleInformants[key].id}`)
                            .then(response => {
                                if(response.status === 204)
                                {
                                    Vue.toast('Article informant deleted successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                            });
                    }
                });
            },

            /**
             *  ARTICLE AUTHORS
             */
            //Search for an author
            searchAuthors(query)
            {
                this.searchedAuthor.query = query;

                if(this.searchedAuthor.promise)
                {
                    this.searchedAuthor.promise = false;

                    setTimeout(() => {
                        Api.http
                            .get(`/authors?search=${this.searchedAuthor.query}`)
                            .then(response => {
                                this.existingAuthors = response.data;
                                this.searchedAuthor.promise = true;
                            });
                    }, 400);
                }
            },

            //Save the settings for the article
            saveSettings(articleId)
            {
                this.saveArticleAuthorsAndIdeas(articleId);
                this.updateArticle(articleId);
            },

            //Save authors and ideas
            saveArticleAuthorsAndIdeas(articleId)
            {
                this.linkAuthorToArticle(articleId);
                this.linkInformantToArticle(articleId);
                this.linkChannelToArticle(articleId);
            },

            //Link author to article
            linkAuthorToArticle(articleId)
            {
                let vm = this;

                this.articleAuthors.forEach(function (value, key)
                {
                    if(! (value.pivot && value.pivot.article_id === articleId))
                    {
                        Api.http
                            .put(`/articles/${articleId}/authors/${value.id}`)
                            .then(response => {
                                if(response.status === 204)
                                {
                                    vm.articleAuthors[key].pivot = {
                                        article_id : articleId,
                                        author_id : vm.articleAuthors[key].id
                                    };
                                    Vue.toast('Article author linked successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                                else
                                {
                                    Vue.toast('Error in linking the article author. Please retry again', {
                                        className: ['nau_toast', 'nau_warning'],
                                    });
                                }
                            });
                    }
                });
            },

            //Delete any authors
            deleteAuthors(author)
            {
                let vm = this;

                vm.articleAuthors.forEach(function (value, key)
                {
                    if(value.id === author.id && value.pivot)
                    {
                        Api.http
                            .delete(`/articles/${vm.article.id}/authors/${vm.articleAuthors[key].id}`)
                            .then(response => {
                                if(response.status === 204)
                                {
                                    Vue.toast('Article author deleted successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                            });
                    }
                });
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

            this.initializeChannels();
        },

        created()
        {
            if(this.$route.params.hasOwnProperty('id'))
            {
                this.article.id = parseInt(this.$route.params.id);
            }
        },

        beforeDestroy: function ()
        {
            this.leadEditor.destroy();
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

    #article_teaser_image {
        display: inline-flex;
    }

    .media_overflow {
        overflow: scroll;
    }

    .media_images {
        margin-top: 10px;
        display: inline-flex;
    }

    .sliders {
        width: 100%;
        margin-bottom: 10px;
        display: block
    }

    .slider_section {
        width: 100%;
        border: 1px solid #E3E3E3;
        border-radius: 3px;
        padding: 10px;
        margin-bottom: 10px;
        max-height: 400px;
    }
    .media_image {
        padding: 10px;
        margin-left: 15px;
        width: 320px;
        height: 320px;
        border: 1px solid #E3E3E3;
        border-radius: 3px;
        background: #e3e3e3;
        margin-bottom: 10px;
    }

    .selection_sections {
        display: inline-flex;
    }

    .slider_images_section {
        display: inline-flex;
    }

    .slider_image {
        padding: 10px;
        width: 320px;
        height: 280px;
        border: 1px solid #E3E3E3;
        border-radius: 3px;
        background: #e3e3e3;
        margin-bottom: 10px;
    }

    .media_image img, .media_image video {
        max-width: 100%;
        max-height: 180px;
        margin-bottom: 10px;
    }

    .slider_image img {
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
        margin-top: 5px;
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

    .margin_top_5 {
        margin-top: 5px;
    }

    #articleTags, #articleSettings {
        min-height: 600px;
    }

    .elementImageSection {

    }

    .elementImageSection img, .elementImageSection video {
        max-width: 100%;
        height: 300px;
    }

    .sliderSection {
        width: 480px;
        height: 300px;
    }

    .sliderSection img {
        height: 300px !important;
    }

    .sectionDiv {
        padding: 10px;
        border: 2px dotted #E3E3E3;
    }

    .margin_left_5
    {
        margin-left: 5px;
    }

    .disabledTab
    {
        cursor:not-allowed !important;
        background: rgba(171, 169, 169, 0.16);
    }

    .disabledTab > a
    {
        pointer-events: none !important;
        cursor:not-allowed !important;
    }

    .surveys_section table{
        width: 100%;
    }
</style>
