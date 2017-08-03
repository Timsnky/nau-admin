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
                                    :disabled="! survey.question || survey.answers.length == 0">
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
                            <div class="row image_selection_rows">
                                <div v-for="survey in surveys" class="col-md-6 survey_section">
                                    <a @click.prevent="dispatchSelected(survey.id)" href="#"><h5>{{ survey.question }}</h5></a>
                                    <ul>
                                        <li v-for="answer in survey.answers">{{ answer.answer }}</li>
                                    </ul>
                                </div>
                            </div>

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
                itemsPerPage: 10,
                searchTerm: '',
                myUserId : 0,
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
                        {
                            answer: ''
                        }
                    ]
                }
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
            disableSaveArticle()
            {
                if(this.survey.question === '')
                {
                    return true;
                }


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

            reset() {
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

            //Close the survey modal
            closeModal()
            {
                this.closeAddSurvey();
                $('#surveySelectionModal').modal('hide');
            },

            //Add an answer
            addAnswer()
            {
                this.survey.answers.push({'answer' : ''});
            },

            //Remove an answer
            removeAnswer(key)
            {
                this.survey.answers.splice(key, 1);
            },

            //Save a survey record
            saveSurvey()
            {
                let vm = this;

                Api.http
                    .post(`/surveys`, {question: this.survey.question})
                    .then((response) =>
                    {
                        let survey = response.data;

                        this.survey.answers.forEach(function (value, key) {
                            Api.http.post(`/surveys/${survey.id}/survey-answers`,
                                {
                                    answer: value.answer
                                })
                                .then(response => {
                                    vm.closeAddSurvey();
                                    vm.navigate(1);
                                });
                        });
                    });
            }
        }
    }
</script>
