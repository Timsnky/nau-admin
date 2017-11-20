<template>
    <div>
        <page-title title="Artikel mit Thema verlinken"/>

        <div class="form-group">
            <article-dropdown v-model="article" :filter="filter"></article-dropdown>
        </div>

        <div class="form-actions">
            <button
                class="btn btn-primary"
                type="submit"
                :disabled="!article"
                @click="link">
                Verlinken
            </button>
        </div>
    </div>
</template>

<script>
    import ArticleDropdown from './components/ArticleDropdown';

    export default {
        data() {
            return {
                article: null,
                filter: {
                    date: this.$route.query.date,
                    nullable_date: true,
                }
            };
        },

        components: {
            ArticleDropdown,
        },

        methods: {
            link() {
                Api.http.post(`/article-topics`, {
                    article_id: this.article.id,
                    topic_id: this.$route.params.topicID,
                }).then((response) => {
                    this.$router.push({name: 'resources.day', params: { date: this.$route.query.date }})
                    Vue.toast('Artikel verlinkt.', {
                        className : ['nau_toast','nau_success'],
                    });
                })
            }
        }
    }
</script>
