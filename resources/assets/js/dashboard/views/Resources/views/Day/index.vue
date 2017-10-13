<template>
    <div>
        <page-title title="Resource Management" sub="Day View" />

        <h2
            v-if="!isLoaded"
            class="text-center">
            Loading...
        </h2>

        <div v-else class="row">
            <div class="col-md-4">
                <div class="portlet light bordered">
                    <div class="portlet-title">
                        <div class="caption">
                            <span class="caption-subject bold uppercase">Schichten</span>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <ul
                            class="list-group"
                            v-if="day.shifts.length > 0">
                            <li
                                class="list-group-item clearfix"
                                v-for="(shift, index) in day.shifts"
                                v-if="shift.assigned"
                                :key="index">
                                {{ shift.name }} : {{ shift.assigned.name }}
                                <router-link
                                    :to="{name: 'shifts.associate', params: { id: shift.id }}"
                                    class="btn btn-xs btn-warning pull-right">
                                    Bearbeiten
                                </router-link>
                            </li>
                            <li
                                class="list-group-item clearfix"
                                v-for="(shift, index) in day.shifts"
                                v-if="!shift.assigned"
                                :key="index">
                                {{ shift.name }}
                                <router-link
                                    :to="{name: 'shifts.associate', params: { date, id: shift.id }}"
                                    class="btn btn-xs btn-info pull-right">
                                    Zuweisen
                                </router-link>
                            </li>
                        </ul>
                        <h4
                            v-else
                            class="text-center">
                            Keine Schichten gefunden
                        </h4>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="portlet light bordered">
                    <div class="portlet-title">
                        <div class="caption">
                            <span class="caption-subject bold uppercase">Themen am {{ moment(date).format('DD.MM.YYYY') }}</span><br>
                            <small v-if="foldermaster">Foldermaster: {{ foldermaster.name }}</small>
                        </div>
                        <div class="tools">
                            <a href="javascript:;" class="fullscreen" data-original-title="" title="" @click="toggleFullscreen()"> </a>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div
                            v-if="day.topics.length > 0"
                            v-for="(topic, index) in day.topics"
                            class="panel panel-default">
                            <div class="panel-heading clearfix">
                                <h3 class="panel-title">{{ topic.name }} <router-link class="pull-right" :to="{name: 'topics.edit', params: {id: topic.id}}">
                                <button type="button" class="btn btn-warning btn-sm"><span class="fa fa-edit"></span> Bearbeiten</button></router-link></h3>
                            </div>
                            <div class="panel-body">
                                <div v-if="topic.articles.length > 0">
                                    <div class="row center" v-for="(article, index) in topic.articles">
                                        <div class="col-sm-2">
                                            <span v-if="moment(article.published_at).isValid()">
                                                <i class="fa fa-clock-o" aria-hidden="true"></i> {{ moment(article.published_at).format('HH:mm') }}
                                            </span>
                                            <i v-if="article.dooh.should_include_video && article.dooh.video_id === null" title="Dooh Video fehlt" class="text-danger fa fa-film"></i>
                                        </div>
                                        <div class="col-sm-7">
                                            <h4>
                                                <router-link :to="{name: 'articles.edit', params: { id: article.id }}">{{ article.title }}</router-link>
                                                <small v-if="article.authors.length > 0">
                                                    – {{ article.authors.map((author) => {return author.name}).join(', ') }}
                                                </small>
                                            </h4>
                                        </div>
                                        <div class="col-sm-3 text-right">
                                            <router-link
                                                :to="{name: 'topics.articles.edit', params: { topicID: topic.id, articleID: article.id }, query: { date }}"
                                                class="btn btn-xs btn-warning">
                                                <span class="fa fa-edit"></span> Bearbeiten
                                            </router-link>
                                            <button v-if="Api.isChefJournalist() || Api.isAdmin()" @click="unlinkArticle(topic, article)" class="btn btn-danger btn-xs"><i class="fa fa-trash"></i> Entfernen</button>
                                        </div>
                                    </div>
                                </div>

                                <h4
                                    v-else
                                    class="text-center">
                                    Keine Artikel gefunden
                                </h4>

                                <router-link
                                    :to="{name: 'topics.articles.create', params: { topicID: topic.id }, query: { date }}"
                                    class="btn btn-primary">
                                    <i class="fa fa-newspaper-o"></i> Artikel hinzufügen
                                </router-link>
                            </div>
                        </div>

                        <h4
                            v-else
                            class="text-center">
                            Keine Themen gefunden
                        </h4>

                        <router-link
                            :to="{name: 'topics.create', query: { date }}"
                            class="btn btn-primary">
                            <i class="fa fa-plus"></i> Thema hinzufügen
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                date: this.$route.params.date,
                fullscreen: false,
                day: {
                    shifts: [],
                    topics: [],
                },
                isLoaded: false,
            };
        },

        computed: {
            Api() {
                return Api;
            },
            foldermaster() {
                return this.$store.state.foldermaster;
            }
        },

        created() {
            Api.http
                .get(`/resources/overview/${this.date}`)
                .then(response => {
                    this.day = response.data;
                    this.isLoaded = true;
                })
                .catch(err => {
                    this.isLoaded = true;
                    console.log('Show some error message here');
                });
        },

        mounted() {
            if(this.$route.query.fullscreen == 'true') {
                this.toggleFullscreen();
                setTimeout(() => {
                    $(this.$el).find('.fullscreen').click();
                }, 1500);
            }
        },

        methods: {
            moment(date, format) {
                return moment(date, format);
            },

            toggleFullscreen() {
                this.fullscreen = !this.fullscreen;
                this.$router.push({ query: { fullscreen: this.fullscreen }})
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
    .portlet-fullscreen {
        * {
            font-size: 3rem;
        }

        .btn {
            display: none;
        }
    }

    .center { // add a new class to your row and target your newest class
        display: flex;
        align-items: center;
    }
</style>
