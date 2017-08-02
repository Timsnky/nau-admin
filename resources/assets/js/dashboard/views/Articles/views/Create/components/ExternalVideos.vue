<template>
    <!--<div class="form-body">-->
        <!--<label><b>External Videos</b></label>-->
        <!--<div v-for="(articleExternalVideo, index) in articleExternalVideos" class="form-group">-->
            <!--<div class="form-group">-->
                <!--<input-->
                        <!--type="text"-->
                        <!--maxlength="100"-->
                        <!--v-model.trim="articleExternalVideo.url"-->
                        <!--placeholder="URL to post"-->
                        <!--class="form-control article_input">-->
                <!--<button-->
                        <!--@click="deleteArticleExternalVideo(index)"-->
                        <!--class="btn btn-danger btn-sm delete_btn"-->
                        <!--type="button"> x-->
                <!--</button>-->
            <!--</div>-->
            <!--<div class="form-group">-->
                <!--<twitter-element :url="articleSocialMedia.url"></twitter-element>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
    <!--<div class="form-actions item_add">-->
        <!--<button-->
                <!--@click="addArticleSocialMedia()"-->
                <!--class="btn btn-primary item_add_btn"-->
                <!--type="button"> +-->
        <!--</button>-->
    <!--</div>-->
    <!--<div class="form-actions">-->
        <!--<button-->
                <!--class="btn btn-primary"-->
                <!--type="button"-->
                <!--@click="saveArticleSocialMedias()"-->
                <!--:disabled="article.id == null">-->
            <!--Save <i v-if="submitting_main" class="fa fa-spinner fa-spin"></i>-->
        <!--</button>-->
    <!--</div>-->
</template>

<script>

//    import SurveySelect from 'dashboard/components/SurveySelectModal';

    export default {
        data() {
            return {
                articleSurveys: [],
            }
        },

        props: {
            articleId : {
                type: Number,
            }
        },

        components: {
            SurveySelect
        },

        computed: {
            //Get the selected survey id from the modal
            selectedSurveyId()
            {
                return Api.getSurvey();
            },
        },

        mounted()
        {
            if(this.article_id)
            {
                this.initializeArticleSurveys(this.article_id);
            }
        },

        watch: {
            selectedSurveyId(newId, oldId)
            {
                if(newId)
                {
                    Api.resetSurvey();
                    this.getSurvey(newId);
                }
            },

            articleId()
            {
                if(this.articleId)
                {
                    this.initializeArticleSurveys(this.articleId);
                }
            }
        },

        methods: {
            //Get the surveys linked to the specified article
            initializeArticleSurveys(id)
            {
                Api.http
                    .get(`/articles/${id}/surveys`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.articleSurveys = response.data;

                            this.articleSurveys.forEach(function (value, key)
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

            //Get the details of a given survey
            getSurvey(id)
            {
                Api.http
                    .get(`/surveys/${id}`)
                    .then(response =>
                    {
                        if(response.status === 200)
                        {
                            this.articleSurveys.push(response.data);
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the selected survey. Please retry again', {
                                className : ['nau_toast','nau_warning'],
                            });
                        }
                    });
            },

            //Detach a survey from an article
            deleteSurvey(key)
            {
                let vm = this;

                if(vm.articleSurveys[key].linked)
                {
                    Api.http
                        .delete(`/articles/${vm.articleId}/surveys/${vm.articleSurveys[key].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                vm.articleSurveys.splice(key, 1);
                                Vue.toast('Article survey detached successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                        });
                }
                else
                {
                    vm.articleSurveys.splice(key, 1);
                }
            },

            //Links surveys to an article
            saveArticleSurveys()
            {
                let vm = this;

                this.articleSurveys.forEach(function (value, key)
                {
                    if(! vm.articleSurveys[key].linked)
                    {
                        Api.http
                            .put(`/articles/${vm.articleId}/surveys/${vm.articleSurveys[key].id}`)
                            .then(response => {
                                if (response.status === 204)
                                {
                                    vm.articleSurveys[key].linked = 1;
                                }
                                else
                                {
                                    Vue.toast('Error in linking the survey. Please retry again', {
                                        className: ['nau_toast', 'nau_warning'],
                                    });
                                }
                            });
                    }
                });
            },
        }
    }
</script>
