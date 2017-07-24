<template>
    <div>
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
                <div v-for="survey in surveys" class="col-md-6">
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
                myUserId : 0
            }
        },

        mounted() {
            this.getPaginatedData(this.currentPage)
                .then(response => {
                    const { data, current_page, per_page, last_page } = response.data;

                    this.surveys = data;
                    this.currentPage = current_page;
                    this.itemsPerPage = per_page;
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

        methods: {
            navigate(page) {
                this.getPaginatedData(page)
                    .then(response => {
                        const { data, current_page, last_page, from } = response.data;

                        this.surveys = data;
                        this.currentPage = current_page;
                        this.pagesCount = last_page;
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
                this.$emit('selected', id);
                this.reset();
                $('#surveySelectionModal').modal('hide');
            },

            reset() {
                this.searchTerm = '';
            }
        }
    }
</script>

<style>
    .image_selection_filters {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .image_selection_rows {
        padding-top: 10px;
        padding-bottom: 10px;
    }
</style>
