<template>
    <div>
        <h2
            v-if="!isLoaded"
            class="text-center">
            Loading...
        </h2>

        <div v-else class="row">
            <div class="col-md-4">
                <h3>Schichten</h3>

                <table class="table table-condensed table-hover">
                    <thead>
                        <tr>
                            <th>Schicht</th>
                            <th>Zuweisung</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="shift in day.shifts">
                            <td>{{ shift.name }}</td>
                            <td><span v-if="shift.assigned">{{ shift.assigned.name }}</span></td>
                            <td>
                                <router-link
                                    :to="{name: 'shifts.associate', params: { id: shift.id }}"
                                    class="btn btn-xs default pull-right">
                                    <span v-if="shift.assigned"><i class="fa fa-user"></i> Ändern</span>
                                    <span v-else><i class="fa fa-user"></i> Zuweisen</span>
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>


                    <!-- <li
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
                            class="btn btn-xs default pull-right">
                            <i class="fa fa-user"></i> Zuweisen
                        </router-link>
                    </li> -->

            </div>
            <div class="col-md-8">
                <h3 class="title">
                    Themen am {{ moment(date).format('DD.MM.YYYY') }}
                    <div class="pull-right">
                        <small class="" v-if="foldermaster">Foldermaster: {{ foldermaster.name }}</small>
                        <router-link
                            :to="{name: 'topics.create', query: { date }}"
                            class="btn btn-sm blue">
                            <i class="fa fa-plus"></i> Thema erstellen
                        </router-link>
                    </div>
                </h3>

                <div v-for="(topic, index) in day.topics" class="topic">
                    <h4>
                        <router-link class="topic-title-wrapper" :to="{name: 'topics.edit', params: {id: topic.id}}">
                            <span class="topic-title">{{ topic.name }}</span> <i class="fa fa-edit"></i>
                        </router-link>

                        <div class="pull-right actions">
                            <router-link
                                :to="{name: 'topics.articles.create', params: { topicID: topic.id }, query: { date }}"
                                class="btn btn-xs blue">
                                <i class="fa fa-plus"></i> Neuen Artikel erstellen
                            </router-link>

                            <router-link
                                :to="{name: 'topics.articles.link', params: { topicID: topic.id }, query: { date }}"
                                class="btn btn-xs blue">
                                <i class="fa fa-newspaper-o"></i> Bestehenden Artikel hinzufügen
                            </router-link>
                        </div>

                        <table class="table table-condensed table-hover">
                            <thead>
                                <tr>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(article, index) in topic.articles">
                                    <td>
                                        <article-item :article="article" :topic="topic" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </h4>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import ArticleItem from './components/ArticleItem';

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

        components: {
            ArticleItem
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
        }
    }
</script>

<style lang="scss" scoped>
    .title {
        margin-bottom: 2em;
    }

    .topic {
        .topic-title-wrapper {
            .fa {
                display: none;
            }

            &:hover .fa {
                display: inline;
            }

            .topic-title {
                font-weight: bold;
                color: #4B77BE;
            }
        }
    }
</style>
