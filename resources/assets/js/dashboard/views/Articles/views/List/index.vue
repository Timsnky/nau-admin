<template>
    <div>
        <page-title title="Artikel" />
        <div class="row">
            <div class="col-md-6">
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
                <th>Author</th>
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
                <td>{{ publicationDate(article) }}</td>
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
                <button v-if="Api.isAdmin()" class="btn btn-danger" @click="deleteArticle(article)"><i class="fa fa-trash"></i> Löschen</button>
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
                articles: []
            }
        },

        components: [
            Pagination,
            ArticleStatus
        ],

        created() {
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
        },

        watch: {
            searchTerm: _.debounce(function () {
                this.navigate(1);
            }, 400),
        },

        computed: {
            Api() {
                return Api;
            }
        },

        methods: {
            navigate(page) {
                this.getPaginatedData(page)
                    .then(response => {
                        const { data, current_page, last_page, from } = response.data;

                        this.articles = data;
                        this.currentPage = current_page;
                        this.pagesCount = last_page;
                    })
                    .catch(err => Vue.toast('Ein Fehler ist aufgetreten', {
                        className : ['nau_toast','nau_warning'],
                    }));
            },

            getPaginatedData(page) {
                if (this.searchTerm !== '') {
                    return Api.http.get(`/articles?community=0&search=${this.searchTerm}&page=${page}`);
                }

                return Api.http.get(`/articles?community=0&page=${page}`);
            },

            publicationDate(article) {
                return article.published_at ? moment(article.published_at).format('DD.MM.YY HH:mm') : '';
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
