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
                    <li>
                        <a href="#articleTags" data-toggle="tab">Tags</a>
                    </li>
                    <li>
                        <a href="#articleAuthors" data-toggle="tab">Authors</a>
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
                                <button type="button" class="btn btn-primary image_selection_btn" @click="showImageSelectionModal(1,null)">
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
                                                        @click="deleteArticleImage(index)">
                                                    <i class="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input type="file" class="btn btn-primary" name="article_images" id="article_images" @change="articleImagesChange" multiple/>
                            </div>
                            <button class="btn btn-primary" type="button" :disabled="articleImages.length == 0 || disableArticleImagesSubmit" @click="uploadArticleImages()">Save images</button>
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
                                                    <button
                                                            class="btn btn-danger btn-sm remove_btn"
                                                            type="button"
                                                            @click="deleteSliderImage(sliderIndex, index)">
                                                        <i class="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-actions">
                                        <button type="button" class="btn btn-primary image_selection_btn" @click="showImageSelectionModal(2, sliderIndex)">
                                            Select Uploaded Image
                                        </button>
                                        <button type="button" class="btn btn-danger image_selection_btn" @click="deleteArticleSlider(sliderIndex)">
                                            Remove slider
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary" @click="addArticleSlider()">Add Slider
                            </button>
                            <button class="btn btn-primary" type="button"
                                    :disabled="articleSliders.length == 0 || article.id == null"
                                    @click="uploadArticleSliders()">Save sliders
                            </button>
                        </div>

                        <!--Vidoes-->
                        <div class="form-body">
                            <div class="form-group">
                                <h4>Videos</h4>
                                <div  class="row media_images">
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
                                                    @click="deleteArticleVideo(index)">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <input type="file" class="btn btn-primary" name="article_videos" id="article_videos" @change="articleVideosChange" multiple/>

                            </div>
                            <button class="btn btn-primary" type="button" :disabled="articleVideos.length == 0 || disableArticleVideosSubmit" @click="uploadArticleVideos()">Save videos</button>
                        </div>
                    </div>

                    <!--Social Media-->
                    <div class="tab-pane" id="articleSocialMedia">
                        <div class="form-body">
                            <label><b>Social Media</b></label>
                            <div v-for="(articleSocialMedia, index) in articleSocialMedias" class="form-group">
                                <div class="form-group">
                                    <input
                                            type="text"
                                            maxlength="100"
                                            v-model.trim="articleSocialMedia.url"
                                            placeholder="URL to post"
                                            class="form-control article_input">
                                    <button
                                            @click="deleteArticleSocialMedia(index)"
                                            class="btn btn-danger btn-sm delete_btn"
                                            type="button"> x
                                    </button>
                                </div>
                                <div class="form-group"></div>
                                <div class="form-actions">
                                    <button
                                            class="btn btn-primary remove_btn"
                                            type="button"
                                            @click="previewArticleSocialMedia(index)">
                                        Preview
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="form-actions item_add">
                            <button
                                    @click="addArticleSocialMedia()"
                                    class="btn btn-primary item_add_btn"
                                    type="button"> +
                            </button>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="button"
                                    @click="saveArticleSocialMedias()"
                                    :disabled="article.id == null">
                                Save <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
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

                    <!--Tags and Related Stories-->
                    <div class="tab-pane" id="articleTags">
                        <div class="form-body">

                            <div class="form-group">
                                <label>Tags</label>
                                <multiselect
                                        id="tagsMultiSelect"
                                        v-model="articleTags"
                                        :options="existingTags"
                                        tag-placeholder="Add this as new tag"
                                        placeholder="Type to search or add tag"
                                        label="tag"
                                        :max-height="500"
                                        :options-limit="100"
                                        :clear-on-select="true"
                                        :close-on-select="true"
                                        track-by="id"
                                        :multiple="true"
                                        :taggable="true"
                                        open-direction="bottom"
                                        :internal-search="false"
                                        @tag="addArticleTag"
                                        @search-change="searchTags"
                                        @remove="deleteTags">
                                </multiselect>
                            </div>

                            <div class="form-group">
                                <label>Related Stories</label>
                                <multiselect
                                        id="relatedStoriesMultiSelect"
                                        v-model="articleRelatedStories"
                                        :options="existingRelatedStories"
                                        placeholder="Type to search related story"
                                        label="title"
                                        :max-height="500"
                                        :options-limit="100"
                                        :clear-on-select="true"
                                        :close-on-select="true"
                                        track-by="id"
                                        :multiple="true"
                                        open-direction="bottom"
                                        :internal-search="false"
                                        @search-change="searchRelatedStories"
                                        @remove="deleteRelatedArticles">
                                </multiselect>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="button"
                                    @click="saveArticleTagsAndRelatedStories()"
                                    :disabled="articleTags.length < 6 || article.id == null">
                                Save <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
                    </div>

                    <!--Authors and Ideas-->
                    <div class="tab-pane" id="articleAuthors">
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
                                        :clear-on-select="true"
                                        :close-on-select="true"
                                        track-by="id"
                                        :multiple="true"
                                        open-direction="bottom"
                                        :internal-search="false"
                                        @search-change="searchAuthors"
                                        @remove="deleteAuthors">
                                </multiselect>
                            </div>

                            <div class="form-group">
                                <label>Ideas</label>
                                <multiselect
                                        id="ideasMultiSelect"
                                        v-model="articleIdeas"
                                        :options="existingIdeas"
                                        placeholder="Type to search idea"
                                        label="title"
                                        :max-height="500"
                                        :options-limit="100"
                                        :clear-on-select="true"
                                        :close-on-select="true"
                                        track-by="id"
                                        :multiple="true"
                                        open-direction="bottom"
                                        :internal-search="false">
                                </multiselect>
                            </div>
                            <div class="form-group">
                                <label>Publication Datetime</label>
                                <date-time
                                        @changeDate="changeDate"
                                        :date="article.published_at"/>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="button"
                                    @click="saveArticleAuthorsAndIdeas()"
                                    :disabled="articleAuthors.length < 1 || article.id == null">
                                Save <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
    import api from 'dashboard/utils/api';
    import Multiselect from 'vue-multiselect';
    import DateTime from 'dashboard/components/DateTime';


    export default {
        data: () => {
            return {
                article: {
                    dateline: 'External Dateline',
                    title: 'External Title',
                    internal_dateline: 'Internal Dateline',
                    internal_title: 'Internal Title',
                    lead: 'Lead',
                    id: null,
                    published_at: null
                },
                type: 1,
                leadEditor: null,
                submitting_main: false,
                articleMainImage: {
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
                articleSocialMedias: [
                    {
                        url: 'https://twitter.com/HELBpage/status/889378370814869504',
                        id: null
                    }
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
                articleTags: [
                ],
                existingTags: [
                ],
                searchedTag: {
                    query: '',
                    promise: true
                },
                articleRelatedStories: [
                ],
                existingRelatedStories: [
                ],
                searchedRelatedStory: {
                    query: '',
                    promise: true
                },
                articleAuthors: [
                ],
                existingAuthors: [
                ],
                searchedAuthor: {
                    query: '',
                    promise: true
                },
                articleIdeas: [
                ],
                existingIdeas: [
                ],
                searchedIdea: {
                    query: '',
                    promise: true
                },
                saveArticleImagesDisabled: true
            };
        },

        components: {
            Multiselect,
            DateTime
        },

        computed: {
            //Get the selected image id from the modal
            selectedImageId()
            {
                return Api.getImage();
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

            //Disable the learnings submit button
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
             *  PUBLICATION DATE
             */
            changeDate(date)
            {
                this.article.published_at = date;
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

            //Save authors and ideas
            saveArticleAuthorsAndIdeas()
            {
                this.linkAuthorToArticle();
                this.updateArticle();
            },

            //Link author to article
            linkAuthorToArticle()
            {
                let vm = this;

                this.articleAuthors.forEach(function (value, key)
                {
                    if(! value.pivot)
                    {
                        Api.http
                            .put(`/articles/${vm.article.id}/authors/${value.id}`)
                            .then(response => {
                                if(response.status === 204)
                                {
                                    vm.articleAuthors[key].pivot = {
                                        article_id : vm.article.id,
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

            /**
             * ARTICLE TAGS
             */
            //Add a new tag to an article
            addArticleTag(newTag)
            {
                const tag = {
                    tag: newTag,
                    id: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000)),
                    created_at: null
                };
                this.existingTags.push(tag);
                this.articleTags.push(tag);
            },

            //Call the server to search for tags
            searchTags(query)
            {
                this.searchedTag.query = query;

                if(this.searchedTag.promise)
                {
                    this.searchedTag.promise = false;

                    setTimeout(() => {
                        Api.http
                            .get(`/tags?search=${this.searchedTag.query}`)
                            .then(response => {
                                this.existingTags = response.data;
                                this.searchedTag.promise = true;
                            });
                    }, 400);
                }
            },

            //Save Article tags and related stories
            saveArticleTagsAndRelatedStories()
            {
                this.saveArticleTags();
                this.linkRelatedStoriesToArticle();
            },

            //Save the article tags
            saveArticleTags()
            {
                let vm = this;

                this.articleTags.forEach(function (value, key)
                {
                    if(value.created_at)
                    {
                        Api.http
                            .put(`/tags/${value.id}`, {
                                tag: value.tag,
                            })
                            .then(response => {
                                if(response.status === 200)
                                {
                                    let pivot = null;

                                    if(vm.articleTags[key].pivot)
                                    {
                                        pivot = vm.articleTags[key].pivot
                                    }
                                    vm.articleTags[key] = response.data;
                                    vm.articleTags[key].pivot = pivot;
                                    vm.linkTagToArticle(key);
                                    Vue.toast('Article tags updated successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                            });
                    }
                    else
                    {
                        Api.http
                            .post(`/tags`, {
                                tag: value.tag,
                            })
                            .then(response => {
                                if(response.status === 201)
                                {
                                    let pivot = null;
                                    console.log(vm.articleTags[key].pivot, vm.articleTags[key], "Created");

                                    if(vm.articleTags[key].pivot)
                                    {
                                        pivot = vm.articleTags[key].pivot
                                    }
                                    vm.articleTags[key] = response.data;
                                    vm.articleTags[key].pivot = pivot;
                                    vm.linkTagToArticle(key);
                                    Vue.toast('Article tags created successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                            });
                    }
                });
            },

            //Link a tag to an article
            linkTagToArticle(key)
            {
                if(! this.articleTags[key].pivot)
                {
                    Api.http
                        .put(`/articles/${this.article.id}/tags/${this.articleTags[key].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                this.articleTags[key].pivot = {
                                    article_id : this.article.id,
                                    tag_id : this.articleTags[key].id
                                };
                                Vue.toast('Article tag item linked successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                            else
                            {
                                Vue.toast('Error in linking the article tag item. Please retry again', {
                                    className: ['nau_toast', 'nau_warning'],
                                });
                            }
                        });
                }
            },

            //Delete a tag
            deleteTags(tag)
            {
                let vm = this;

                vm.articleTags.forEach(function (value, key)
                {
                    if(value.id === tag.id && value.created_at)
                    {

                        Api.http
                            .delete(`/articles/${vm.article.id}/tags/${vm.articleTags[key].id}`)
                            .then(response => {
                                if(response.status === 204)
                                {
                                    Vue.toast('Article tags deleted successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                            });
                    }
                });
            },

            /**
             * ARTICLE RELATED STORIES
             */
            //Search for a related story
            searchRelatedStories(query)
            {
                this.searchedRelatedStory.query = query;

                if(this.searchedRelatedStory.promise)
                {
                    this.searchedRelatedStory.promise = false;

                    setTimeout(() => {
                        Api.http
                            .get(`/articles?search=${this.searchedRelatedStory.query}`)
                            .then(response => {
                                this.existingRelatedStories = response.data;
                                this.searchedRelatedStory.promise = true;
                            });
                    }, 400);
                }
            },

            //Link related story to article
            linkRelatedStoriesToArticle()
            {
                let vm = this;

                this.articleRelatedStories.forEach(function (value, key)
                {
                    if(! value.pivot)
                    {
                        Api.http
                            .put(`/articles/${vm.article.id}/related/${value.id}`)
                            .then(response => {
                                if(response.status === 204)
                                {
                                    vm.articleRelatedStories[key].pivot = {
                                        article_id : vm.article.id,
                                        related_id : vm.articleTags[key].id
                                    };
                                    Vue.toast('Article related story linked successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                                else
                                {
                                    Vue.toast('Error in linking the article related story item. Please retry again', {
                                        className: ['nau_toast', 'nau_warning'],
                                    });
                                }
                            });
                    }
                });
            },

            //Delete any related articles
            deleteRelatedArticles(article)
            {
                let vm = this;

                vm.articleRelatedStories.forEach(function (value, key)
                {
                    if(value.id === article.id && value.created_at)
                    {
                        Api.http
                            .delete(`/articles/${vm.article.id}/related/${vm.articleRelatedStories[key].id}`)
                            .then(response => {
                                if(response.status === 204)
                                {
                                    Vue.toast('Article related story deleted successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                            });
                    }
                });
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
                            this.fillArticleData(response.data);
                            this.initializeLeadEditor(this);
                            this.initializeArticleImages(id);
                            this.initializeArticleSliders(id);
                            this.initializeArticleVideos(id);
                            this.initializeArticleBodies(id);
                            this.initializeArticleLearnings(id);
                            this.initializeArticleInfoBoxes(id);
                            this.initializeArticleTags(id);
                            this.initializeArticleRelatedStories(id);
                            this.initializeArticleAuthors(id);
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

            //Get the tags for the article
            initializeArticleTags(id)
            {
                Api.http
                    .get(`/articles/${id}/tags`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.articleTags = response.data;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the tags. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Get the related stories for the article
            initializeArticleRelatedStories(id)
            {
                Api.http
                    .get(`/articles/${id}/related`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.articleRelatedStories = response.data;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the related stories. Please retry again', {
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

                this.leadEditor = leadEditor;
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
                            else
                            {
                                this.articleSliders[this.selectectedSlider].images.push(response.data);
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
            uploadArticleImages()
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
                                    vm.linkImageToArticle(response.data.id);
                                }
                                else
                                {
                                    Vue.toast('Error in uploading the selected Image. Please retry again', {
                                        className: ['nau_toast', 'nau_warning'],
                                    });
                                }
                            });
                    }
                });
            },

            //Link an image to an article
            linkImageToArticle(id)
            {
                Api.http
                    .put(`/articles/${this.article.id}/images/${id}`)
                    .then(response => {
                        if (response.status !== 204)
                        {
                            Vue.toast('Error in linking the image. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Delete an image from an article
            deleteArticleImage(key)
            {
                let vm = this;

                if(vm.articleImages[key].id)
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
            uploadArticleSliders()
            {
                let vm = this;

                this.articleSliders.forEach(function (value, key)
                {
                    if(value.id)
                    {
                        vm.updateSliderDetails(value, key);
                    }
                    else
                    {
                        vm.createSliderDetails(value, key)
                    }
                })
            },

            //Create a slider details
            createSliderDetails(slider, key)
            {
                let vm = this;
                Api.http
                    .post(`/articles/${this.article.id}/sliders`, {
                        name: slider.name
                    })
                    .then(response => {
                        if(response.status === 201)
                        {
                            let images = vm.articleSliders[key].images;
                            vm.articleSliders[key] = response.data;
                            vm.articleSliders[key]['images'] = images;
                            vm.linkImagesToSlider(vm.articleSliders[key]);
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
                            vm.linkImagesToSlider(vm.articleSliders[key]);
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
            linkImagesToSlider(slider)
            {
                let vm = this;

                slider.images.forEach(function (value, key)
                {
                    if(! value.pivot)
                    {
                        Api.http
                            .put(`/sliders/${slider.id}/images/${value.id}`)
                            .then(response => {
                                slider.images[key].pivot = {
                                    image_id: value.id,
                                    slider_id: slider.id,
                                    order: 0
                                };
                                if (response.status !== 204)
                                {
                                    Vue.toast('Error in linking the image. Please retry again', {
                                        className: ['nau_toast', 'nau_warning'],
                                    });
                                }
                            });
                    }
                });
            },

            //Delete an image from a slider
            deleteSliderImage(key, imageKey)
            {
                let vm = this;

                if(vm.articleSliders[key].pivot === null)
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
                                Vue.toast('Article slider detached successfully', {
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

            //Upload article videos and link them to article
            uploadArticleVideos()
            {
                let vm = this;

                this.articleVideos.forEach(function (video, key)
                {
                    if(! video.id)
                    {
                        vm.submitVideoDetails(video);
                    }
                });
            },

            //Submit the video details
            submitVideoDetails(video)
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

            //Start the video upload
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

            //Complete the video upload
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

            //Delete a video from an article
            deleteArticleVideo(key)
            {
                let vm = this;

                if(vm.articleVideos[key].id)
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
             * ARTICLE SOCIAL MEDIA
             */
            //Preview a given social media article
            previewArticleSocialMedia(key)
            {
                let url = 'https://publish.twitter.com/oembed?url=' + this.articleSocialMedias[key].url;

                axios
                    .get(url,  {
                        headers: {
                            'Access-Control-Allow-Origin' : 'https://publish.twitter.com',
                            'Access-Control-Request-Method' : 'GET'
                        }
                    })
                    .then(response => {
                        console.log(response);
                    });
            },

            //Add an article social media item
            addArticleSocialMedia()
            {
                this.articleSocialMedias.push({url: '', id: null});
            },

            //Delete a social media article
            deleteArticleSocialMedia(key)
            {
                let vm = this;

                if(vm.articleSocialMedias[key].id)
                {
                    Api.http
                        .delete(`/articles/${vm.article.id}/socialmedia/${vm.articleSocialMedias[key].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                vm.articleLearnings.splice(key, 1);
                                Vue.toast('Article social media item deleted successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                        });
                }
                else
                {
                    vm.articleSocialMedias.splice(key, 1);
                }
            },

            //Save an article social media record
            saveArticleSocialMedias()
            {
                let vm = this;

                this.articleSocialMedias.forEach(function (value, key)
                {
                    if(value.url !== '')
                    {
                        if(value.id)
                        {
                            Api.http
                                .put(`/socialmedia/${value.id}`, {
                                    url: value.url,
                                })
                                .then(response => {
                                    if(response.status === 200)
                                    {
                                        vm.articleSocialMedias[key] = response.data;
                                        Vue.toast('Social media item updated successfully', {
                                            className: ['nau_toast', 'nau_success'],
                                        });
                                    }
                                });
                        }
                        else
                        {
                            Api.http
                                .post(`/socialmedia`, {
                                    url: value.url,
                                })
                                .then(response => {
                                    if(response.status === 201)
                                    {
                                        vm.articleSocialMedias[key] = response.data;
                                        vm.linkSocialMediaToArticle(response.data.id);
                                        Vue.toast('Social media item created successfully', {
                                            className: ['nau_toast', 'nau_success'],
                                        });
                                    }
                                });
                        }
                    }
                });
            },

            //Link a social media item to an article
            linkSocialMediaToArticle(id)
            {
                Api.http
                    .put(`/articles/${this.article.id}/socialmedia/${id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            Vue.toast('Social media item linked successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in linking the social media item. Please retry again', {
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

                if(vm.articleLearnings[key].id)
                {
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
                }
                else
                {
                    vm.articleLearnings.splice(key, 1);
                }
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
        },

        beforeDestroy: function ()
        {
            this.leadEditor.destroy();

            this.articleBodyEditors.forEach(function (value, key)
            {
                value.editor.destroy();
            });

            this.articleInfoBoxEditors.forEach(function (value, key)
            {
                value.editor.destroy();
            });
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
        max-height: 360px;
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

    .slider_images_section {
        display: inline-flex;
    }

    .slider_image {
        padding: 10px;
        width: 320px;
        height: 240px;
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

    #articleTags, #articleAuthors {
        min-height: 600px;
    }
</style>
