<template>
    <div class="flex article-row">
        <div class="flex-item time">
            <span v-if="moment(article.published_at).isValid()">
                <i class="fa fa-clock-o" aria-hidden="true"></i> {{ moment(article.published_at).format('HH:mm') }}
            </span>
            <dooh-video-status :dooh="article.dooh" />
            <i
                v-if="article.should_include_livestream"
                :class="{fa: true, 'fa-bolt': true, 'font-yellow-gold': true}"
                title="Livestream Artikel"
            ></i>
            <status-display class="pull-right" :status="article.article_status.name" />
        </div>
        <div class="flex-item article">
            <div>
                <router-link :to="{name: 'articles.edit', params: { id: article.id }}">{{ article.title }}</router-link>
                <small v-if="article.authors.length > 0">
                    – {{ article.authors.map((author) => {return author.name}).join(', ') }}

                    <span class="informants" v-if="article.informants.length">
                        / {{ article.informants.map((author) => {return author.name}).join(', ') }}
                    </span>
                </small>
            </div>
        </div>
        <div class="flex-item options text-right btn-group">
            <router-link
            :to="{name: 'topics.articles.edit', params: { topicID: topic.id, articleID: article.id }, query: { date }}"
            class="btn btn-sm default">
                <span class="fa fa-edit"></span> Bearbeiten
            </router-link>
            <button v-if="Api.isChefJournalist() || Api.isAdmin()" @click="unlinkArticle(topic, article)" class="btn red btn-sm"><i class="fa fa-trash"></i></button>
        </div>
    </div>
</template>

<script>
    import ArticleStatus from 'dashboard/components/StatusDisplay';
    import DoohVideoStatus from 'dashboard/components/DoohVideoStatus';

    export default {
        data() {
            return {
                date: this.$route.params.date,
            }
        },

        props: [
            'article',
            'topic',
        ],

        components: {
            ArticleStatus,
            DoohVideoStatus
        },

        computed: {
            Api() {
                return Api;
            },
        },

        methods: {
            moment(date, format) {
                return moment(date, format);
            },

            async unlinkArticle(topic, article) {
                await swal({
                    title: 'Sind sie sicher?',
                    text: "Artikel von diesem Tag entfernen.",
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Abbrechen',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ja, entfernen.'
                });

                topic.articles.splice(topic.articles.indexOf(article), 1)

                var response = await Api.http.delete(`/topics/${topic.id}/articles/${article.id}`)

                Vue.toast('Artikel wurde entfernt', {
                    className : ['nau_toast','nau_success'],
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .flex {
        display: flex;
        align-items: center;
    }

    .article-row {
        // font-size: .8em;
    }

    .flex-item {
        padding: 0 15px;

        &.time {
            width: 210px;
        }

        &.article {
            flex-grow: 1;
        }

        &.options {
            //
        }
    }
</style>
