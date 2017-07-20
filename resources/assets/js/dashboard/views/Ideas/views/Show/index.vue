<template>
    <div>
        <page-title title="Idea"/>

        <div class="row">
            <div class="col-md-8">
                <form>
                    <div class="form-body">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <div id="title">
                                <div class="form-control-static">{{ idea.title }}</div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="body">Idea</label>
                            <div id="body">
                                <div class="form-control-static">{{ idea.body }}</div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div class="col-md-4">
                <router-link
                    :to="{name: 'ideas.articles.create', params: {id: idea.id}}"
                    class="btn btn-lg btn-block btn-primary">
                    Artikel erstellen
                </router-link>
                <div v-if="hasArticles">
                    <h2>Articles</h2>
                    <ul>
                        <li
                        v-for="article in idea.articles"
                        :key="article.id">
                        {{ article.title }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                idea: {},
            }
        },

        mounted() {
            Api.http
            .get(`/ideas/${this.$route.params.id}`)
            .then(response => this.idea = response.data)
            .catch(err => console.log('Show some error message here'));
        },

        computed: {
            hasArticles() {
                return this.idea.hasOwnProperty('articles') && this.idea.articles.length > 0;
            }
        }
    }
</script>

<style scoped>
    label {
        font-weight: 700;
    }

    .form-control-static {
        display: block;
        white-space: pre-line;
    }
</style>
