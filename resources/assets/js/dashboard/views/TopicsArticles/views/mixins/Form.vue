<template>
    <div>
        <div class="row">

            <div class="col-md-6">
                <page-title :title="pageTitle"/>

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

                    <div class="form-group">
                        <label>Autors</label>
                        <multiselect
                        v-model="article.authors"
                        :options="authors.list"
                        placeholder="Type to search author"
                        label="name"
                        :max-height="500"
                        :clear-on-select="false"
                        :close-on-select="false"
                        track-by="id"
                        :multiple="true"
                        open-direction="bottom"
                        :internal-search="false"
                        @search-change="searchAuthors"
                        @remove="removeAuthor"
                        @select="addAuthor"
                    >
                    </multiselect>
                </div>

                <div class="form-body">
                    <div class="form-group">
                        <label for="time">Uhrzeit</label>
                        <input
                        id="time"
                        type="text"
                        name="time"
                        v-model.trim="time"
                        placeholder="10:50"
                        class="form-control">
                    </div>
                </div>

                <div class="form-group">
                    <label>Channel</label>
                    <select class="form-control" v-model="article.channel.id">
                        <option v-bind:value="channel.id" v-for="channel in channels">
                            {{ channel.display_name }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="mt-checkbox no_margin_bottom">
                        <input type="checkbox" v-model="article.dooh.should_include_video" @change="resetArticleRegions()" value="true"> Sollte ein Dooh Video enthalten
                        <span></span>
                    </label>
                </div>

                <div class="form-actions">
                    <button
                        class="btn blue"
                        type="submit"
                        :disabled="!article.title">
                        {{ submitLabel }}
                    </button>
                </div>
            </form>

        </div>
        <div class="col-md-6">
            <page-title title="Artikel verschieben"/>
            <mover v-model="newTopic" :article-id="article.id" :current-topic-id="topicId"></mover>

            <div class="form-group">
                <button class="btn blue" @click="moveArticle" :disabled="!(newTopic && newTopic.id)">Verschieben</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import Mover from '../components/ArticleMover';

    export default {
        data() {
            return {
                pageTitle: '',
                submitLabel: '',
                channels: [],
                newTopic: null,
                authors: {
                    list: [],
                    removed: [],
                    new: [],
                },
                time: '',
                date: this.$route.query.date,
                article: {
                    title: '',
                    channel: {
                        id: null
                    },
                    published_at: null,
                    dooh: {
                        should_include_video: false,
                    }
                }
            };
        },

        watch: {
            time(value) {
                var publishedAt = moment(this.date);
                publishedAt.hour(value.split(':')[0]);
                publishedAt.minute(value.split(':')[1]);

                this.article.published_at = publishedAt;
            }
        },

        computed: {
            topicId() {
                return this.$route.params.topicID;
            }
        },

        created() {
            this.initializeChannels();
        },

        methods: {
            initializeChannels() {
                return Api.http.get(`/channels`)
                .then((response) => {
                    this.channels = response.data

                    return response.data;
                });
            },

            addAuthor(author) {
                this.authors.new.push(author);
            },

            removeAuthor(author) {
                this.authors.removed.push(author);
            },

            moveArticle() {
                if(!this.newTopic.id) {
                    return false;
                }

                Promise.all([
                    Api.http.delete(`/topics/${this.topicId}/articles/${this.article.id}`),
                    Api.http.put(`/topics/${this.newTopic.id}/articles/${this.article.id}`),
                ]).then(() => {
                    Vue.toast('Artikel verschoben.', {
                        className : ['nau_toast','nau_success'],
                    });
                    this.$router.push({name: 'resources.day', params: { date: this.date }})
                }).catch((error) => {
                    console.error(error);
                    Vue.toast('Artikel konnte nicht verschoben werden.', {
                        className : ['nau_toast','nau_warning'],
                    });
                })
            },

            searchAuthors: _.debounce(function (query) {
                if(!query) {
                    return false;
                }

                Api.http
                    .get(`/authors?search=${query}`)
                    .then(response => {
                        this.authors.list = response.data;
                    });
            }, 500),
        },

        components: {
            Mover,
        }
    }
</script>
