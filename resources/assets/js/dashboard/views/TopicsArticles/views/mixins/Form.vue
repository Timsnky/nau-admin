<template>
    <div>
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
            class="btn btn-primary"
            type="submit"
            :disabled="!article.title">
            {{ submitLabel }}
        </button>
    </div>
</form>
</div>
</template>

<script>
    export default {
        data() {
            return {
                pageTitle: '',
                submitLabel: '',
                channels: [],
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
    }
</script>
