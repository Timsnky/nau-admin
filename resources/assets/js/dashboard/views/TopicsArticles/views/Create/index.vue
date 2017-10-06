<script>
    import Form from '../mixins/Form';

    export default {
        mixins: [Form],

        data() {
            return {
                pageTitle: 'Artikel erstellen',
                submitLabel: 'Erstellen',
            };
        },

        created() {
            this.initializeChannels().then((data) => {
                this.article.channel.id = data[0].id;
            });
        },

        methods: {
            async handleSubmit() {
                const { title } = this.article;

                try {
                    var response = await Api.http.post(`/topics/${this.$route.params.topicID}/articles`, {
                        title,
                        internal_title: title,
                        lead: 'Bitte ausfüllen',
                        dateline: 'Bitte ausfüllen',
                        internal_dateline: 'Bitte ausfüllen',
                        published_at: this.article.published_at ? this.article.published_at.format() : null,
                        channel_id: this.article.channel.id,
                        should_include_dooh_video: this.article.dooh.should_include_video,
                    });
                    var article = response.data;

                    this.authors.removed.forEach((author) => {
                        Api.http.delete(`/articles/${article.id}/authors/${author.id}`)
                    });

                    this.authors.new.forEach((author) => {
                        Api.http.put(`/articles/${article.id}/authors/${author.id}`)
                    });
                } catch (error) {
                    Vue.toast('Ein Fehler ist aufgetreten.', {
                        className : ['nau_toast','nau_warning'],
                    });
                    return false;
                }

                this.$router.push({name: 'resources.day', params: { date: this.date }})
            },
        },
    }
</script>
