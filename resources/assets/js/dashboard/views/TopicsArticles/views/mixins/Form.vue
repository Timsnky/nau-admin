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
                        <label for="time">Geplante Uhrzeit</label>
                        <date-time format="HH:mm" placeholder="Uhrzeit" v-model="plannedDate"></date-time>
                    </div>
                </div>

                <div class="form-body">
                    <div class="form-group">
                        <label for="time">Publikationsdatum</label>
                        <date-time format="DD.MM.YYYY HH:mm" placeholder="Publikationsdatum" v-model="article.published_at"></date-time>
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
                        <input type="checkbox" v-model="article.dooh.should_include_video" value="true"> Sollte ein Dooh Video enthalten
                        <span></span>
                    </label>
                </div>

                <div class="form-group">
                    <label class="mt-checkbox no_margin_bottom">
                        <input type="checkbox" v-model="article.should_include_livestream" value="true"> Sollte einen Livestream beinhalten
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
    import DateTime from 'dashboard/components/DateTime';

    export default {
        data() {
            return {
                plannedDateValue: null,
                pageTitle: '',
                submitLabel: '',
                channels: [],
                date: moment(this.$route.query.date),
                newTopic: null,
                authors: {
                    list: [],
                    removed: [],
                    new: [],
                },
                articleTopic: {
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
                },
            };
        },

        computed: {
            topicId() {
                return this.$route.params.topicID;
            },

            plannedDate: {
                get() {
                    if(!this.plannedDateValue || !this.plannedDateValue.isValid()) {
                        return false;
                    }

                    return this.plannedDateValue;
                },
                set(value) {
                    if(value && value.isValid()) {
                        console.log(value);
                        value = value.clone();
                        value.date(this.date.date());
                        value.month(this.date.month());
                        value.year(this.date.year());
                    }

                    this.plannedDateValue = value;
                }
            },

            article: {
                get() {
                    return this.articleTopic.article;
                },
                set(value) {
                    this.articleTopic.article = value;
                }
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

                let promises = [
                    Api.http.put(`/article-topics/${this.articleTopic.id}`, {
                        topic_id: this.newTopic.id,
                    }),
                ];

                if(this.article.published_at) {
                    var publishedAt = moment(this.article.published_at);
                    var dateOfNewTopic = moment(this.newTopic.date);

                    publishedAt.day(dateOfNewTopic.day());
                    publishedAt.month(dateOfNewTopic.month());
                    publishedAt.year(dateOfNewTopic.year());
                    promises.push(Api.http.put(`/articles/${this.article.id}`, {published_at: publishedAt.format()}));
                }

                Promise.all(promises).then(() => {
                    Vue.toast('Artikel verschoben.', {
                        className : ['nau_toast','nau_success'],
                    });
                    this.$router.push({name: 'resources.day', params: { date: this.date.format('YYYY-MM-DD') }})
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
            }, 200),
        },

        components: {
            Mover,
            DateTime,
        }
    }
</script>
