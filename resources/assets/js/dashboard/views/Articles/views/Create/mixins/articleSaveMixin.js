let articleSaveMixin = {
    methods: {
        /**
         * SAVE AND EXIT
         */
        //Validate the save and exit button
        handleSaveAndExit()
        {
            let errorString = this.validateSubmit();

            if(errorString !== "")
            {
                Vue.toast('Please provide the ' + errorString + ' for the article in order to save', {
                    className: ['nau_toast', 'nau_warning'],
                });
            }
            else
            {
                this.setSavingDefaults();

                this.saveAndExit();
            }
        },

        //Save and exit an article
        saveAndExit()
        {
            if(this.article.id)
            {
                Api.http
                    .put(`/articles/${this.article.id}`, this.article)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.article = response.data;
                            if(! (response.data.image && response.data.image.id === this.articleMainImage.id))
                            {
                                this.submitArticleImage(this.article.id);
                            }
                            if(! (response.data.teaser_id === this.articleTeaserImage.id))
                            {
                                this.submitArticleTeaserImage(this.article.id);
                            }
                            Vue.toast('Article updated successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });

                            this.saveArticleItems(this.article.id);
                            this.$router.push('/articles');
                        }
                        else
                        {
                            Vue.toast('Error in updating the article. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            }
            else
            {
                Api.http
                    .post(`/articles`, this.article)
                    .then(response => {
                        if(response.status === 201)
                        {
                            this.article = response.data;
                            this.submitArticleImage(this.article.id);
                            this.submitArticleTeaserImage(this.article.id);
                            Vue.toast('Article created successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in creation of the article. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                        this.saveArticleItems(this.article.id);
                        this.$router.push('/articles');
                    });
            }
        },

        /**
         * SAVE AND PUBLISH
         */
        handleSaveAndPublish()
        {
            let errorString = this.validateSaveAndPublish();

            if(errorString !== "")
            {
                Vue.toast('Um zu speichern, müssen ' + errorString + ' vorhanden sein', {
                    className: ['nau_toast', 'nau_warning'],
                });
            }
            else
            {
                this.setSavingDefaults();

                this.saveAndPublish();
            }
        },

        //Validate the save and publish process
        validateSaveAndPublish()
        {
            let errorString = "";
            let errorArray = [];

            if(! this.article.dateline)
            {
                errorArray.push('Überzeile');
            }

            if(! this.article.title)
            {
                errorArray.push('Titel Home');
            }

            if(! this.articleMainImage.url)
            {
                errorArray.push('Teaser');
            }

            if(this.article.lead === '')
            {
                errorArray.push('Lead');
            }

            if(this.articleAuthors.length === 0)
            {
                errorArray.push('Autor');
            }

            if(!this.article.location)
            {
                errorArray.push('Ursprungsort der Geshcichte');
            }

            console.log('Ursprungsort der Geshcichte: ' + this.article.location);

            if(this.article.published_at === null || this.article.published_at === '')
            {
                errorArray.push('Publikationsdatum');
            }

            if(errorArray.length === 1)
            {
                errorString = errorArray[0];
            }
            else
            {
                errorArray.forEach(function (value, key)
                {
                    if(key !== errorArray.length - 1)
                    {
                        errorString += value + ', ';
                    }
                    else
                    {
                        errorString += 'und ' + value;
                    }
                });
            }

            return errorString;

        },

        //Save and publish
        saveAndPublish()
        {
            if(this.article.id)
            {
                Api.http
                    .put(`/articles/${this.article.id}`, this.article)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.article = response.data;
                            if(! (response.data.image && response.data.image.id === this.articleMainImage.id))
                            {
                                this.submitArticleImage(this.article.id);
                            }
                            if(! (response.data.teaser_id === this.articleTeaserImage.id))
                            {
                                this.submitArticleTeaserImage(this.article.id);
                            }

                            this.saveArticleItems(this.article.id);
                            this.publishArticle(this.article.id);
                        }
                        else
                        {
                            Vue.toast('Error in updating and publish the article. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            }
            else
            {
                Api.http
                    .post(`/articles`, this.article)
                    .then(response => {
                        if(response.status === 201)
                        {
                            this.article = response.data;
                            this.submitArticleImage(this.article.id);
                            this.submitArticleTeaserImage(this.article.id);
                            Vue.toast('Article created and published successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in creation and publish of the article. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                        this.saveArticleItems(this.article.id);
                    });
            }
        },

        /**
         * SUBMIT OF ARTICLE DETAILS
         */
        //Check the value of title and update internal title
        updateInternalDetails()
        {
            if(this.article.internal_title === '')
            {
                this.article.internal_title = this.article.title;
            }

            if(this.article.internal_dateline === '')
            {
                this.article.internal_dateline = this.article.dateline;
            }
        },

        //Validate the article submission process
        validateSubmit()
        {
            let errorString = "";
            let errorArray = [];

            if(! this.article.dateline)
            {
                errorArray.push('Überzeile');
            }

            if(! this.article.title)
            {
                errorArray.push('Titel Home');
            }

            if(this.article.lead === '')
            {
                errorArray.push('Lead');
            }

            if(errorArray.length === 1)
            {
                errorString = errorArray[0];
            }
            else
            {
                errorArray.forEach(function (value, key)
                {
                    if(key !== errorArray.length - 1)
                    {
                        errorString += value + ', ';
                    }
                    else
                    {
                        errorString += 'und ' + value;
                    }
                });
            }

            return errorString;
        },

        //Publish an article
        publishArticle(id) {
            Api.http.put(`/articles/${id}/publish`)
                .then(response => {
                    this.$router.push('/articles');
                    swal(
                        'Artikel veröffentlicht!',
                        '',
                        'success'
                    );
                })
                .catch(error => {
                    if(error.response.status === 422) {
                        _.each(error.response.data.errors, (errors, field) => {
                            _.each(errors, (error) => {
                                this.errors.push({
                                    title: 'Publizieren fehlgeschlagen',
                                    message: error,
                                })
                            });
                        });
                    } else {
                        console.error(error);
                    }
                })
        },

        //Setup some of the required saving defaults
        setSavingDefaults()
        {
            if(this.article.internal_title === '')
            {
                this.article.internal_title = this.article.title;
            }

            if(this.article.internal_dateline === '')
            {
                this.article.internal_dateline = this.article.dateline;
            }
        },

        //Handle the submission of the article
        handleSubmit()
        {
            let errorString = this.validateSubmit();

            if(errorString !== "")
            {
                Vue.toast('Um zu speichern, müssen ' + errorString + ' vorhanden sein', {
                    className: ['nau_toast', 'nau_warning'],
                });
            }
            else
            {
                this.setSavingDefaults();

                this.submitArticleDetails();
            }
        },

        //Submit the details for the article
        submitArticleDetails()
        {
            if(this.article.id)
            {
                this.updateArticle();
            }
            else
            {
                this.createArticle();
            }
        },

        //Create a new article
        createArticle()
        {
            Api.http
                .post(`/articles`, this.article)
                .then(response => {
                    if(response.status === 201)
                    {
                        this.article = response.data;
                        this.submitArticleImage(this.article.id);
                        this.submitArticleTeaserImage(this.article.id);
                        this.setArticleAuthor(this.article.id);
                        Vue.toast('Article created successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    }
                    else
                    {
                        Vue.toast('Error in creation of the article. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        //Update an article
        updateArticle() {
            Api.http
                .put(`/articles/${this.article.id}`, this.article)
                .then(response => {
                    if(response.status === 200)
                    {
                        this.article = response.data;
                        if(! (response.data.image && response.data.image.id === this.articleMainImage.id))
                        {
                            this.submitArticleImage(this.article.id);
                        }
                        if(! (response.data.teaser_id === this.articleTeaserImage.id) && this.articleTeaserImage.url)
                        {
                            this.submitArticleTeaserImage(this.article.id);
                        }

                        Vue.toast('Article updated successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    }
                    else
                    {
                        Vue.toast('Error in updating the article. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        //link user as article author
        setArticleAuthor(articleId)
        {
            Api.http
                .put(`/articles/${articleId}/authors/${Api.user().id}`)
                .then(response => {
                    if(response.status === 204)
                    {
                        this.initializeArticleAuthors(articleId);

                        Vue.toast('Article author linked successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    }
                    else
                    {
                        Vue.toast('Error in linking the article author. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });

        },

        //Link the article to the main image
        linkMainImageToArticle(articleId)
        {
            Api.http
                .put(`/articles/${articleId}/preview/${this.articleMainImage.id}`)
                .then(response => {
                    if(response.status === 204)
                    {
                        Vue.toast('Article preview image added successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    }
                    else
                    {
                        Vue.toast('Error in updating the article main image. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        //Save the other article details if possible
        saveArticleItems(articleId)
        {
            this.sendSaveActionEvent(articleId);
            this.saveArticleMedia(articleId);
            this.saveSettings(articleId);
            this.saveSortedElements(articleId);
            this.submitArticleNotificationRegions(articleId);
        },

        //Send a request for data duplication to specified article id
        sendSaveActionEvent(articleId)
        {
            this.$emit('saveData', articleId);
        },
    }
};

export default articleSaveMixin;