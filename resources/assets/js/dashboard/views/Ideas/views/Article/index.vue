<template>
    <div>
        <page-title title="Ideas" sub="Artikel erstellen" />

        <h3>Artikel für Idee <b>{{ idea.title }}</b> erstellen</h3>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        v-model.trim="article.title"
                        placeholder="Artikel Titel"
                        class="form-control">
                </div>

                <div class="form-group">
                    <label for="lead">Spitzmarke</label>
                    <input
                        id="lead"
                        type="text"
                        v-model.trim="article.dateline"
                        placeholder="Artikel Spitzmarke"
                        class="form-control">
                </div>

                <div class="form-group">
                    <label for="lead">Lead</label>
                    <textarea
                        id="lead"
                        v-model="article.lead"
                        placeholder="Artikel Lead"
                        class="form-control"
                        rows="3"></textarea>
                </div>

                <div class="form-group">
                    <label for="lead">Publizierdatum</label>
                    <date-time v-model="article.published_at" format="DD.MM.YYYY HH:mm" />
                </div>

            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!article.title || !article.dateline || !article.lead">
                    Erstellen
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import DateTime from 'dashboard/components/DateTime';

    export default {
        data() {
            return {
                idea: {},
                article: {
                    title: '',
                    dateline: '',
                    lead: '',
                    published_at: '',
                }
            }
        },

        components: {
            dateTime: DateTime,
        },

        mounted() {
            Api.http
            .get(`/ideas/${this.$route.params.id}`)
            .then(response => this.idea = response.data)
        },

        methods: {
            handleSubmit() {
                const { title, dateline, published_at, lead } = this.article;


                if (title && lead) {
                    Api.http
                        .post(`/ideas/${this.idea.id}/articles`, {
                            title: title,
                            dateline: dateline,
                            lead: lead,
                            internal_title: title,
                            internal_dateline: dateline,
                            published_at: published_at.format('YYYY-MM-DD HH:mm:ss')
                        })
                        .then(response => this.$router.push(`/ideas/${this.idea.id}`))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },
        }
    }
</script>
