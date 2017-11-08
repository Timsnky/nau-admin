<script>
    import Top from '../mixins/TopOld';

    export default {
        mixins: [Top],

        methods: {
            async getArticles(search) {
                var response = await Api.http.get(`/articles?search=${search}&community=1&teaser=1&status=published`);
                return response.data.data;
            },

            async getTopArticles() {
                let response = await Api.http.get(`/top-community-articles`);
                return response.data.map(function(value) {
                    return value.article;
                });
            },

            async saveTopArticles(articles) {
                let mapped = articles.map(function(article) {
                    return article.id;
                });

                await Api.http.put('/top-community-articles', mapped);
            }
        }
    }
</script>
