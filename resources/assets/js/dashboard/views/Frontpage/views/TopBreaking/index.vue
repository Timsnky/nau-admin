<script>
    import Top from '../mixins/Top';

    export default {
        mixins: [Top],

        data() {
            return {
                topArticlesUrl: '/top-articles',
                layouts: [{
                    editable: true,
                    class: ['teaser', 'col-md-8'],
                    articleIndex: 0,
                }, {
                    editable: true,
                    class: ['teaser', 'col-md-4'],
                    articleIndex: 1,
                }, {
                    editable: true,
                    class: ['teaser', 'col-md-4'],
                    articleIndex: 2,
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
