<template>
    <div>
        <page-title title="Articles" sub="Create" />
        <div class="row">
            <div class="col-md-6">
            </div>
            <div class="col-md-6 text-right">
                <button
                        class="btn btn-primary pull-right margin_left_5"
                        @click="saveAndExit()"
                        :disabled="disableArticleSave">
                    Save Article and Exit
                </button>
                <button
                        class="btn btn-primary pull-right"
                        @click="handleSubmit()"
                        :disabled="disableArticleSave">
                    Save Article
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
                    <!--<li>-->
                        <!--<a href="#articleInfoBoxes" data-toggle="tab">Info Boxes</a>-->
                    <!--</li>-->
                    <li>
                        <a href="#articleTags" data-toggle="tab">Tags</a>
                    </li>
                    <li>
                        <a href="#articleSurveys" data-toggle="tab">Surveys</a>
                    </li>
                    <li>
                        <a href="#articleSettings" data-toggle="tab">Settings</a>
                    </li>
                    <li @click="refreshSortingDate()">
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
                                    type="submit"
                                    :disabled="disableArticleSave">
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
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="submit"
                                    :disabled="disableArticleSave">
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
                                    type="submit"
                                    :disabled="disableArticleSave">
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
                                        placeholder="Add lead (max 350chars)"
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
                                    :disabled="disableArticleSave">
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
                                <div class="form-actions selection_sections">
                                    <button type="button" class="btn btn-primary image_selection_btn" @click="showImageSelectionModal(2, null)">
                                        Select Uploaded Image
                                    </button>
                                    <!--<input type="file" class="btn btn-primary" name="article_images" id="article_images" @change="articleImagesChange" multiple/>-->
                                </div>
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
                                                    <input class="form-control" type="text" v-model="image.pivot.order" placeholder="Enter order for image"/>
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
                                        <button type="button" class="btn btn-primary image_selection_btn" @click="showImageSelectionModal(3, sliderIndex)">
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
                                                        @click="deleteArticleVideo(index)">
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
                                <div class="form-group">
                                    <twitter-element :url="articleSocialMedia.url"></twitter-element>
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
                    <!--<div class="tab-pane" id="articleInfoBoxes">-->
                        <!--<div class="form-body">-->
                            <!--<label><b>Info Boxes</b></label>-->
                            <!--<div v-for="(articleInfoBox, index) in articleInfoBoxes" class="form-group wysihtmlInfoBox">-->
                                <!--<div id="infoBox-toolbar" style="display: none;" class="wysihtml_toolbar text-right">-->
                                <!--</div>-->
                                <!--<textarea-->
                                        <!--id="infoBoxEditor"-->
                                        <!--v-model.trim="articleInfoBox.content"-->
                                        <!--placeholder="Here is some text input"-->
                                        <!--class="form-control articleEditor"-->
                                        <!--rows="5">-->
                                <!--</textarea>-->
                                <!--<div class="form-actions">-->
                                    <!--<button-->
                                            <!--class="btn btn-danger remove_btn"-->
                                            <!--type="button"-->
                                            <!--@click="deleteArticleInfoBox(index)">-->
                                        <!--Remove InfoBox-->
                                    <!--</button>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="form-actions item_add">-->
                            <!--<button-->
                                    <!--@click="addArticleInfoBox()"-->
                                    <!--class="btn btn-primary item_add_btn"-->
                                    <!--:disabled="articleInfoBoxes.length >= 5"-->
                                    <!--type="button"> +-->
                            <!--</button>-->
                        <!--</div>-->
                        <!--<div class="form-actions">-->
                            <!--<button-->
                                    <!--class="btn btn-primary"-->
                                    <!--type="button"-->
                                    <!--@click="saveArticleInfoBoxes()"-->
                                    <!--:disabled="article.id == null">-->
                                <!--Save info box <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>-->
                            <!--</button>-->
                        <!--</div>-->
                    <!--</div>-->

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
                                        :clear-on-select="false"
                                        :close-on-select="false"
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
                                        :clear-on-select="false"
                                        :close-on-select="false"
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

                    <!--Surveys-->
                    <div class="tab-pane" id="articleSurveys">
                        <!--Images-->
                        <div class="form-body">
                            <div class="form-group">
                                <h4>Surveys</h4>
                                <div class="row">
                                    <div class="col-md-3 media_image" v-for="(survey, index) in articleSurveys">
                                        <p>{{ survey.question }}</p>
                                        <div class="form-group">
                                            <button
                                                    class="btn btn-danger btn-sm remove_btn"
                                                    type="button"
                                                    @click="deleteSurvey(index)">
                                                <i class="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-actions selection_sections">
                                    <button type="button" class="btn btn-primary image_selection_btn" @click="showSurveySelectionModal()">
                                        Select Uploaded Image
                                    </button>
                                    <!--<input type="file" class="btn btn-primary" name="article_images" id="article_images" @change="articleImagesChange" multiple/>-->
                                </div>
                            </div>
                            <button class="btn btn-primary" type="button" :disabled="articleImages.length == 0 || disableArticleImagesSubmit" @click="uploadArticleImages()">Save images</button>
                        </div>

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
                                    @click="saveArticleAuthorsAndIdeas()"
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
                                    <div v-if="articleElement.type == 'slider'" class="sectionDiv">
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
                                    <div v-if="articleElement.type == 'infobox'" class="sectionDiv">
                                        <p v-html="articleElement.content"></p>
                                    </div>
                                    <!--Videos-->
                                    <div v-if="articleElement.type == 'video'" class="elementImageSection sectionDiv">
                                        <video controls>
                                            <source :src="articleElement.urls[0]" type="video/mp4">
                                            <source :src="articleElement.urls[1]" type="video/webm">
                                        </video>
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
            </div>
        </form>
    </div>
</template>
<script>
    import Multiselect from 'vue-multiselect';
    import DateAndTime from 'dashboard/components/DateAndTime';
    import TwitterElement from 'dashboard/components/TwitterTweet';
    import draggable from 'vuedraggable';

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
                articleSocialMedias: [
                    {
                        url: '',
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
                articleSurveys: [
                ]
            };
        },

        components: {
            Multiselect,
            DateAndTime,
            TwitterElement,
            draggable
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
                return ! this.article.dateline || ! this.article.title || ! this.articleMainImage.url || ! this.articleTeaserImage.url;
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
            }
        },

        methods: {
            /**
             * SURVEYS
             */
            showSurveySelectionModal()
            {
            },

            deleteSurvey()
            {
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
                                    this.submitArticleImage();
                                }
                                if(! (response.data.teaser_id === this.articleTeaserImage.id))
                                {
                                    this.submitArticleTeaserImage();
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
                                this.submitArticleImage();
                                this.submitArticleTeaserImage();
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

            //Reload the sorting page data
            refreshSortingDate()
            {
                if(this.article.id)
                {
                    this.initializeArticleElements(this.article.id);
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
                            this.initializeArticleSocialMedias(id);
                            this.initializeArticleBodies(id);
                            this.initializeArticleLearnings(id);
//                            this.initializeArticleInfoBoxes(id);
                            this.initializeArticleTags(id);
                            this.initializeArticleRelatedStories(id);
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

            //Get the data for the social medias linked to the article
            initializeArticleSocialMedias(id)
            {
                Api.http
                    .get(`/articles/${id}/socialmedia`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            if(response.data.length !== 0)
                            {
                                this.articleSocialMedias = response.data;
                            }
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the article social medias. Please retry again', {
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

                            this.articleRelatedStories.forEach(function (value, key)
                            {
                                value.linked = 1;
                            })
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
                this.initializeBodyEditor(this, 0);
//                this.initializeInfoBoxEditor(this, 0);
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
            submitArticleImage()
            {
                if (this.articleMainImage.id)
                {
                    this.linkMainImageToArticle();
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
                                this.linkMainImageToArticle();
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
            submitArticleTeaserImage()
            {
                if (this.articleTeaserImage.id)
                {
                    this.linkTeaserImageToArticle();
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
                                this.linkTeaserImageToArticle();
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

            //Link the teaser image to an article
            linkTeaserImageToArticle()
            {
                Api.http
                    .put(`/articles/${this.article.id}/teaser/${this.articleTeaserImage.id}`)
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

                if(! this.articleTeaserImage.url)
                {
                    errorArray.push('teaser image');
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
                            this.submitArticleImage();
                            this.submitArticleTeaserImage();
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
                                this.submitArticleImage();
                            }
                            if(! (response.data.teaser_id === this.articleTeaserImage.id))
                            {
                                this.submitArticleTeaserImage();
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
                                    vm.linkImageToArticle(key);
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
                        if(! value.pivot)
                        {
                            vm.linkImageToArticle(key);
                        }
                    }
                });
            },

            //Link an image to an article
            linkImageToArticle(key)
            {
                Api.http
                    .put(`/articles/${this.article.id}/images/${this.articleImages[key].id}`)
                    .then(response => {
                        if (response.status === 204)
                        {
                            this.articleImages[key].pivot = {
                                article_id: this.article.id,
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
                    if(! value.pivot.slider_id)
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
            uploadArticleVideos()
            {
                let vm = this;

                this.articleVideos.forEach(function (video, key)
                {
                    if(! video.id)
                    {
                        vm.submitVideoDetails(video, key);
                    }
                    else
                    {
                        if(! video.pivot)
                        {
                            vm.linkVideoToArticle(video.id, key);
                        }
                    }

                });
            },

            //Submit the video details
            submitVideoDetails(video, key)
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
                            vm.startVideoUpload(response, video, key);
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
            startVideoUpload(data, video, key) {

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
            completeVideoUpload(data, video, key)
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
                            this.linkVideoToArticle(video.id, key);
                        }
                        else {
                            Vue.toast('Error in uploading the selected video. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Link the video to the article
            linkVideoToArticle(id, key)
            {
                Api.http
                    .put(`/articles/${this.article.id}/videos/${id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            this.articleVideos[key].pivot = {
                                article_id: this.article.id,
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
             * ARTICLE SOCIAL MEDIA
             */
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
                                vm.articleSocialMedias.splice(key, 1);
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
                    if (value.id) {
                        Api.http
                            .put(`/articles/${vm.article.id}/learnings/${value.id}`, {
                                text: value.text,
                            })
                            .then(response => {
                                if (response.status === 200) {
                                    vm.articleLearnings[key] = response.data;
                                    Vue.toast('Article learnings updated successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                            });
                    }
                    else
                    {
                        if (value.text !== '')
                        {
                            Api.http
                                .post(`/articles/${vm.article.id}/learnings`, {
                                    text: value.text,
                                })
                                .then(response => {
                                    if (response.status === 201) {
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
                    if(! value.linked)
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
             * CHANNELS
             */
            linkChannelToArticle()
            {
                Api.http
                    .put(`/articles/${this.article.id}/channels/${this.articleChannel}`)
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
            linkInformantToArticle()
            {
                let vm = this;

                this.articleInformants.forEach(function (value, key)
                {
                    if(! value.pivot)
                    {
                        Api.http
                            .put(`/articles/${vm.article.id}/informants/${value.id}`)
                            .then(response => {
                                if(response.status === 204)
                                {
                                    vm.articleInformants[key].pivot = {
                                        article_id : vm.article.id,
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

            //Save authors and ideas
            saveArticleAuthorsAndIdeas()
            {
                this.linkAuthorToArticle();
                this.linkInformantToArticle();
                this.linkChannelToArticle();
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

    .sectionDiv {
        padding: 10px;
        border: 2px dotted #E3E3E3;
    }

    .margin_left_5
    {
        margin-left: 5px;
    }

</style>
