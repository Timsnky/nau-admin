<template>
    <div>
        <page-title title="Agencies" />
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
            <div class="col-md-3">
                <div class="input-icon">
                    <i class="fa fa-filter"></i>
                    <select class="form-control" name="user_id" id="user_id" v-model="userId">
                        <option :value="myUserId">Mine</option>
                        <option :value="0">All</option>
                    </select>
                </div>
            </div>
            <div class="col-md-3">
                <div class="input-icon">
                    <i class="fa fa-filter"></i>
                    <select class="form-control" v-model="agencyFilter">
                        <option :value="null">Alle</option>
                        <option v-for="agency in systemAgencies" :value="agency.id">{{ agency.name }}</option>
                    </select>
                </div>
            </div>
        </div>

        <table class="table table-hover">
            <thead>
            <tr>
                <th>Date</th>
                <th>Urgency</th>
                <th>Headline</th>
                <th>Dateline</th>
                <th>Assigned</th>
                <th>Category</th>
                <th>Country</th>
                <th>Agency</th>
                <th>Update</th>
                <th class="text-right">Actions</th>
            </tr>
            </thead>
            <tbody>
            <!--<tr-->
                    <!--:class="{danger: article.publish_failed, info: article.article_status.name === 'queued'}"-->
                    <!--v-for="article in articles"-->
                    <!--:key="article.id">-->
                <!--<td>-->
                    <!--<i v-if="article.publish_failed" class="fa fa-exclamation-triangle"></i>-->
                    <!--{{ article.title }}-->
                    <!--<dooh-video-status :dooh="article.dooh" />-->
                <!--</td>-->
                <!--<td>{{ article.authors.map(function(a) {return a.name}).join(', ') }}</td>-->
                <!--<td>-->
                    <!--<status-display :status="article.article_status.name" />-->
                <!--</td>-->
                <!--<td>{{ moment(article.published_at).isValid() ? moment(article.published_at).format('DD.MM.YY HH:mm') : '' }}</td>-->
                <!--<td class="text-right">-->
                    <!--<button v-if="article.article_status.name === 'published'" class="btn blue-dark" @click="unpublishArticle(article)"><i class="fa fa-undo"></i> Unpublish</button>-->
                    <!--<div class="btn-group">-->
                        <!--<router-link-->
                                <!--:to="{name: 'articles.edit', params: {id: article.id}}"-->
                                <!--class="btn default">-->
                            <!--<i class="fa fa-edit"></i>-->
                            <!--Bearbeiten-->
                        <!--</router-link>-->
                        <!--<button v-if="Api.isChefJournalist() || Api.isAdmin()" class="btn red" @click="deleteArticle(article)"><i class="fa fa-trash"></i></button>-->
                    <!--</div>-->
                    <!--&lt;!&ndash; <button v-if="article.published_at === null" class="btn btn-primary" @click="publishArticle(article)">Publish</button> &ndash;&gt;-->
                <!--</td>-->
            <!--</tr>-->
            </tbody>
        </table>

        <div class="clearfix">
            <pagination
                    class="pull-right"
                    :items="agencyArticles"
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
    import DoohVideoStatus from 'dashboard/components/DoohVideoStatus';

    export default {
        data() {
            return {
                currentPage: 1,
                pagesCount: 1,
                itemsPerPage: 15,
                searchTerm: '',
                agencies: [],
                agencyFilter: null,
                agencyArticles: [],
                myUserId : 0,
                userId: 0,

            }
        },

        components: {
            Pagination,
//            ArticleStatus,
//            DoohVideoStatus
        },

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
                    this.myUserId = Api.user().id;
                    this.userId = this.myUserId;
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

            doohFilter() {
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

            systemAgencies()
            {
                return this.Api.getAgencies();
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
                    agencies: ['dpa']
                };

                if (this.searchTerm !== '') {
                    params.search = this.searchTerm;
                }
//
//                if (this.stateFilter !== null) {
//                    params.status_id = this.stateFilter;
//                }
//
//                if (this.doohFilter) {
//                    params.dooh_missing = this.doohFilter;
//                }

                return Api.http.get(`/agencies?${$.param(params)}`);
            },

            communityPublishArticle(article)
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

<style lang="scss">
    .label {
        font-size: .9em;
    }
</style>
