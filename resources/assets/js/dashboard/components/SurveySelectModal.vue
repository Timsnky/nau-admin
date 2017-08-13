<template>
    <div class="modal fade" id="surveySelectionModal" tabindex="-1" role="dialog" aria-labelledby="surveySelectionModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal_title_bar">
                        <h4 class="modal-title" id="myModalLabel">Surveys</h4>
                        <button type="button" class="btn btn-primary btn-sm add_btn" :disabled="addingSurvey" @click="showAddSurvey()"><i class="fa fa-plus"></i></button>
                        <button type="button" class="btn btn-danger btn-sm close_btn" @click="closeModal()"><i class="fa fa-close"></i></button>
                    </div>
                </div>
                <div class="modal-body">
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

                    <div v-if="! addingSurvey">
                        <div class="row image_selection_filters">
                            <div class="col-md-6">
                                <div v-if="surveys.length > 0 || searchTerm !== ''" class="input-icon">
                                    <i class="fa fa-search"></i>
                                    <input
                                    type="search"
                                    class="form-control"
                                    placeholder="Search"
                                    name="searchTerm"
                                    v-model.trim="searchTerm">
                                </div>
                            </div>
                        </div>

                        <h2 v-if="!isLoaded" class="text-center">Loading...</h2>

                        <div v-else-if="surveys.length > 0">
                            <div class="row">
                                <table class="table table-hover table-bordered table-scrollable">
                                    <tbody>
                                    <tr v-for="(survey, index) in surveys">
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
                                                        class="btn btn-primary btn-sm remove_btn"
                                                        type="button"
                                                        @click="dispatchSelected(survey.id)">
                                                    Select
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
                            <!--<div class="row image_selection_rows">-->
                                <!--<div v-for="survey in surveys" class="col-md-6 survey_section">-->
                                    <!--<a @click.prevent="dispatchSelected(survey.id)" href="#"><h5>{{ survey.question }}</h5></a>-->
                                    <!--<ul>-->
                                        <!--<li v-for="answer in survey.answers">{{ answer.answer }}</li>-->
                                    <!--</ul>-->
                                <!--</div>-->
                            <!--</div>-->

                            <div class="clearfix">
                                <pagination
                                class="pull-right"
                                :currentPage="currentPage"
                                :pagesCount="pagesCount"
                                :itemsPerPage="itemsPerPage"
                                @navigate="navigate"/>
                            </div>
                        </div>

                        <h2 v-if="surveys.length === 0" class="text-center">Keine Umfragen gefunden</h2>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                surveys: [],
                isLoaded: false,
                currentPage: 1,
                pagesCount: 1,
                itemsPerPage: 4,
                searchTerm: '',
                myUserId : 0,
                addingSurvey: false,
                survey: {
                    question: '',
                    answers: [
                        {
                            answer: '',
                            id: null
                        },
                        {
                            answer: '',
                            id: null
                        },
                    ]
                },
                editedSurveyKey: null,
                savedAnswers: 0,
            }
        },

        mounted() {
            this.getPaginatedData(this.currentPage)
            .then(response => {
                const { data, current_page, per_page, last_page } = response.data;

                this.surveys = data;
                this.currentPage = parseInt(current_page);
                this.itemsPerPage = parseInt(per_page);
                this.pagesCount = last_page;
                this.isLoaded = true;
            })
            .catch(err => {
                Vue.toast('Fehler beim laden der Umfragen. Versuchen Sie es später nocheinmal', {
                    className : ['nau_toast','nau_warning'],
                });
                this.isLoaded = true;
            });
        },

        watch: {
            searchTerm() {
                this.navigate(1);
            },
        },

        computed: {
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

        methods: {
            navigate(page) {
                this.isLoaded = false;
                this.getPaginatedData(page)
                .then(response => {
                    const { data, current_page, last_page, from } = response.data;

                    this.surveys = data;
                    this.currentPage = current_page;
                    this.pagesCount = last_page;
                    this.isLoaded = true
                })
                .catch(err => {
                    Vue.toast('Error in retreiving the Videos. Please retry again', {
                        className : ['nau_toast','nau_warning'],
                    });
                });
            },

            getPaginatedData(page) {
                var searchString = '';

                if (this.searchTerm !== '') {
                    searchString += `search=${this.searchTerm}&`;
                }

                return Api.http.get(`/surveys?` + searchString +  `page=${page}&per_page=${this.itemsPerPage}`);
            },

            dispatchSelected(id) {
                Api.setSurvey(id);
                this.reset();
                $('#surveySelectionModal').modal('hide');
            },

            reset()
            {
                this.searchTerm = '';
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
                            answer: '',
                            id: null
                        },
                        {
                            answer: '',
                            id: null
                        },
                        {
                            answer: '',
                            id: null
                        }
                    ]
                }
            },

            //Close the survey modal
            closeModal()
            {
                this.closeAddSurvey();
                $('#surveySelectionModal').modal('hide');
            },

            //Add an answer
            addAnswer()
            {
                this.survey.answers.push({'answer' : '', 'id': null});
            },

            //Remove an answer
            removeAnswer(key)
            {
                if(this.survey.answers[key].id)
                {
                    this.confirmAnswerDelete(key);
                }
                else
                {
                    this.survey.answers.splice(key, 1);
                }
            },

            //Confirm the deletion of an item
            confirmAnswerDelete(key)
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
                    this.deleteSurveyAnswer(key)
                }).catch(swal.noop);
            },

            //Delete an answer
            deleteSurveyAnswer(key)
            {
                Api.http
                    .delete(`/survey-answers/${this.survey.answers[key].id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            this.survey.answers.splice(key, 1);
                            Vue.toast('Article survey detached successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                    });
            },

            //Edit a survey
            startEditSurvey(key)
            {
                this.survey = this.surveys[key];
                this.addingSurvey = true;
                this.editedSurveyKey = key;
            },

            //Save a survey record
            saveSurvey()
            {
                let vm = this;
                this.savedAnswers = this.survey.answers.length;

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
                            vm.surveys.push(response.data);
                            let index = vm.surveys.length - 1;

                            this.survey.answers.forEach(function (value, key)
                            {
                                vm.surveys[index].answers.push(value);
                                vm.handleSurveyAnswers(survey, value, index, key);
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

                            survey.answers = [];
                            vm.surveys[vm.editedSurveyKey] = survey;

                            this.survey.answers.forEach(function (value, key)
                            {
                                vm.surveys[vm.editedSurveyKey].answers.push(value);
                                vm.handleSurveyAnswers(survey, value, vm.editedSurveyKey, key);
                            });
                        }

                        vm.editedSurveyKey = null;
                        vm.closeAddSurvey();
                    });
            },

            //Handle the survey answers
            handleSurveyAnswers(survey, answer, key, answerKey)
            {
                if(answer.id)
                {
                    this.updateSurveyAnswers(survey, answer, key, answerKey);
                }
                else
                {
                    this.createSurveyAnswers(survey, answer, key, answerKey);
                }
            },

            //Create survey answers
            createSurveyAnswers(survey, answer, key, answerKey)
            {
                Api.http.post(`/surveys/${survey.id}/survey-answers`,
                    {
                        answer: answer.answer
                    })
                    .then(response => {
                        this.surveys[key].answers[answerKey].id = response.data.id;

                        this.savedAnswers --;

                        if(this.savedAnswers === 0)
                        {
                            this.navigate(1);
                        }
                    });
            },

            //Update the survey answers
            updateSurveyAnswers(survey, answer, key, answerKey)
            {
                Api.http
                    .delete(`/survey-answers/${answer.id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            this.createSurveyAnswers(survey, answer, key, answerKey);
                        }
                    });
            }
        }
    }
</script>

<style>
    .swal2-container {
        z-index: 100000;
    }
</style>
