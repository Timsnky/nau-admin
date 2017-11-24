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

        <div class="table-responsive">
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
                <tr v-for="article in agencyArticles"
                    :class="assignColorClass(article)"
                    :key="article.id">
                    <td>{{ formatDate(article.created_at) }}</td>
                    <td>{{ article.urgency }}</td>
                    <td>
                        <router-link
                                :to="{name: 'agencies.show', params: {agency: article.agency, id: article.id}}">
                            {{ article.headline }}
                        </router-link>
                    </td>
                    <td>{{ article.dateline }}</td>
                    <td></td>
                    <td>
                        {{ article.category }}
                    </td>
                    <td>{{ article.country }}</td>
                    <td>{{ article.agency }}</td>
                    <td></td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link
                                    :to="{name: 'agencies.show', params: {agency: article.agency, id: article.id}}"
                                    class="btn blue">
                                <i class="fa fa-eye"></i>
                                Sehen
                            </router-link>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>


        <!--<div class="clearfix">-->
            <!--<pagination-->
                    <!--class="pull-right"-->
                    <!--:items="agencyArticles"-->
                    <!--:currentPage="currentPage"-->
                    <!--:pagesCount="pagesCount"-->
                    <!--:itemsPerPage="itemsPerPage"-->
                    <!--@navigate="navigate"/>-->
        <!--</div>-->
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
                agencyFilter: null,
                agencyArticles: [],
                myUserId : 0,
                userId: 0,
            }
        },

        components: {
            Pagination,
        },

        created() {
            this.currentPage = parseInt(this.$route.query.page || 1);
            this.searchTerm = this.$route.query.search || '';

            this.getPaginatedData(this.currentPage)
                .then(response => {
                    const { data, current_page, per_page, last_page } = response.data;

                    this.agencyArticles = response.data;
                    this.myUserId = Api.user().id;
                    this.userId = this.myUserId;
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

            userId() {
                this.navigate(1);
            },

            agencyFilter() {
                this.navigate(1);
            }
        },

        computed: {
            Api() {
                return Api;
            },

            systemAgencies()
            {
                return this.Api.getAgencies();
            },
        },

        methods: {
            navigate(page) {
                this.getPaginatedData(page)
                    .then(response => {

                        this.articles = response.data;

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
                    agencies: this.getAgencyParams()
                };

                if (this.searchTerm !== '')
                {
                    params.search = this.searchTerm;
                }

                if(this.userId != 0)
                {
                    params.user_id = this.userId;
                }

                return Api.http.get(`/agencies?${$.param(params)}`);
            },

            //Get the agency param
            getAgencyParams()
            {
                let paramsArray = [];

                if(this.agencyFilter == null)
                {
                    this.systemAgencies.forEach(function (value, key)
                    {
                        paramsArray.push(value.id);
                    })
                }
                else
                {
                    paramsArray.push(this.agencyFilter);
                }

                return paramsArray;
            },

            //Format the date for presentation
            formatDate(date)
            {
                return moment(date).isValid() ? moment(date).format('DD.MM.YY HH:mm:ss') : '';
            },

            //Check if the article is recent
            isTenMinutesOld(date)
            {
                return moment().diff(date, 'minutes') < 10;
            },

            //Assign a color class to the row
            assignColorClass(article)
            {
                if(article.reserved_by)
                {
                    return 'grey_row';
                }
                else if(this.isTenMinutesOld(article.created_at))
                {
                    return 'yellow_row';
                }
                else
                {
                    return '';
                }
            }
        }
    }
</script>

<style lang="scss">
    .yellow_row {
        background-color: lightyellow;
    }

    .yellow_row:hover {
        background-color: #e6e6cb !important;
    }

    .grey_row {
        background-color: lightgrey;
    }

    .grey_row:hover {
        background-color: darkgrey !important;
    }
</style>
