<script>
    import Top from '../mixins/Top';

    export default {
        mixins: [Top],

        data() {
            return {
                topArticlesUrl: '/top-articles',
                layouts: [{
                    editable: true,
                    class: ['col-md-4'],
                    articleIndex: 3,
                }, {
                    editable: true,
                    class: ['col-md-4'],
                    articleIndex: 4,
                }, {
                    editable: true,
                    class: ['col-md-4'],
                    articleIndex: 5,
                },
                // {
                //     editable: false,
                //     class: ['teaser', 'col-md-6'],
                //     articleIndex: 6,
                // }, {
                //     editable: false,
                //     class: ['teaser', 'col-md-6'],
                //     articleIndex: 7,
                // },
                {
                    editable: true,
                    class: ['col-md-4'],
                    articleIndex: 8,
                }, {
                    editable: true,
                    class: ['col-md-4'],
                    articleIndex: 9,
                }, {
                    editable: true,
                    class: ['col-md-4'],
                    articleIndex: 10,
                }]
            };
        },

        async mounted() {
            this.topArticles = await this.getTopArticles();
        },

        methods: {
            async getArticles(search) {
                var response = await Api.http.get(`/articles?search=${search}&community=0&status=published`);
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
