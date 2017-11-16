<script>
    import Form from '../mixins/Form';

    export default {
        mixins: [Form],

        data() {
            return {
                pageTitle: 'Artikel bearbeiten',
                submitLabel: 'Speichern',
            };
        },

        created() {
            this.initializeChannels();
            Api.http.get(`/articles/${this.$route.params.articleID}`)
                .then((response) => {
                    this.article = response.data;
                    var date = moment(this.article.published_at);
                    if(date.isValid()) {
                        this.time = date.format('HH:mm');
                    }
                });
        },


        methods: {
            async handleSubmit() {
                const { title } = this.article;

                try {
                    var response = await Api.http.put(`/articles/${this.article.id}`, {
                        title,
                        internal_title: title,
                        published_at: this.article.published_at ? this.article.published_at.format() : null,
                        channel_id: this.article.channel.id,
                        should_include_dooh_video: this.article.dooh.should_include_video,
                        should_include_livestream: this.article.should_include_livestream,
                    });
                    var article = response.data;

                    this.authors.removed.forEach((author) => {
                        Api.http.delete(`/articles/${article.id}/authors/${author.id}`)
                    });

                    this.authors.new.forEach((author) => {
                        Api.http.put(`/articles/${article.id}/authors/${author.id}`)
                    });
                } catch (error) {
                    console.error(error);
                    Vue.toast('Ein Fehler ist aufgetreten.', {
                        className : ['nau_toast','nau_warning'],
                    });
                    return false;
                }

                this.$router.push({name: 'resources.day', params: { date: this.date }})
            },

            reset() {
                this.article = {
                    title: '',
                    dateline: '',
                    lead: ''
                }
            },
        },
    }
</script>
