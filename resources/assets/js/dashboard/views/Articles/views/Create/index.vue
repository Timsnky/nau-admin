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
                        <a href="#tab2" data-toggle="tab">Internal Title</a>
                    </li>
                    <li>
                        <a href="#tab3" data-toggle="tab">Section 3</a>
                    </li>
                    <li>
                        <a href="#tab4" data-toggle="tab">Section 4</a>
                    </li>
                    <li>
                        <a href="#tab5" data-toggle="tab">Section 5</a>
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
                    </div>
                    <div class="tab-pane" id="tab2">
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
                    </div>
                    <div class="tab-pane" id="tab3">
                        <div class="form-body">
                            <div class="form-group">
                                <label for="article_image">Article image</label>
                                <div style="padding: 5px;">
                                    <div style="position: relative; background-color: gray; display: inline-block; width: 200px; height: 100px;">
                                        <i v-if="articleMainImage.image === ''" class="fa fa-image" style="position: absolute; color: #999; left: 100px; top: 50px; transform: translate(-50%, -50%); font-size: 32px;"></i>
                                        <img width="200" height="100" v-bind:src="articleMainImage.image" id="img_article_image" alt="">
                                    </div>
                                </div>
                                <input type="file" name="article_image" id="article_image" v-on:change="mainArticleImageChange"/>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="tab4">
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
                    </div>
                    <div class="tab-pane" id="tab5">
                        <div class="form-body">
                            <div class="form-group">
                                <label for="images">Images</label> <input type="file" name="article_images" id="article_images" v-on:change="articleImagesChange" multiple/>
                                <div id="images" style="padding: 5px;">
                                    <div v-for="(image, index) in articleImages" style="position: relative; background-color: gray; display: inline-block; width: 200px;">
                                        <img width="200" height="100" v-bind:src="image.src" alt="" style="padding: 5px">
                                        <label v-bind:for="'image_src_' + index">Source</label>
                                        <input type="text" v-model="image.source" placeholder="src" v-bind:id="'image_src_' + index" v-bind:name="'image_src_' + index"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary" type="button" :disabled="saveArticleImagesDisabled">Save images</button>
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
            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!article.dateline || !article.title || !article.internal_title || !article.internal_dateline || !article.lead || !articleMainImage.image">
                    Submit <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>
                </button>
            </div>
        </form>
    </div>
</template>
<script>
    import request from 'dashboard/utils/request';

    export default {
        data: () => {
            return {
                submitting_main: false,
                article: {
                    dateline: '',
                    title: '',
                    internal_dateline: '',
                    internal_title: '',
                    lead: '',
                    image_id: null,
                    id: null
                },
                articleMainImage: {
                    image: '',
                    imageId: null
                },
                articleImages: [

                ],
                saveArticleImagesDisabled: true
            };
        },
        methods: {
            mainArticleImageChange: function () {
                var file = document.getElementById('article_image');
                if (!file) return;
                var reader = new FileReader();
                reader.readAsDataURL(file.files[0]);
                reader.onload = () => {
                    this.articleMainImage.image = reader.result;
                };
            },
            articleImagesChange: function () {
                var fileElement = document.getElementById('article_images');
                if (!fileElement) return;
                for (var i = 0; i < fileElement.files.length; i++) {
                    var reader = new FileReader();
                    reader.readAsDataURL(fileElement.files[i]);
                    reader.onload = (e) => {
                        this.articleImages.push({ src: e.target.result, source: '' });
                    };
                }
            },
            handleSubmit: function () {
                this.submitting_main = true;
                request.post('/images', {
                    image: this.articleMainImage.image,
                    name: this.article.title,
                    source: this.article.title,
                    lead: this.article.title
                })
                .then((res) => {
                    if (res.status === 201) {
                        this.article.image_id = res.data.id;
                        return request.post('/articles', this.article);
                    } else {
                        return Promise.reject('Failed creating image');
                    }
                })
                .then((res) => {
                    if (res.status === 201) {
                        this.article.id = res.data.id;
                        return request.put('/article/' + this.article.id + '/image/' + this.article.image_id);
                    } else {
                        return Promise.reject('Failed creating article');
                    }
                })
                .then((res) => {
                    this.submitting_main = false;
                    alert('created');
                    console.log(res);
                })
                .catch((err) => { this.submitting_main = false; console.log(err); });
                /*request.post('/articles', this.article)
                    .then(function (res) { console.log(res); })
                    .catch(function (err) {});*/
            }
        },
        mounted: function () {
            var saveArticleImagesInterval = setInterval(() => {
                if (this.articleImages.length === 0) { return this.saveArticleImagesDisabled = true; }
                for (var i = 0; i < this.articleImages.length; i++) {
                    if (this.articleImages[i].source == '') { return this.saveArticleImagesDisabled = true; }
                }
                return this.saveArticleImagesDisabled = false;
            }, 1000);

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