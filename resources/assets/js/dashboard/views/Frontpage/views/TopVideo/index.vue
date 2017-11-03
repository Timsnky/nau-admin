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
            this.loadTopArticles();
        },

        methods: {
            async getArticles(search) {
                var response = await Api.http.get(`/articles?search=${search}&community=0&teaser=1&status=published`);
                return response.data.data;
            },
        }
    }
</script>
