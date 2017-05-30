<template>
    <div>
        <page-title title="Idea Show" sub="sub heading"/>

        <form>
            <div class="form-body">
                <div class="form-group">
                    <label for="title"><strong>Title</strong></label>
                    <div id="title">
                        <div class="form-control-static">{{ idea.title }}</div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="body"><strong>Idea</strong></label>
                    <div id="body">
                        <div class="form-control-static" v-for="line in bodyLines">{{ line }}</div>
                    </div>
                </div>
            </div>
        </form>

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
</template>

<script>
    export default {
        data() {
            return {
                idea: {},
            }
        },

        mounted() {
            axios
                .get(`https://api-naut.livesystems.ch/ideas/${this.$route.params.id}`)
                .then(response => this.idea = response.data)
                .catch(err => console.log('Show some error message here'));
        },

        computed: {
            hasArticles() {
                return this.idea.hasOwnProperty('articles') && this.idea.articles.length > 0;
            },

            bodyLines() {
                return this.idea.hasOwnProperty('body') ? this.idea.body.split('\n').filter(el => el !== '') : [];
            }
        }
    }
</script>

<style scoped>
    .form-control-static {
        display: block;
    }
</style>
