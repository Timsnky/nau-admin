<template>
    <div>
        <page-title title="Add Article" sub="Create"/>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="title">Titel</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        v-model.trim="article.title"
                        placeholder="Titel"
                        class="form-control">
                </div>
            </div>

            <div class="form-body">
                <div class="form-group">
                    <label for="lead">Lead</label>
                    <input
                        id="lead"
                        type="text"
                        name="lead"
                        v-model.trim="article.lead"
                        placeholder="Lead"
                        class="form-control">
                </div>
            </div>

            <div class="form-body">
                <div class="form-group">
                    <label for="dateline">Dateline</label>
                    <input
                        id="dateline"
                        type="text"
                        name="dateline"
                        v-model.trim="article.dateline"
                        placeholder="Add dateline"
                        class="form-control">
                </div>
            </div>

            <div class="form-body">
                <div class="form-group">
                    <label for="time">Uhrzeit</label>
                    <input
                        id="time"
                        type="text"
                        name="time"
                        v-model.trim="time"
                        placeholder="10:50 (kann nicht bearbeitet werden)"
                        class="form-control">
                </div>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!article.title || !article.dateline || !article.dateline">
                    Erstellen
                </button>
                <button
                    class="btn btn-default"
                    type="button"
                    @click="reset">
                    Reset
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                date: this.$route.query.date,
                time: '',
                article: {
                    title: '',
                    dateline: '',
                    lead: '',
                }
            };
        },

        methods: {
            handleSubmit() {
                const { title, lead, dateline } = this.article;

                if (title && lead && dateline) {
                    Api.http
                        .post(`/topics/${this.$route.params.topicID}/articles`, {
                            title,
                            lead,
                            dateline,
                            internal_title: title,
                            internal_dateline: dateline,
                            time: this.time
                        })
                        .then(response => this.$router.push({name: 'resources.day', params: { date: this.date }}))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.article = {
                    title: '',
                    dateline: '',
                    lead: ''
                }
            },
        },
    }
</script>
