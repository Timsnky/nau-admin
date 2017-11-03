<script>
    import Top from '../mixins/Top';

    export default {
        mixins: [Top],

        data() {
            return {
                topArticlesUrl: '/top-articles',
                layouts: [{
                    editable: true,
                    class: ['teaser', 'col-md-6'],
                    articleIndex: 6,
                }, {
                    editable: true,
                    class: ['teaser', 'col-md-6'],
                    articleIndex: 7,
                }]
            };
        },

        async mounted() {
            this.topArticles = await this.getTopArticles();
        },

        methods: {
            async getArticles(search) {
                var response = await Api.http.get(`/articles?search=${search}&community=0&teaser=1&status=published`);
                return response.data.data;
            },

            saveTopArticles(topArticles) {
                let mapped = [];

                topArticles.forEach((topArticle, key) => {
                    mapped.push({
                        id: topArticle.id,
                        article_id: topArticle.article.id,
                        order: this.layouts[key].articleIndex,
                    });
                });

                return Api.http.put('/top-articles', mapped);
            }
        }
    }
</script>
