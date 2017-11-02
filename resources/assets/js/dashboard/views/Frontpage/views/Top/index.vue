<script>
    import Top from '../mixins/Top';

    export default {
        mixins: [Top],

        data() {
            return {
                limit: 11,
            };
        },

        methods: {
            async getArticles(search) {
                var response = await Api.http.get(`/articles?search=${search}&community=0&teaser=1&status=published`);
                return response.data.data;
            },

            async getTopArticles() {
                let response = await Api.http.get(`/top-articles`);
                return response.data.map(function(value) {
                    return value.article;
                });
            },

            async saveTopArticles(articles) {
                let mapped = articles.map(function(article) {
                    return article.id;
                });

                await Api.http.put('/top-articles', mapped);
            }
        }
    }
</script>
