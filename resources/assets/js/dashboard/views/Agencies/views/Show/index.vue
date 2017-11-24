<template>
    <div>
        <div class="row actions">
            <div class="col-md-6">
                <router-link
                        :to="{name: 'articles.create'}"
                        class="btn default blue">
                     Create Article
                </router-link>
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
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                articleId: null,
                agency: null,
                article: {}
            }
        },

        components: {
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
                        console.log(this.article);
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

        }
    }

</script>

<style lang="scss" scoped>

</style>
