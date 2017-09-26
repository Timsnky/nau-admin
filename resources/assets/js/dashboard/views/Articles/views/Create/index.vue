<template>
    <div>
        <page-title title="Artikel" sub="Erfassen" />

        <div class="note note-danger" v-for="error in errors">
            <h4 class="block">{{ error.title }}</h4>
            <p>{{ error.message }}</p>
        </div>


        <div class="row">
            <div class="col-md-6">
            </div>
            <div class="col-md-6 text-right">
                <button
                        type="button"
                        class="btn btn-primary pull-right margin_left_5"
                        @click="handleSaveAndExit()">
                    Speichern & Schliessen
                </button>
                <button
                        v-if="article.article_status && article.article_status.name !== 'published'"
                        type="button"
                        class="btn btn-primary pull-right margin_left_5"
                        @click="handleSaveAndPublish()">
                    Speichern & Veröffentlichen
                </button>
                <button
                        class="btn btn-primary pull-right margin_left_5"
                        @click="handleSubmit()">
                    Speichern
                </button>
                <a
                        v-if="article.id !== null"
                        :href="article.preview_url"
                        target="_blank"
                        class="btn btn-primary pull-right margin_left_5">
                    <i class="fa fa-desktop" aria-hidden="true"></i> Vorschau
                </a>
            </div>
        </div>
        <form @submit.prevent="handleSubmit">
            <div class="tabbable tabbable-tabdrop">
                <ul class="nav nav-tabs">
                    <li class="active">
                        <a href="#externalTitle" data-toggle="tab">Ansicht Home</a>
                    </li>
                    <li @click="updateInternalDetails()">
                        <a href="#internalTitle" data-toggle="tab">Artikel</a>
                    </li>
                    <li>
                        <a href="#articleImage" data-toggle="tab">Teaser Bilder</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleBody" data-toggle="tab">Artikel-Text</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleMedia" data-toggle="tab">Bilder / Videos</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleSocialMedia" data-toggle="tab">Social</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleExternalVideos" data-toggle="tab">Youtube</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleDoohVideos" data-toggle="tab">DOOH Filme</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleLearning" data-toggle="tab">Key Facts</a>
                    </li>
                    <!--<li :class="[article.id == null ? 'disabledTab' : '']">-->
                        <!--<a href="#articleInfoBoxes" data-toggle="tab">Info Boxes</a>-->
                    <!--</li>-->
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleTags" data-toggle="tab">SEO</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleSurveys" data-toggle="tab">Votings</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']">
                        <a href="#articleSettings" data-toggle="tab">Publish</a>
                    </li>
                    <li :class="[article.id == null ? 'disabledTab' : '']" @click="refreshSortingData()">
                        <a href="#articleSorting" data-toggle="tab">Aufbau</a>
                    </li>
                </ul>
                <div class="tab-content">

                    <!--External Title-->
                    <div class="tab-pane active" id="externalTitle">
                        <div class="form-body">
                            <div class="form-group">
                                <label for="dateline">Überzeile *</label>
                                <input
                                    id="dateline"
                                    type="text"
                                    name="dateline"
                                    maxlength="100"
                                    v-model.trim="article.dateline"
                                    placeholder="Überzeile hinzufügen (max 100 Zeichen)"
                                    class="form-control">
                                <character-counter :limit="100" :itemString="article.dateline"></character-counter>
                            </div>
                            <div class="form-group">
                                <label for="title">Titel Home *</label>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    maxlength="100"
                                    v-model.trim="article.title"
                                    placeholder="Titel hinzufügen (max 100 Zeichen)"
                                    class="form-control">
                                <character-counter :limit="100" :itemString="article.title"></character-counter>
                            </div>
                            <div class="form-group">
                                <label for="title">SEO Titel</label>
                                <input
                                        id="seo_title"
                                        type="text"
                                        name="seo_title"
                                        maxlength="100"
                                        v-model.trim="article.seo_title"
                                        placeholder="SEO Titel hinzufügen (max 100 Zeichen)"
                                        class="form-control">
                                <character-counter :limit="100" :itemString="article.seo_title"></character-counter>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="submit">
                                Artikel speichern <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                            <button
                                    type="button"
                                    v-if="editingArticle"
                                    class="btn btn-primary"
                                    @click="duplicateArticle()">
                                Artikel kopieren
                            </button>
                        </div>
                    </div>

                    <!--Internal Title-->
                    <div class="tab-pane" id="internalTitle">
                        <div class="form-body">
                            <div class="form-group">
                                <label for="internal_dateline">Überzeile Artikel *</label>
                                <input
                                    id="internal_dateline"
                                    type="text"
                                    name="internal_dateline"
                                    maxlength="100"
                                    v-model.trim="article.internal_dateline"
                                    placeholder="Überzeile Artikel hinzufügen (max 100 Zeichen)"
                                    class="form-control">
                                <character-counter :limit="100" :itemString="article.internal_dateline"></character-counter>
                            </div>
                            <div class="form-group">
                                <label for="internal_title">Title Artikel *</label>
                                <input
                                    id="internal_title"
                                    type="text"
                                    name="internal_title"
                                    maxlength="100"
                                    v-model.trim="article.internal_title"
                                    placeholder="Titel des Artikels hinzufügen (max 100 Zeichen)"
                                    class="form-control">
                                <character-counter :limit="100" :itemString="article.internal_title"></character-counter>
                            </div>
                            <div class="form-body wysihtmlLead">
                                <div class="form-group">
                                    <label>Lead *</label>
                                    <div id="lead-toolbar" style="display: none;" class="wysihtml_toolbar text-right">
                                    </div>
                                    <textarea
                                            id="leadEditor"
                                            placeholder="Lead hinzufügen (max 350 Zeichen)"
                                            class="form-control articleEditor wysihtmlTextArea"
                                            v-model.trim="article.lead"
                                            maxlength="350"
                                            rows="5">
                                    </textarea>
                                    <character-counter :limit="350" :itemString="article.lead"></character-counter>
                                </div>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="submit">
                                Artikel speichern <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
                    </div>

                    <!--Main Image-->
                    <div class="tab-pane" id="articleImage">
                        <div class="form-body">
                            <div class="form-group">
                                <h4>Teaser *</h4>

                                <div class="article_image_section">
                                    <div class="article_image_section_div">
                                        <i v-if="! articleMainImage.url" class="fa fa-image" ></i>
                                        <img id="mainImage" v-if="articleMainImage.url" :src="articleMainImage.url" alt="">
                                    </div>
                                </div>
                                <button type="button" class="btn btn-primary image_selection_btn" @click="showImageSelectionModal(1,null)">
                                    Teaser hochladen
                                </button>
                            </div>
                            <div class="form-group">
                                <h4>Top Teaser</h4>
                                <div class="article_image_section">
                                    <div class="article_image_section_div">
                                        <i v-if="! articleTeaserImage.url" class="fa fa-image" ></i>
                                        <img v-if="articleTeaserImage.url" :src="articleTeaserImage.url" alt="">
                                    </div>
                                </div>
                                <button type="button" class="btn btn-primary image_selection_btn" @click="showImageSelectionModal(4,null)">
                                    Top Teaser hochladen
                                </button>
                                <!--<button type="button" class="btn btn-danger image_selection_btn" @click="deleteTeaserImage(article.id)">-->
                                    <!--Löschen-->
                                <!--</button>-->
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="submit">
                                Artikel speichern <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
                    </div>

                    <!--Bodies-->
                    <div class="tab-pane" id="articleBody">
                        <bodies :article-id="article.id"></bodies>
                    </div>

                    <!--Images, Videos and Sliders-->
                    <div class="tab-pane" id="articleMedia">
                        <!--Images-->
                        <div class="form-body">
                            <div class="form-group">
                                <h4>Bilder</h4>
                                <div class="row media_overflow">
                                    <div class="media_images">
                                        <div class="col-md-3 media_image image_section_height" v-for="(image, index) in articleImages">
                                            <img :src="image.url" alt="">
                                            <div class="form-group">

                                                <!--<select class="form-control" @change="imageSourceSelected(index)" v-model="image.selectedSource">-->
                                                    <!--<option v-bind:value="source.name" v-for="source in sources">-->
                                                        <!--{{ source.displayName}}-->
                                                    <!--</option>-->
                                                <!--</select>-->
                                                <input class="form-control margin_top_5" type="text" v-model="image.source" placeholder="Enter source for image (required)"/>
                                                <input class="form-control margin_top_5" type="text" v-model="image.lead" placeholder="Enter lead for image"/>
                                                <button
                                                        class="btn btn-danger btn-sm remove_btn"
                                                        type="button"
                                                        @click="confirmArticleImageDelete(index)">
                                                    <i class="fa fa-trash"></i>
                                                </button>
                                                <button
                                                        class="btn btn-primary btn-sm remove_btn"
                                                        type="button"
                                                        @click="updateImage(index)">
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-actions selection_sections">
                                    <button type="button" class="btn btn-primary image_selection_btn" @click="showImageSelectionModal(2, null)">
                                        Bilder Hochladen
                                    </button>
                                    <!--<input type="file" class="btn btn-primary" name="article_images" id="article_images" @change="articleImagesChange" multiple/>-->
                                </div>
                            </div>
                            <!--<button class="btn btn-primary" type="button" :disabled="articleImages.length == 0 || disableArticleImagesSubmit" @click="uploadArticleImages(article.id)">Save images</button>-->
                        </div>

                        <!--Sliders-->
                        <div class="form-body">
                            <h4>Diashow</h4>
                            <div class="media_images sliders">
                                <div v-for="(slider, sliderIndex) in articleSliders" class="slider_section">
                                    <div class="form-group">
                                        <input class="form-control" type="text" v-model="slider.name"
                                               placeholder="Name für Slider eingeben (zwingend)"/>
                                    </div>
                                    <div class="media_overflow">
                                        <draggable class="slider_images_section" v-model="slider.images">
                                            <div v-for="(image, index) in slider.images" :key="index"
                                                 class="col-md-3 slider_image">
                                                <img :src="image.url" alt="">
                                                <div class="form-group">
                                                    <input class="form-control margin_top_5" type="text" v-model="image.source" placeholder="Enter source for image (required)"/>
                                                    <input class="form-control margin_top_5" type="text" v-model="image.lead" placeholder="Enter lead for image"/>
                                                    <button
                                                            class="btn btn-danger btn-sm remove_btn"
                                                            type="button"
                                                            @click="confirmSliderImageDelete(sliderIndex, index)">
                                                        <i class="fa fa-trash"></i>
                                                    </button>
                                                    <button
                                                            class="btn btn-primary btn-sm remove_btn"
                                                            type="button"
                                                            @click="updateSliderImage(sliderIndex, index)">
                                                        Update
                                                    </button>
                                                </div>
                                            </div>
                                        </draggable>
                                    </div>
                                    <div class="form-actions">
                                        <button type="button" class="btn btn-primary image_selection_btn" @click="showImageSelectionModal(3, sliderIndex)">
                                            Bilder Hochladen
                                        </button>
                                        <button type="button" class="btn btn-danger image_selection_btn" @click="confirmSliderDelete(sliderIndex)">
                                            Löschen
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary" @click="addArticleSlider()">Diashow hinzufügen
                            </button>
                            <!--<button class="btn btn-primary" type="button"-->
                                    <!--:disabled="articleSliders.length == 0 || article.id == null"-->
                                    <!--@click="uploadArticleSliders(article.id)">Save sliders-->
                            <!--</button>-->

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
                                                <button
                                                        class="btn btn-primary btn-sm remove_btn"
                                                        type="button"
                                                        @click="updateVideo(index)">
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-actions selection_sections">
                                    <button type="button" class="btn btn-primary image_selection_btn" @click="showVideoSelectionModal()">
                                        Videos Hochladen
                                    </button>
                                    <!--<input type="file" class="btn btn-primary" name="article_videos" id="article_videos" @change="articleVideosChange" multiple/>-->
                                </div>

                            </div>
                            <!--<button class="btn btn-primary" type="button" :disabled="articleVideos.length == 0 || disableArticleVideosSubmit" @click="uploadArticleVideos(article.id)">Save videos</button>-->
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-primary image_selection_btn" @click="saveArticleMedia(article.id)">
                                Save Media
                            </button>
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

                    <!--DOOH Videos-->
                    <div class="tab-pane" id="articleDoohVideos">
                        <div class="form-body">
                            <dooh-video :article-id="article.id" :dooh-video-id="article.dooh_video_id"></dooh-video>
                        </div>
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
                                <label>Autor *</label>
                                <multiselect
                                        id="authorsMultiSelect"
                                        v-model="articleAuthors"
                                        :options="existingAuthors"
                                        placeholder="Type to search author"
                                        label="name"
                                        :allow-empty="false"
                                        :max-height="500"
                                        :options-limit="100"
                                        :clear-on-select="false"
                                        :close-on-select="false"
                                        track-by="id"
                                        :multiple="true"
                                        open-direction="bottom"
                                        :internal-search="false"
                                        :loading="authorsIsLoading"
                                        @search-change="searchAuthors"
                                        @remove="deleteAuthors">
                                </multiselect>
                            </div>

                            <div class="form-group">
                                <label>Informanten</label>
                                <multiselect
                                        id="informantsMultiSelect"
                                        v-model="articleInformants"
                                        :options="existingInformants"
                                        placeholder="Informant hinzufügen (nicht obligatorisch)"
                                        label="name"
                                        :max-height="500"
                                        :options-limit="100"
                                        :clear-on-select="false"
                                        :close-on-select="false"
                                        track-by="id"
                                        :multiple="true"
                                        open-direction="bottom"
                                        :internal-search="false"
                                        :loading="informantsIsLoading"
                                        @search-change="searchInformants"
                                        @remove="deleteInformants">
                                </multiselect>
                            </div>
                            <div class="form-group">
                                <label>Ursprungsort der Geschichte*</label>
                                <multiselect
                                        id="locationMultiSelect"
                                        v-model="articlePlaces"
                                        :options="existingPlaces"
                                        placeholder="Ort hinzufügen"
                                        label="name"
                                        :close-on-select="true"
                                        :internal-search="false"
                                        open-direction="bottom"
                                        :options-limit="100"
                                        :max-height="500"
                                        :loading="placesIsLoading"
                                        @search-change="searchPlaces">
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
                                <label>Publikationsdatum</label>
                                <date-and-time
                                        @changeDate="changeDate"
                                        :date="article.published_at ? publicationDate : '' "/>
                            </div>
                            <div class="form-group">
                                <label>Order Date</label>
                                <date-and-time
                                        @changeDate="changeOrderDate"
                                        :date="article.order_date ? orderDate : '' "/>
                            </div>
                            <div class="form-group">
                                <label class="mt-checkbox no_margin_bottom">
                                    <input type="checkbox" v-model="article.push_notification" value="true"> Push Notification
                                    <span></span>
                                </label>
                            </div>
                            <div class="form-group">
                                <label>Push Notification Regions</label>
                                <div class="col-md-3 col-sm-12 idea_images_section" v-for="(region, index) in articleRegions">
                                    <label class="mt-checkbox no_margin_bottom">
                                        <input type="checkbox" v-model="region.id" value="true">{{ region.name }}
                                        <span></span>
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="mt-checkbox no_margin_bottom">
                                    <input type="checkbox" v-model="article.display" value="true">Übersicht anzeigen
                                    <span></span>
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="mt-checkbox no_margin_bottom">
                                    <input type="checkbox" v-model="article.display_while_big" value="true">Auch in Liste anzeigen wenn Big
                                    <span></span>
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="mt-checkbox no_margin_bottom">
                                    <input type="checkbox" v-model="article.geo_switzerland_only" value="true">Nur Schweiz
                                    <span></span>
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="mt-checkbox no_margin_bottom">
                                    <input type="checkbox" v-model="article.authenticated_only" value="true">Nur für eingeloggte Benutzer
                                    <span></span>
                                </label>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="button"
                                    @click="saveSettings(article.id)"
                                    :disabled="articleAuthors.length < 1 || article.id == null">
                                Speichern <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                            </button>
                        </div>
                    </div>

                    <!--Sorting-->
                    <div class="tab-pane" id="articleSorting">
                        <div class="form-body">
                            <div class="form-body">
                                <h3>{{ article.title}}</h3>
                                <p v-html="article.lead"></p>
                            </div>
                            <draggable v-model="articleElements">
                                <div v-for="(articleElement, index) in articleElements" :key="articleElement.element_id" class="form-group">
                                    <!--Image-->
                                    <div v-if="articleElement.type == 'image'" class="form-body panel">
                                        <div class="panel_heading">
                                            <span class="panel_title">Bilder</span>
                                            <button v-if="displayedPanel !== index" type="button" class="btn btn-sm panel_toggle" @click="setDisplayedPanel(index)"><i class="fa fa-plus"></i></button>
                                            <button v-if="displayedPanel === index" type="button" class="btn btn-sm panel_toggle" @click="setDisplayedPanel(index)"><i class="fa fa-minus"></i></button>
                                        </div>
                                        <div class="panel_body">
                                            <div class="panel_preview" v-if="displayedPanel !== index">
                                                <p>{{ articleElement.lead }}</p>
                                            </div>
                                            <div class="panel_content padding_top_15 elementImageSection" v-if="displayedPanel === index">
                                                <img :src="articleElement.url" alt="">
                                            </div>
                                        </div>
                                    </div>

                                    <!--Body-->
                                    <div v-if="articleElement.type == 'body'" class="form-body panel">
                                        <div class="panel_heading">
                                            <span class="panel_title">Artikel-Text</span>
                                            <button v-if="displayedPanel !== index" type="button" class="btn btn-sm panel_toggle" @click="setDisplayedPanel(index)"><i class="fa fa-plus"></i></button>
                                            <button v-if="displayedPanel === index" type="button" class="btn btn-sm panel_toggle" @click="setDisplayedPanel(index)"><i class="fa fa-minus"></i></button>
                                        </div>
                                        <div class="panel_body">
                                            <div class="panel_preview" v-if="displayedPanel !== index">
                                                <p v-html="trimContent(articleElement.content)"></p>
                                            </div>
                                            <div class="panel_content" v-if="displayedPanel === index">
                                                <p v-html="articleElement.content"></p>
                                            </div>
                                        </div>
                                    </div>

                                    <!--Slider-->
                                    <div v-if="articleElement.type == 'slider'" class="form-body panel">
                                        <div class="panel_heading">
                                            <span class="panel_title">Diashow</span>
                                            <button v-if="displayedPanel !== index" type="button" class="btn btn-sm panel_toggle" @click="setDisplayedPanel(index)"><i class="fa fa-plus"></i></button>
                                            <button v-if="displayedPanel === index" type="button" class="btn btn-sm panel_toggle" @click="setDisplayedPanel(index)"><i class="fa fa-minus"></i></button>
                                        </div>
                                        <div class="panel_body">
                                            <div class="panel_preview" v-if="displayedPanel !== index">
                                                <p v-html="articleElement.name"></p>
                                            </div>
                                            <div class="panel_content padding_top_15" v-if="displayedPanel === index">
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
                                    </div>

                                    <!--Learnings-->
                                    <div v-if="articleElement.type == 'learning'" class="form-body panel">
                                        <div class="panel_heading">
                                            <span class="panel_title">Key Fact</span>
                                            <button v-if="displayedPanel !== index" type="button" class="btn btn-sm panel_toggle" @click="setDisplayedPanel(index)"><i class="fa fa-plus"></i></button>
                                            <button v-if="displayedPanel === index" type="button" class="btn btn-sm panel_toggle" @click="setDisplayedPanel(index)"><i class="fa fa-minus"></i></button>
                                        </div>
                                        <div class="panel_body">
                                            <div class="panel_preview" v-if="displayedPanel !== index">

                                            </div>
                                            <div class="panel_content" v-if="displayedPanel === index">
                                                <ul>
                                                    <li v-for="learning in articleElement.learnings">{{ learning }}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <!--Social Media-->
                                    <div v-if="articleElement.type == 'socialmedia'" class="form-body panel">
                                        <div class="panel_heading">
                                            <span class="panel_title">Social</span>
                                            <button v-if="displayedPanel !== index" type="button" class="btn btn-sm panel_toggle" @click="setDisplayedPanel(index)"><i class="fa fa-plus"></i></button>
                                            <button v-if="displayedPanel === index" type="button" class="btn btn-sm panel_toggle" @click="setDisplayedPanel(index)"><i class="fa fa-minus"></i></button>
                                        </div>
                                        <div class="panel_body">
                                            <div class="panel_preview" v-if="displayedPanel !== index">
                                                <p></p>
                                            </div>
                                            <div class="panel_content" v-if="displayedPanel === index">
                                                <twitter-element :url="articleElement.url"></twitter-element>
                                            </div>
                                        </div>
                                    </div>

                                    <!--Videos-->
                                    <div v-if="articleElement.type == 'video'" class="form-body panel">
                                        <div class="panel_heading">
                                            <span class="panel_title">Video</span>
                                            <button v-if="displayedPanel !== index" type="button" class="btn btn-sm panel_toggle" @click="setDisplayedPanel(index)"><i class="fa fa-plus"></i></button>
                                            <button v-if="displayedPanel === index" type="button" class="btn btn-sm panel_toggle" @click="setDisplayedPanel(index)"><i class="fa fa-minus"></i></button>
                                        </div>
                                        <div class="panel_body">
                                            <div class="panel_preview" v-if="displayedPanel !== index">
                                                <p v-html="articleElement.name"></p>
                                            </div>
                                            <div class="panel_content elementImageSection " v-if="displayedPanel === index">
                                                <video controls>
                                                    <source :src="articleElement.urls[0]" type="video/mp4">
                                                    <source :src="articleElement.urls[1]" type="video/webm">
                                                </video>
                                            </div>
                                        </div>
                                    </div>

                                    <!--Surveys-->
                                    <div v-if="articleElement.type == 'survey'" class="form-body panel">
                                        <div class="panel_heading">
                                            <span class="panel_title">Voting</span>
                                            <button v-if="displayedPanel !== index" type="button" class="btn btn-sm panel_toggle" @click="setDisplayedPanel(index)"><i class="fa fa-plus"></i></button>
                                            <button v-if="displayedPanel === index" type="button" class="btn btn-sm panel_toggle" @click="setDisplayedPanel(index)"><i class="fa fa-minus"></i></button>
                                        </div>
                                        <div class="panel_body">
                                            <div class="panel_preview" v-if="displayedPanel !== index">
                                                <p v-html="trimContent(articleElement.question)"></p>
                                            </div>
                                            <div class="panel_content elementImageSection" v-if="displayedPanel === index">
                                                <p>{{ articleElement.question }}</p>
                                                <ol>
                                                    <li v-for="(answer, index) in articleElement.answers">{{ answer.answer }}</li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>

                                    <!--External Videos-->
                                    <div v-if="articleElement.type == 'externalvideo'" class="form-body panel">
                                        <div class="panel_heading">
                                            <span class="panel_title">External Video</span>
                                            <button v-if="displayedPanel !== index" type="button" class="btn btn-sm panel_toggle" @click="setDisplayedPanel(index)"><i class="fa fa-plus"></i></button>
                                            <button v-if="displayedPanel === index" type="button" class="btn btn-sm panel_toggle" @click="setDisplayedPanel(index)"><i class="fa fa-minus"></i></button>
                                        </div>
                                        <div class="panel_body">
                                            <div class="panel_preview" v-if="displayedPanel !== index">
                                                <p></p>
                                            </div>
                                            <div class="panel_content" v-if="displayedPanel === index">
                                                <div class="timeline">
                                                    <timeline-item :key="articleElement.id" :liveticker="articleElement" @delete="deleteArticleExternalVideo(index)">
                                                        <external-video-element :element="articleElement" />
                                                    </timeline-item>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </draggable>
                        </div>
                        <div class="form-actions">
                            <button
                                    class="btn btn-primary"
                                    type="button"
                                    @click="saveSortedElements(article.id)"
                                    :disabled="article.id == null">
                                Aufbau speichern
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
    import CharacterCounter from 'dashboard/components/CharacterCounter';
    import ArticleSorting from './components/ArticleSorting';
    import TimelineItem from '../Liveticker/views/Show/components/TimelineItem';
    import ExternalVideoElement from '../Liveticker/views/Show/components/Elements/ExternalVideoElement';
    import DoohVideo from './components/DoohVideos';
//    import InfoBoxes from './components/InfoBoxes';
    import videoMixin from './mixins/videoMixin';
    import imageMixin from './mixins/imageMixin';
    import sliderMixin from './mixins/sliderMixin';
    import sortingMixin from './mixins/sortingMixin';
    import initializationMixin from './mixins/initializationMixin';

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
                    published_at: null,
                    order_date: null,
                    location: '',
                    push_notification: false,
                    display: true,
                    display_while_big: false,
                    geo_switzerland_only: false,
                    authenticated_only: false
                },
                duplicateArticleId: null,
                editingArticle: false,
                articleTitle: '',
                type: 1,
                videoSelectorId: 1,
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
                authorsIsLoading: false,
                searchedAuthor: {
                    query: '',
                    promise: true
                },
                articleInformants: [
                ],
                existingInformants: [
                ],
                informantsIsLoading: false,
                searchedInformant: {
                    query: '',
                    promise: true
                },
                articlePlaces: {},
                existingPlaces: [
                ],
                placesIsLoading: false,
                searchedPlace: {
                    query: '',
                    promise: true
                },
                articleElements: [
                ],
                existingChannels: [
                ],
                articleChannel: null,
                saveArticleImagesDisabled: true,
                displayedPanel: null,
                errors: [],
                articleRegions:[],
                regions: []
            };
        },

        mixins: [
            videoMixin,
            imageMixin,
            sliderMixin,
            sortingMixin,
            initializationMixin,
            publishMixin
        ],

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
            CharacterCounter,
            ArticleSorting,
            TimelineItem,
            ExternalVideoElement,
            DoohVideo
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

            //Compute the order date
            orderDate()
            {
                return moment(this.article.order_date).format('YYYY-MM-DD HH:mm');
            },

            //Article title has changed
            articleTitleChanged()
            {
                return this.articleTitle !== this.article.title;
            }
        },

        watch: {
            selectedImageId(newId, oldId)
            {
                if(newId && Api.getImageSelector() === this.type)
                {
                    Api.resetImage();
                    Api.resetImageSelector();
                    this.getMainImage(newId);
                }
            },

            selectedVideoId(newId, oldId)
            {
                if(newId && Api.getVideoSelector() === this.videoSelectorId)
                {
                    Api.resetVideo();
                    Api.resetVideoSelector();
                    this.getVideo(newId);
                }
            },

            articlePlaces(newPlace, oldPlace)
            {
                if(newPlace) {
                    this.article.location = newPlace.name;
                }
            }
        },

        methods: {
            /**
             * DUPLICATION
             */
            //Duplicate an article
            duplicateArticle()
            {
                if(! this.article.id)
                {
                    Vue.toast('Please create an article first inorder to duplicate', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
                else if(! this.articleTitleChanged)
                {
                    Vue.toast('Please use a different title inorder to duplicate the article', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
                else
                {
                    this.prepareDuplication();
                    this.createDuplicateArticle();
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
                this.setArticleAuthor(this.duplicateArticleId);
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

            /**
             * SAVE AND EXIT
             */
            //Validate the save and exit button
            handleSaveAndExit()
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
                    this.setSavingDefaults();

                    this.saveAndExit();
                }
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
                                Vue.toast('Article updated successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });

                                this.saveArticleItems(this.article.id);
                                this.$router.push('/articles');
                            }
                            else
                            {
                                Vue.toast('Error in updating the article. Please retry again', {
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
                            this.saveArticleItems(this.article.id);
                            this.$router.push('/articles');
                        });
                }
            },

            /**
             * SAVE AND PUBLISH
             */
            handleSaveAndPublish()
            {
                let errorString = this.validateSaveAndPublish();

                if(errorString !== "")
                {
                    Vue.toast('Um zu speichern, müssen ' + errorString + ' vorhanden sein', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
                else
                {
                    this.setSavingDefaults();

                    this.saveAndPublish();
                }
            },

            //Validate the save and publish process
            validateSaveAndPublish()
            {
                let errorString = "";
                let errorArray = [];
                this.article.lead = this.leadEditor.getValue();

                if(! this.article.dateline)
                {
                    errorArray.push('Überzeile');
                }

                if(! this.article.title)
                {
                    errorArray.push('Titel Home');
                }

                if(! this.articleMainImage.url)
                {
                    errorArray.push('Teaser');
                }

                if(this.article.lead === '')
                {
                    errorArray.push('Lead');
                }

                if(this.articleAuthors.length === 0)
                {
                    errorArray.push('Autor');
                }

                if(!this.article.location)
                {
                    errorArray.push('Ursprungsort der Geshcichte');
                }

                console.log('Ursprungsort der Geshcichte: ' + this.article.location);

                if(this.article.published_at === null || this.article.published_at === '')
                {
                    errorArray.push('Publikationsdatum');
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
                            errorString += 'und ' + value;
                        }
                    });
                }

                return errorString;

            },

            //Save and publish
            saveAndPublish()
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

                                this.saveArticleItems(this.article.id);
                                this.publishArticle(this.article.id);
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
                            this.saveArticleItems(this.article.id);
                        });
                }
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
                    errorArray.push('Überzeile');
                }

                if(! this.article.title)
                {
                    errorArray.push('Titel Home');
                }

                if(this.article.lead === '')
                {
                    errorArray.push('Lead');
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
                            errorString += 'und ' + value;
                        }
                    });
                }

                return errorString;
            },

            publishArticle(id) {
                Api.http.put(`/articles/${id}/publish`)
                .then(response => {
                    this.$router.push('/articles');
                    swal(
                      'Artikel veröffentlicht!',
                      '',
                      'success'
                    );
                })
                .catch(error => {
                    if(error.response.status === 422) {
                        _.each(error.response.data.errors, (errors, field) => {
                            _.each(errors, (error) => {
                                this.errors.push({
                                    title: 'Publizieren fehlgeschlagen',
                                    message: error,
                                })
                            });
                        });
                    } else {
                        console.error(error);
                    }
                })
            },

            //Setup some of the required saving defaults
            setSavingDefaults()
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

            //Handle the submission of the article
            handleSubmit()
            {
                let errorString = this.validateSubmit();

                if(errorString !== "")
                {
                    Vue.toast('Um zu speichern, müssen ' + errorString + ' vorhanden sein', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
                else
                {
                    this.setSavingDefaults();

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
                            this.setArticleAuthor(this.article.id);
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

            //link user as article author
            setArticleAuthor(articleId)
            {
                Api.http
                    .put(`/articles/${articleId}/authors/${Api.user().id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            this.initializeArticleAuthors(articleId);

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

            //Save the other article details if possible
            saveArticleItems(articleId)
            {
                this.sendSaveActionEvent(articleId);
                this.saveArticleMedia(articleId);
                this.saveSettings(articleId);
                this.saveSortedElements(articleId);
            },

            //Send a request for data duplication to specified article id
            sendSaveActionEvent(articleId)
            {
                this.$emit('saveData', articleId);
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

                Api.setImageSelector(this.type);

                $('#imageSelectionModal').modal('show');
            },

            //Trigger the video selection modal
            showVideoSelectionModal()
            {
                Api.setVideoSelector(this.videoSelectorId);

                $('#videoSelectionModal').modal('show');
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
                if(this.articleMainImage.url)
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
                            this.article.teaser_id = this.articleTeaserImage.id;

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

            //Delete the teaser image for an article
            deleteTeaserImage(articleId)
            {
                if(articleId && this.article.teaser_id)
                {
                    Api.http
                        .delete(`/articles/${articleId}/teaser/${this.articleTeaserImage.id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                this. articleTeaserImage = { 'url': null, 'id': null};

                                Vue.toast('Article teaser image deleted successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                            else
                            {
                                Vue.toast('Error in deleting the article teaser image. Please retry again', {
                                    className: ['nau_toast', 'nau_warning'],
                                });
                            }
                        });
                }
                else
                {
                    if(this.articleTeaserImage.url)
                    {
                        this. articleTeaserImage = { 'url': null, 'id': null};

                        Vue.toast('Article teaser image deleted successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    }
                }
            },

            /**
             * ARTICLE MEDIA
             */
            //Save all the media
            saveArticleMedia(articleId)
            {
                let errorString = this.validateMediaSubmit();

                if(errorString !== '')
                {
                    Vue.toast('Please provide the source details for all the ' + errorString + ' in order to save', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
                else
                {
                    this.uploadArticleImages(articleId);
                    this.uploadArticleSliders(articleId);
                    this.uploadArticleVideos(articleId);
                }
            },

            //Validate the media submission
            validateMediaSubmit()
            {
                let errorString = "";
                let errorArray = [];

                if(this.disableArticleImagesSubmit)
                {
                    errorArray.push('images');
                }

                if(this.disableArticleVideosSubmit)
                {
                    errorArray.push('videos');
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
        },

        mounted: function ()
        {
            if(this.$route.params.hasOwnProperty('id'))
            {
                this.editingArticle = true;

                this.initialiseArticle(this.$route.params.id);
            }
            else
            {
                this.initializeEditors();
            }

            this.initializeChannels();
            this.initializeRegions();
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
    .container {
        max-width: 640px;
        margin: 20px auto;
    }
    .container img {
        width: 100%;
    }

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

    .auto_height {
        width: auto !important;
        height: auto;
        max-height: 300px;
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
        max-height: 440px;
    }

    .media_image {
        padding: 10px;
        margin-left: 15px;
        width: 320px;
        height: 325px;
        border: 1px solid #E3E3E3;
        border-radius: 3px;
        background: #e3e3e3;
        margin-bottom: 10px;
    }

    .image_section_height {
        height: 330px;
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
        height: 320px;
        border: 1px solid #403E3E;
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

    .no_margin_bottom {
        margin-bottom: 0px !important;
    }

 /*   img {
        max-width: 100%;
    }*/
</style>
