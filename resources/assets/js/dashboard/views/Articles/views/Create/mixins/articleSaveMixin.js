export default {
    methods: {
        async handleSaveAndExit() {
            let errorString = this.validateSubmit();

            if (errorString !== "") {
                Vue.toast('Please provide the ' + errorString + ' for the article in order to save', {
                    className: ['nau_toast', 'nau_warning'],
                });
            } else {
                this.setSavingDefaults();
                await this.save()
                this.$router.push('/articles');
            }
        },

        async handleSaveAndReady() {
            let errorString = this.validatePublish();

            if (errorString !== "") {
                Vue.toast('Um zu publizieren, müssen ' + errorString + ' vorhanden sein', {
                    className: ['nau_toast', 'nau_warning'],
                });
            } else {
                this.setSavingDefaults();
                var user = await this.$refs['verification-modal'].getUserForVerification();
                await this.save();
                await Api.http.put(`/articles/${this.article.id}/ready`, {message: user.id});
                this.$router.push('/articles');
                swal('Artikel ist Bereit', '', 'success')
            }
        },

        async handleSaveAndVerified() {
            let errorString = this.validatePublish();

            if (errorString !== "") {
                Vue.toast('Um zu publizieren, müssen ' + errorString + ' vorhanden sein', {
                    className: ['nau_toast', 'nau_warning'],
                });
            } else {
                this.setSavingDefaults();
                this.article.status = 'verified';
                await this.save();
                this.$router.push('/articles');
                swal('Artikel ist Verifiziert', '', 'success')
            }
        },

        //Handle the submission of the article
        async handleSubmit() {
            let errorString = this.validateSubmit();

            if (errorString !== "") {
                Vue.toast('Um zu speichern, müssen ' + errorString + ' vorhanden sein', {
                    className: ['nau_toast', 'nau_warning'],
                });
            } else {
                this.setSavingDefaults();
                await this.save();
            }
        },

        async handleSaveAndPublish() {
            let errorString = this.validatePublish();

            if (errorString !== "") {
                Vue.toast('Um zu speichern, müssen ' + errorString + ' vorhanden sein', {
                    className: ['nau_toast', 'nau_warning'],
                });
            } else {
                this.setSavingDefaults();
                this.article.status = 'published';
                await this.save();
                this.$router.push('/articles');
                swal('Artikel ist Publiziert', '', 'success')
            }
        },

        updateArticle() {
            return Api.http
                .put(`/articles/${this.article.id}`, {
                    ...this.article,
                    published_at: this.article.published_at ? this.article.published_at.format() : null,
                    order_date: this.article.order_date ? this.article.order_date.format() : null,
                })
                .then(response => {
                    this.article = response.data;
                    if (!(response.data.image && response.data.image.id === this.articleMainImage.id)) {
                        this.submitArticleImage(this.article.id);
                    }
                    if (!(response.data.teaser_id === this.articleTeaserImage.id)) {
                        this.submitArticleTeaserImage(this.article.id);
                    }
                    Vue.toast('Article erfolgreich aktualisiert', {
                        className: ['nau_toast', 'nau_success'],
                    });

                    this.saveArticleItems(this.article.id);
                });
        },

        createArticle() {
            return Api.http
                .post(`/articles`, this.article)
                .then(response => {
                    this.article = response.data;
                    this.submitArticleImage(this.article.id);
                    this.submitArticleTeaserImage(this.article.id);
                    this.initializeArticleAuthors(this.article.id);
                    Vue.toast('Article erfolgreich gespeichert', {
                        className: ['nau_toast', 'nau_success'],
                    });
                    this.saveArticleItems(this.article.id);
                });
        },

        save() {
            if (this.article.id) {
                return this.updateArticle();
            } else {
                return this.createArticle();
            }
        },

        //Validate the save and publish process
        validatePublish() {
            let errorString = "";
            let errorArray = [];

            if (!this.article.dateline) {
                errorArray.push('Überzeile');
            }

            if (!this.article.title) {
                errorArray.push('Titel Home');
            }

            if (!this.articleMainImage.url) {
                errorArray.push('Teaser');
            }

            if (this.article.lead === '') {
                errorArray.push('Lead');
            }

            if (this.articleAuthors.length === 0) {
                errorArray.push('Autor');
            }

            if (!this.article.location) {
                errorArray.push('Ursprungsort der Geshcichte');
            }

            console.log('Ursprungsort der Geshcichte: ' + this.article.location);

            if (this.article.published_at === null || this.article.published_at === '') {
                errorArray.push('Publikationsdatum');
            }

            if (errorArray.length === 1) {
                errorString = errorArray[0];
            } else {
                errorArray.forEach(function(value, key) {
                    if (key !== errorArray.length - 1) {
                        errorString += value + ', ';
                    } else {
                        errorString += 'und ' + value;
                    }
                });
            }

            return errorString;
        },

        //Check the value of title and update internal title
        updateInternalDetails() {
            if (this.article.internal_title === '') {
                this.article.internal_title = this.article.title;
            }

            if (this.article.internal_dateline === '') {
                this.article.internal_dateline = this.article.dateline;
            }
        },

        //Validate the article submission process
        validateSubmit() {
            let errorString = "";
            let errorArray = [];

            if (!this.article.dateline) {
                errorArray.push('Überzeile');
            }

            if (!this.article.title) {
                errorArray.push('Titel Home');
            }

            if (this.article.lead === '') {
                errorArray.push('Lead');
            }

            if (errorArray.length === 1) {
                errorString = errorArray[0];
            } else {
                errorArray.forEach(function(value, key) {
                    if (key !== errorArray.length - 1) {
                        errorString += value + ', ';
                    } else {
                        errorString += 'und ' + value;
                    }
                });
            }

            return errorString;
        },

        //Setup some of the required saving defaults
        setSavingDefaults() {
            if (this.article.internal_title === '') {
                this.article.internal_title = this.article.title;
            }

            if (this.article.internal_dateline === '') {
                this.article.internal_dateline = this.article.dateline;
            }
        },

        //link user as article author
        setArticleAuthor(articleId) {
            Api.http
                .put(`/articles/${articleId}/authors/${Api.user().id}`)
                .then(response => {
                    if (response.status === 204) {
                        this.initializeArticleAuthors(articleId);

                        Vue.toast('Article author linked successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    } else {
                        Vue.toast('Error in linking the article author. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        //Link the article to the main image
        linkMainImageToArticle(articleId) {
            Api.http
                .put(`/articles/${articleId}/preview/${this.articleMainImage.id}`)
                .then(response => {
                    if (response.status === 204) {
                        Vue.toast('Article preview image added successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    } else {
                        Vue.toast('Error in updating the article main image. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        //Save the other article details if possible
        saveArticleItems(articleId) {
            this.sendSaveActionEvent(articleId);
            this.saveArticleMedia(articleId);
            this.saveSettings(articleId);
            this.saveSortedElements(articleId);
            this.submitArticleNotificationRegions(articleId);
        },

        //Send a request for data duplication to specified article id
        sendSaveActionEvent(articleId) {
            this.$emit('saveData', articleId);
        },
    }
}
