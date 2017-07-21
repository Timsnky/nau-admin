<template>
    <div>
        <page-title title="Umfragen" sub="Liste" />

        <div class="row">
            <div class="col-xs-12 text-right">
                <router-link
                    :to="{name: 'surveys.create'}"
                    class="btn btn-primary pull-right">
                    Erstellen
                </router-link>
            </div>
        </div>


        <div class="table-scrollable">
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
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                surveys: [],
            }
        },

        created() {
            Api.http
                .get('/surveys')
                .then(response => {
                    this.surveys = response.data;
                })
                .catch(err => {
                    console.log('Show some error message here');
                });
        },

        components: {

        },

        methods: {
            formatDate(date) {
                return moment(date).format('DD.MM.YYYY');
            }
        }
    }
</script>
