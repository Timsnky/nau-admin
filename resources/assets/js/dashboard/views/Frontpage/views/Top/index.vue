<script>
    import Top from '../mixins/Top';

    export default {
        mixins: [Top],

        data() {
            return {
                flex: false,
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
                }, {
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
                //     editable: true,
                //     class: ['teaser', 'col-md-6'],
                //     articleIndex: 6,
                // }, {
                //     editable: true,
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
                }],
            };
        },

        async mounted() {
            this.loadTopArticles();
        },

        methods: {
            async getArticles(search) {
                var response = await Api.http.get(`/articles?search=${search}&community=0&teaser=${this.needsTeaser}&status=published`);
                return response.data.data;
            },
        }
    }
</script>
