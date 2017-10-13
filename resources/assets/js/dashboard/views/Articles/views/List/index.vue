<template>
    <div>
        <page-title title="Artikel" />
        <div class="row">
            <div class="col-md-4">
                <div class="input-icon">
                    <i class="fa fa-search"></i>
                    <input
                        type="search"
                        class="form-control"
                        placeholder="Suche"
                        name="searchTerm"
                        v-model.trim="searchTerm">
                </div>
            </div>
            <div class="col-md-2">
                <div class="input-icon">
                    <i class="fa fa-filter"></i>
                    <select class="form-control" v-model="stateFilter">
                        <option :value="null">Alle</option>
                        <option v-for="state in states" :value="state.id">{{ state.name }}</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6 text-right">
                <router-link
                    :to="{name: 'articles.create'}"
                    class="btn btn-primary pull-right">
                    <i class="fa fa-plus"></i>
                    Neuen Artikel erstellen
                </router-link>
            </div>
        </div>

        <table class="table table-hover">
            <thead>
            <tr>
                <th>Titel</th>
                <th>Autor</th>
                <th>Status</th>
                <th>Publikationsdatum</th>
                <th>Optionen</th>
            </tr>
            </thead>
            <tbody>
            <tr
                :class="{danger: article.publish_failed, info: article.article_status.name === 'queued'}"
                v-for="article in articles"
                :key="article.id">
                <td>
                    <i v-if="article.publish_failed" class="fa fa-exclamation-triangle"></i>
                    {{ article.title }}
                </td>
                <td>{{ article.authors.map(function(a) {return a.name}).join(', ') }}</td>
                <td>
                    <status-display :status="article.article_status.name" />
                </td>
                <td>{{ moment(article.published_at).isValid() ? moment(article.published_at).format('DD.MM.YY HH:mm') : '' }}</td>
                <td><router-link
                        :to="{name: 'articles.edit', params: {id: article.id}}"
                        class="btn btn-warning">
                    <i class="fa fa-edit"></i>
                    Bearbeiten
                </router-link>
                <router-link
                        :to="{name: 'articles.livetickers', params: {article: article.id}}"
                        class="btn btn-primary">
                    <i class="fa fa-paper-plane"></i>
                    Liveticker
                </router-link>
                <!-- <button v-if="article.published_at === null" class="btn btn-primary" @click="publishArticle(article)">Publish</button> -->
                <button v-if="article.article_status.name === 'published'" class="btn btn-danger" @click="unpublishArticle(article)"><i class="fa fa-undo"></i> Unpublish</button>
                <button v-if="Api.isChefJournalist() || Api.isAdmin()" class="btn btn-danger" @click="deleteArticle(article)"><i class="fa fa-trash"></i> Löschen</button>
                </td>
            </tr>
            </tbody>
        </table>

        <div class="clearfix">
            <pagination
                class="pull-right"
                :items="articles"
                :currentPage="currentPage"
                :pagesCount="pagesCount"
                :itemsPerPage="itemsPerPage"
                @navigate="navigate"/>
        </div>
    </div>
</template>
<script>
    import Pagination from 'dashboard/components/Pagination/Pagination';
    import ArticleStatus from 'dashboard/components/StatusDisplay';

    export default {
        data() {
            return {
                currentPage: 1,
                pagesCount: 1,
                itemsPerPage: 15,
                searchTerm: '',
                states: [],
                stateFilter: null,
                articles: []
            }
        },

        components: [
            Pagination,
            ArticleStatus
        ],

        created() {
            this.currentPage = parseInt(this.$route.query.page || 1);
            this.searchTerm = this.$route.query.search || '';

            this.getPaginatedData(this.currentPage)
                .then(response => {
                    const { data, current_page, per_page, last_page } = response.data;

                    this.articles = data;
                    this.currentPage = current_page;
                    this.itemsPerPage = per_page;
                    this.pagesCount = last_page;
                })
                .catch(err => {
                    Vue.toast('Ein Fehler ist aufgetreten', {
                        className : ['nau_toast','nau_warning'],
                    });
                });

            Api.http.get('/article-states').then(response => {
                this.states = response.data;
            });
        },

        watch: {
            stateFilter() {
                this.navigate(1);
            },

            searchTerm: _.debounce(function () {
                this.navigate(1);
            }, 400),
        },

        computed: {
            Api() {
                return Api;
            },

            moment() {
                return moment;
            },
        },

        methods: {
            navigate(page) {
                this.getPaginatedData(page)
                    .then(response => {
                        const { data, current_page, last_page, from } = response.data;

                        this.articles = data;
                        this.currentPage = current_page;
                        this.pagesCount = last_page;

                        this.buildQuery();
                    })
                    .catch(err => Vue.toast('Ein Fehler ist aufgetreten', {
                        className : ['nau_toast','nau_warning'],
                    }));
            },

            buildQuery() {
                let query = {
                    page: this.currentPage,
                };

                if(this.searchTerm != '') {
                    query.search = this.searchTerm;
                }

                this.$router.push({ query });
            },

            getPaginatedData(page) {
                var params = {
                    community: 0,
                    page: page,
                };

                if (this.searchTerm !== '') {
                    params.search = this.searchTerm;
                }

                if (this.stateFilter !== null) {
                    params.status_id = this.stateFilter;
                }

                return Api.http.get(`/articles?${$.param(params)}`);
            },

            publishArticle(article) {
                article.published_at = moment().format();

                Api.http
                    .put(`/articles/${article.id}`, article)
                    .then(response => {
                        if(response.status === 200)
                        {
                            Vue.toast('Article published successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in publishing the article. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            unpublishArticle(article) {
                swal({
                    title: 'Artikel wirklich zurück auf Entwurf setzten?',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Abbrechen',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ja, ich bin mir sicher'
                }).then(() => {
                    Api.http.put(`/articles/${article.id}`, {published_at: null})
                        .then((response) => {
                            swal({
                                title: 'Artikel auf Entwurf gesetzt',
                                type: 'success',
                            });

                            this.$set(this.articles, this.articles.indexOf(article), response.data);
                        }).catch((error) => {
                            console.error(error);
                            swal({
                                title: 'Fehler beim zurücksetzen',
                                type: 'error',
                            })
                        })
                });
            },

            deleteArticle(article) {
                swal({
                    title: 'Artikel wirklich löschen?',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Abbrechen',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ja, löschen'
                }).then(() => {
                    Api.http.delete(`/articles/${article.id}`)
                        .then((response) => {
                            swal({
                                title: 'Artikel gelöscht',
                                type: 'success',
                            });

                            this.articles.splice(this.articles.indexOf(article), 1);
                        }).catch((error) => {
                            swal({
                                title: 'Fehler beim löschen',
                                type: 'error',
                            })
                        })
                });
            },
        }
    }
</script>
