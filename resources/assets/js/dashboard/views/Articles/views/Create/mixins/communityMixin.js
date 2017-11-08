export default  {
    methods: {
        communityDeclineArticle(article)
        {
            swal({
                title: 'Ablehnen',
                text: `Nachricht an den Autor`,
                input: 'text',
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Abbrechen',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ablehnen'
            }).then((text) => {
                Api.http
                    .put(`/articles/${article.id}/decline`, {
                        message: text,
                    })
                    .then(response => {
                        this.article = response.data;
                        swal('Artikel ist abgelehnt', '', 'success')
                        this.close();
                    })
                    .catch((error) => {
                        console.error(error);
                        Vue.toast(error.toString(), {className: ['nau_toast', 'nau_warning']});
                    });
            });
        },

        communityPublishArticle(article) {
            swal({
                title: 'Publizieren',
                text: 'Nachricht an den Autor',
                type: 'warning',
                input: 'text',
                showCancelButton: true,
                cancelButtonText: 'Abbrechen',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Publizieren'
            }).then((text) => {
                Api.http
                    .put(`/articles/${article.id}/publish`, {
                        message: text,
                    })
                    .then(response => {
                        this.article = response.data;
                        swal('Artikel wurde freigeschalten', '', 'success')
                        this.close();
                    })
                    .catch((error) => {
                        console.error(error);
                        Vue.toast(error.toString(), {className: ['nau_toast', 'nau_warning']});
                    });
            });
        },
    }
}
