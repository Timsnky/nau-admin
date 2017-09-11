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
                v-for="article in articles"
                :key="article.id">
                <td>{{ article.title }}</td>
                <td>{{ article.authors.map(function(a) {return a.name}).join(', ') }}</td>
                <td>
                    <span v-if="article.article_status.name === 'published'" class="label label-sm label-success">Publiziert</span>
                    <span v-if="article.article_status.name === 'draft'" class="label label-sm label-success">Entwurf</span>
                    <span v-if="article.article_status.name === 'review'" class="label label-sm label-success">Review</span>
                    <span v-if="article.article_status.name === 'declined'" class="label label-sm label-success">Abgelehnt</span>
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
                <button v-if="article.published_at === null" class="btn btn-primary" @click="publishArticle(article)">Publish</button>
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
            Pagination
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

            publicationDate(article)
            {
                return moment(article.published_at).format('HH:mm DD.MM.YY');
            },

            publishArticle(article)
            {
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
            }
        }
    }
</script>
