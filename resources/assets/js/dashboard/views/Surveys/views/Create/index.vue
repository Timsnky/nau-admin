<template>
    <div class="row">
        <page-title title="Umfragen" sub="Erstellen" />

        <div class="col-md-6">
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="question">Frage</label>
                    <input
                        id="question"
                        type="text"
                        v-model="survey.question"
                        placeholder="Frage"
                        class="form-control">
                </div>

                <label>Antworten</label>
                <div v-for="answer, key in survey.answers" class="form-group">

                    <div class="input-group">
                        <input type="text" v-model="survey.answers[key].answer" placeholder="Antwort" class="form-control">
                        <span class="input-group-btn">
                            <button class="btn btn-danger" type="button" @click="removeAnswer(answer)">
                                <i class="fa fa-times"></i>
                            </button>
                        </span>
                    </div>
                </div>

                <div class="form-group" v-show="survey && survey.answers.length <= 5">
                    <button type="button" class="btn btn-block btn-primary" @click="addAnswer"><i class="fa fa-plus"></i></button>
                </div>

                <div class="form-actions">
                    <button class="btn btn-primary" type="submit">Erstellen</button>
                    <router-link class="btn btn-danger" :to="{name: 'surveys.list'}">Abbrechen</router-link>
                </div>
            </form>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                survey: {
                    question: '',
                    answers: [
                        {answer: ''},
                        {answer: ''},
                        {answer: ''},
                    ],
                },
            }
        },

        mounted() {

        },

        methods: {
            handleSubmit() {
                Api.http
                    .post(`/surveys`, {question: this.survey.question})
                    .then((response) => {
                        var survey = response.data;

                        $.each(this.survey.answers, (key, answer) => {
                            // Add answers
                            Api.http.post(`/surveys/${survey.id}/survey-answers`, { answer: answer.answer });
                        });

                        // Redirect
                        this.$router.push({name: 'surveys.list'});
                    });
            },

            addAnswer() {
                var answer = {
                    id: null,
                    answer: '',
                };

                this.survey.answers.push(answer);
            },

            removeAnswer(answer) {
                this.survey.answers.splice(this.survey.answers.indexOf(answer), 1);
            },
        }
    }
</script>
