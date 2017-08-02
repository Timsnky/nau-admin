<template>
    <div class="form-body">
        <div class="form-group surveys_section">
            <h4>Surveys</h4>
            <div class="row">
                <table>
                    <tr v-for="(survey, index) in articleSurveys">
                        <td>
                            <div class="col-md-12">
                                <h5>{{ survey.question }}</h5>
                                <ol>
                                    <li v-for="answer in survey.answers">{{ answer.answer }}</li>
                                </ol>
                            </div>
                        </td>
                        <td>
                            <div class="form-group">
                                <button
                                        class="btn btn-danger btn-sm remove_btn"
                                        type="button"
                                        @click="deleteSurvey(index)">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="form-actions selection_sections">
                <button type="button" class="btn btn-primary image_selection_btn" data-toggle="modal" data-target="#surveySelectionModal">
                    Select Survey
                </button>
                <survey-select></survey-select>
            </div>
        </div>
        <button class="btn btn-primary" type="button" :disabled="articleSurveys.length == 0 || articleId == null" @click="saveArticleSurveys()">Save surveys</button>
    </div>
</template>

<script>

    import SurveySelect from 'dashboard/components/SurveySelectModal';

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
