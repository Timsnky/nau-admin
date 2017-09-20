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
                            <label for="body">Channel</label>
                            <div id="channel">
                                <div class="form-control-static">{{ ideaChannel }}</div>
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
                <div class="row col-md-12">
                    <label for="body">Images</label><br>
                </div>
                <div class="row">
                    <div class="col-md-4 col-sm-12 idea_images_section" v-for="(image, index) in idea.images">
                        <img :src="image.url" alt="">
                    </div>
                </div>
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
            },
            ideaChannel()
            {
                if(this.idea.channel)
                {
                    return this.idea.channel.display_name;
                }
                return '';
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

    .idea_images_section {
        padding: 20px;
    }

    .idea_images_section img {
        max-height: 240px;
    }
</style>
