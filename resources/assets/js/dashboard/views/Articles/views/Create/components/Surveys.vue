<template>
    <div class="form-body">
        <div class="form-group surveys_section">
            <h4>Surveys</h4>
            <div class="form-actions selection_sections">
                <button type="button" class="btn btn-primary image_selection_btn" data-toggle="modal" data-target="#surveySelectionModal">
                    Select Survey
                </button>
                <button type="button" class="btn btn-primary image_selection_btn" :disabled="addingSurvey" @click="showAddSurvey()">
                    Add Survey
                </button>
                <survey-select></survey-select>
            </div>
            <div class="form-group" v-if="addingSurvey">
                <div class="form-group">
                    <label>Question</label>
                    <input
                            type="text"
                            name="question"
                            v-model.trim="survey.question"
                            placeholder="Question"
                            class="form-control">
                </div>

                <div class="form-group">
                    <label>Replies</label>
                    <div v-for="answer, key in survey.answers" class="form-group">
                        <div class="input-group">
                            <input type="text"
                                   v-model="survey.answers[key].answer"
                                   placeholder="Antwort"
                                   class="form-control">
                            <span class="input-group-btn">
                                        <button class="btn btn-danger" type="button" @click="removeAnswer(key)">
                                            <i class="fa fa-times"></i>
                                        </button>
                                    </span>
                        </div>
                    </div>
                </div>
                <div class="form-group" v-show="survey && survey.answers.length <= 5">
                    <button type="button" class="btn btn-block btn-primary" @click="addAnswer()">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
                <div class="form-actions">
                    <button
                            @click="closeAddSurvey()"
                            class="btn btn-danger"
                            type="button">
                        Close
                    </button>
                    <button
                            @click="saveSurvey()"
                            class="btn btn-primary"
                            type="button"
                            :disabled="! survey.question || disableSaveSurvey">
                        Save Survey
                    </button>
                </div>
            </div>
            <div class="row">
                <table class="table table-hover table-bordered table-scrollable">
                    <tbody>
                    <tr v-for="(survey, index) in articleSurveys">
                        <td>
                            <div class="col-md-12">
                                <h5>{{ survey.question }}</h5>
                                <ol>
                                    <li v-for="(answer, index) in survey.answers">{{ answer.answer }}</li>
                                </ol>
                            </div>
                        </td>
                        <td>
                            <div class="form-group">
                                <button
                                        class="btn btn-danger btn-sm remove_btn"
                                        type="button"
                                        @click="confirmDelete(index)">
                                    <i class="fa fa-trash"></i>
                                </button>
                                <button
                                        class="btn btn-warning btn-sm remove_btn"
                                        type="button"
                                        @click="startEditSurvey(index)">
                                    <i class="fa fa-pencil"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <button class="btn btn-primary" type="button" :disabled="articleSurveys.length == 0 || articleId == null" @click="saveArticleSurveys(articleId)">Save surveys</button>
    </div>
</template>

<script>

    import SurveySelect from 'dashboard/components/SurveySelectModal';

    export default {
        data() {
            return {
                articleSurveys: [],
                addingSurvey: false,
                survey: {
                    question: '',
                    answers: [
                        {
                            answer: ''
                        },
                        {
                            answer: ''
                        },
                    ]
                },
                editedSurveyKey: null
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

            //Disable saving of a survey
            disableSaveSurvey()
            {
                if(this.survey.question === '')
                {
                    return true;
                }

                let answersCount = 0;

                for (let [key, value] of this.survey.answers.entries())
                {
                    if(value.answer !== '')
                    {
                        answersCount ++;
                    }
                    if(answersCount >= 2)
                    {
                        return false
                    }
                }

                return true;
            },
        },

        mounted()
        {
            if(this.articleId)
            {
                this.initializeArticleSurveys(this.articleId);
            }
        },

        created()
        {
            this.$parent.$on('duplicateData', this.duplicateData);
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

            //Show the survey add section
            showAddSurvey()
            {
                this.addingSurvey = true;
            },

            //Close the add survey section
            closeAddSurvey()
            {
                this.addingSurvey = false;
                this.survey = {
                    question: '',
                    answers: [
                        {
                            answer: ''
                        },
                        {
                            answer: ''
                        },
                        {
                            answer: ''
                        }
                    ]
                }
            },

            //Add an answer
            addAnswer()
            {
                this.survey.answers.push({'answer' : '', 'id' : null});
            },

            //Remove an answer
            removeAnswer(key)
            {
                this.survey.answers.splice(key, 1);
            },

            //Edit a survey
            startEditSurvey(key)
            {
                this.survey = this.articleSurveys[key];
                this.addingSurvey = true;
                this.editedSurveyKey = key;
            },

            //Save a survey record
            saveSurvey()
            {
                let vm = this;

                if(this.survey.id)
                {
                    this.updateSurvey();
                }
                else
                {
                    this.createSurvey();
                }
            },

            //Create a new survey record
            createSurvey()
            {
                let vm = this;

                Api.http
                    .post(`/surveys`, {question: this.survey.question})
                    .then((response) =>
                    {
                        if(response.status === 201)
                        {
                            let survey = response.data;
                            vm.articleSurveys.push(response.data);
                            let index = vm.articleSurveys.length - 1;

                            this.survey.answers.forEach(function (value, key)
                            {
                                vm.handleSurveyAnswers(survey, value, index);
                            });
                        }

                        vm.closeAddSurvey();
                    });
            },

            //Update a survey
            updateSurvey()
            {
                let vm = this;

                Api.http
                    .put(`/surveys/${this.survey.id}`, {question: this.survey.question})
                    .then((response) =>
                    {
                        if(response.status === 200)
                        {
                            let survey = response.data;

                            vm.articleSurveys[vm.editedSurveyKey] = response.data;

                            this.survey.answers.forEach(function (value, key)
                            {
                                vm.handleSurveyAnswers(survey, value, vm.editedSurveyKey);
                            });
                        }

                        vm.editedSurveyKey = null;
                        vm.closeAddSurvey();
                    });
            },

            //Handle the survey answers
            handleSurveyAnswers(survey, answer, key)
            {
                if(answer.id)
                {
                    this.updateSurveyAnswers(survey, answer, key);
                }
                else
                {
                    this.createSurveyAnswers(survey, answer, key);
                }
            },

            //Create survey answers
            createSurveyAnswers(survey, answer, key)
            {
                Api.http.post(`/surveys/${survey.id}/survey-answers`,
                    {
                        answer: answer.answer
                    })
                    .then(response => {
                        vm.articleSurveys[key].answers.push(response.data);
                    });
            },

            //Update the survey answers
            updateSurveyAnswers(survey, answer, key)
            {
                Api.http.put(`/surveys/${survey.id}/survey-answers/${answer.id}`,
                    {
                        answer: answer.answer
                    })
                    .then(response => {
                        vm.articleSurveys[key].answers.push(response.data);
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

            //Confirm the deletion of an item
            confirmDelete(key)
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
                    this.deleteSurvey(key)
                }).catch(swal.noop);
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
            saveArticleSurveys(articleId)
            {
                let vm = this;

                this.articleSurveys.forEach(function (value, key)
                {
                    if(! (vm.articleSurveys[key].linked && articleId === vm.articleId))
                    {
                        Api.http
                            .put(`/articles/${articleId}/surveys/${vm.articleSurveys[key].id}`)
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

            //Duplicate the data based on the article id
            duplicateData(articleId)
            {
                this.saveArticleSurveys(articleId);
            }
        }
    }
</script>

<style>

</style>