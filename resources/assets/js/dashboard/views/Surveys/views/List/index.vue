<template>
    <div>
        <survey-select-modal></survey-select-modal>

        <page-title title="Umfragen" sub="Liste" />

        <div class="row">
            <div class="col-xs-12 text-right">
                <router-link
                    :to="{name: 'surveys.create'}"
                    class="btn btn-primary pull-right">
                    Erstellen
                </router-link>

                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#surveySelectionModal">
                    Umfrage auswählen
                </button>
            </div>
        </div>

        <table class="table table-hover table-bordered">
            <thead>
            <tr>
                <th>Frage</th>
                <th>Erstellt</th>
                <th>Aktionen</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="survey in surveys">
                    <td>{{ survey.question }}</td>
                    <td>{{ formatDate(survey.created_at) }}</td>
                    <td>
                        <router-link
                            :to="{name: 'surveys.edit', params: {id: survey.id}}"
                            class="btn btn-warning">
                            Bearbeiten
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>

        <pagination
            class="pull-right"
            :items="surveys"
            :currentPage="currentPage"
            :pagesCount="pagesCount"
            :itemsPerPage="itemsPerPage"
            @navigate="navigate"/>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                surveys: [],
                currentPage: 1,
                pagesCount: 1,
                itemsPerPage: 15,
                searchTerm: ''
            }
        },

        created() {
            Api.http
                .get('/surveys')
                .then(response => {
                    const { data, current_page, per_page, last_page } = response.data;

                    this.surveys = data;
                    this.currentPage = current_page;
                    this.itemsPerPage = per_page;
                    this.pagesCount = last_page;
                });
        },

        methods: {
            formatDate(date) {
                return moment(date).format('DD.MM.YYYY');
            },

            getData(page) {
                if (this.searchTerm !== '') {
                    return Api.http.get(`/surveys?search=${this.searchTerm}&page=${page}`);
                }

                return Api.http.get(`/surveys?page=${page}`);
            },

            navigate(page) {
                this.getData(page)
                    .then(response => {
                        const { data, current_page, last_page } = response.data;

                        this.surveys = data;
                        this.currentPage = current_page;
                        this.pagesCount = last_page;
                    });
            },
        }
    }
</script>
