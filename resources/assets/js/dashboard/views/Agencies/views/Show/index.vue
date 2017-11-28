<template>
    <div>
        <div class="row actions">
            <div class="col-md-6">
                <button type="button"
                        @click="createArticle()"
                        class="btn default blue">
                     Create Article
                </button>
                <router-link
                        :to="{name: 'agencies.list'}"
                        class="btn default blue">
                    </i> XML
                </router-link>
            </div>
            <div class="col-md-6 text-right">
                <router-link
                        :to="{name: 'agencies.list'}"
                        class="btn default blue">
                    Back
                </router-link>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <h3>{{ article.headline }}</h3>
                <h4>{{ article.dateline }}</h4>
                <div>
                    <p v-html="article.content"></p>
                </div>
            </div>

            <div class="col-md-6">
                <div class="form-group">
                    <label>Date</label><br>
                    <span>{{ formatDate(article.created_at) }}</span>
                </div>
                <div class="form-group">
                    <label>Urgency</label><br>
                    <span>{{ article.urgency }}</span>
                </div>
                <div class="form-group">
                    <label>Category</label><br>
                    <span>{{ article.category }}</span>
                </div>
                <div class="form-group">
                    <label>Country</label><br>
                    <span>{{ article.country }}</span>
                </div>
                <div class="form-group">
                    <label>Public ID</label><br>
                    <span>{{ article.public_id  }}</span>
                </div>
                <div class="form-group">
                    <label>Assign to</label>
                    <div class="assign_section">
                        <div class="assign_multiselect">
                            <multiselect
                                    id="authorMultiSelect"
                                    v-model="article.reserved_by"
                                    :options="authors"
                                    placeholder="Assign to"
                                    label="name"
                                    :close-on-select="true"
                                    :internal-search="false"
                                    open-direction="bottom"
                                    :options-limit="100"
                                    :max-height="500"
                                    :loading="authorIsLoading"
                                    @search-change="searchAuthor">
                            </multiselect>
                        </div>
                        <div class="assign_button">
                            <button @click="assignArticleAuthor()" class="btn default blue">Assign</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';

    export default {
        data() {
            return {
                articleId: null,
                agency: null,
                article: {},
                authors: [
                ],
                authorIsLoading: false,
                searchedAuthor: {
                    query: '',
                    promise: true
                },
            }
        },

        components: {
            Multiselect,
        },

        created()
        {
            this.articleId = this.$route.params.id;
            this.agency = this.$route.params.agency;

            this.getArticleDetails();

        },

        watch: {
            searchTerm: _.debounce(function () {
                this.navigate(1);
            }, 400),
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
            //Get the article details for display
            getArticleDetails()
            {
                Api.http
                    .get(`/agencies/` + this.agency + `/` + this.articleId)
                    .then(response => {
                        this.article = response.data;
                    })
                    .catch(err => Vue.toast('Error in retrieving the article. Please refresh the page', {
                        className : ['nau_toast','nau_warning'],
                    }));
            },

            //Format the date for presentation
            formatDate(date)
            {
                return moment(date).isValid() ? moment(date).format('DD.MM.YY HH:mm:ss') : '';
            },

            /**
             * AUTHOR
             */
            searchAuthor(query) {
                this.searchedAuthor.query = query;
                this.authorIsLoading = true;
                this.authors = [];

                if (this.searchedAuthor.promise) {
                    this.searchedAuthor.promise = false;

                    setTimeout(() => {
                        if (this.searchedAuthor.query !== '')
                        {
                            Api.http
                                .get(`/authors?search=${this.searchedAuthor.query}`)
                                .then(response => {
                                    this.authors = this.authors.concat(response.data);
                                    this.searchedAuthor.promise = true;
                                    this.authorIsLoading = false;
                                });
                        } else {
                            this.searchedAuthor.promise = true;
                            this.authorIsLoading = false;
                        }
                    }, 400);
                }
            },

            //Assign the article author
            assignArticleAuthor()
            {
                if(this.article.reserved_by)
                {
                    Api.http
                        .put(`/agencies/${this.article.agency}/${this.article.id}/reserve/${this.article.reserved_by.id}`)
                        .then(response => {
                            this.article = response.data;

                            Vue.toast('Author assigned to article successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        });
                }
                else
                {
                    Vue.toast('Please select an author first inorder to assign', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                };
            },

            //Send a request to create an article
            createArticle()
            {
                Api.http
                    .post(`/agencies/${this.article.agency}/${this.article.id}/article`)
                    .then(response => {
                        Vue.toast('Agency article created successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    });
            }
        }
    };
</script>

<style lang="scss" scoped>
    .assign_section {
        display: block;
    }

    .assign_multiselect  {
        width: 80%;
        display: inline-flex;
    }

    .assign_button {
        width: 10%;
        display: inline-flex;
    }
</style>
