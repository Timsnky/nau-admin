<template>
    <div>
        <page-title title="Community Artikel" />
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
        </div>

        <table class="table table-hover">
            <thead>
            <tr>
                <th>Titel</th>
                <th>Autor</th>
                <th>Status</th>
                <th>Publikationsdatum</th>
                <th class="text-right">Optionen</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="article in articles"
                :key="article.id">
                <td>{{ article.title }}</td>
                <td>{{ article.authors.map(function(a) {return a.name}).join(', ') }}</td>
                <td>
                    <status-display :status="article.article_status.name" />
                </td>
                <td>{{ publicationDate(article) }}</td>
                <td class="text-right">
                    <div class="btn-group">
                        <button v-if="article.article_status.name === 'review'" class="btn blue-dark" @click="publishArticle(article)"><i class="fa fa-thumbs-up"></i> Freischalten</button>
                        <button v-if="article.article_status.name === 'review'" class="btn red" @click="declineArticle(article)"><i class="fa fa-thumbs-down"></i> Ablehnen</button>
                    </div>
                    <button v-if="article.article_status.name === 'published'" class="btn blue-dark" @click="unpublishArticle(article)"><i class="fa fa-undo"></i> Unpublish</button>
                    <router-link
                            :to="{name: 'articles.edit', params: {id: article.id}}"
                            class="btn default">
                        <i class="fa fa-edit"></i>
                        Bearbeiten
                    </router-link>
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
                var params = {
                    community: 1,
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

            publicationDate(article)
            {
                return moment(article.published_at).format('HH:mm DD.MM.YY');
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

            publishArticle(article)
            {
                swal({
                    title: 'Publizieren',
                    text: 'Nachricht an den Autor',
                    type: 'warning',
                    input: 'text',
                    showCancelButton: true,
                    cancelButtonText: 'Abbrechen',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Publizieren'
                }).then((text) => {
                    Api.http
                        .put(`/articles/${article.id}/publish`, {
                            message: text,
                        })
                        .then(response => {
                            if(response.status === 200) {
                                this.$set(this.articles, this.articles.indexOf(article), response.data);
                                Vue.toast('Artikel erfolgreich publiziert.', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            } else {
                                Vue.toast('Beim publizieren ist ein Fehler aufgetreten.', {
                                    className: ['nau_toast', 'nau_warning'],
                                });
                            }
                        }
                    );
                });
            },

            declineArticle(article)
            {
                swal({
                    title: 'Ablehnen',
                    text: `Nachricht an den Autor`,
                    input: 'text',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Abbrechen',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ablehnen'
                }).then((text) => {
                    Api.http
                        .put(`/articles/${article.id}/decline`, {
                            message: text,
                        })
                        .then(response => {
                            if(response.status === 200) {
                                this.$set(this.articles, this.articles.indexOf(article), response.data);
                                Vue.toast('Artikel erfolgreich abgelehnt.', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            } else {
                                Vue.toast('Beim ablehnen ist ein Fehler aufgetreten.', {
                                    className: ['nau_toast', 'nau_warning'],
                                });
                            }
                        }
                    );
                });
            }
        }
    }
</script>
