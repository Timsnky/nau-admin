let publishMixin = {
    methods: {
        /**
         *  ARTICLE AUTHORS
         */
        //Search for an author
        searchAuthors(query)
        {
            this.searchedAuthor.query = query;
            this.authorsIsLoading = true;

            if(this.searchedAuthor.promise)
            {
                this.searchedAuthor.promise = false;

                setTimeout(() => {
                    Api.http
                        .get(`/authors?search=${this.searchedAuthor.query}`)
                        .then(response => {
                            this.existingAuthors = response.data;
                            this.searchedAuthor.promise = true;
                            this.authorsIsLoading = false;
                        });
                }, 400);
            }
        },

        //Save the settings for the article
        saveSettings(articleId)
        {
            this.saveArticleAuthorsAndIdeas(articleId);
            this.linkAuthorToArticle(articleId);
            this.updateArticle(articleId);
        },

        //Save authors and ideas
        saveArticleAuthorsAndIdeas(articleId)
        {
            this.linkInformantToArticle(articleId);
            this.linkChannelToArticle(articleId);
            this.submitArticleNotificationRegions(articleId);
        },

        //Link author to article
        linkAuthorToArticle(articleId)
        {
            let vm = this;

            this.articleAuthors.forEach(function (value, key)
            {
                if(! (value.pivot && value.pivot.article_id === articleId))
                {
                    Api.http
                        .put(`/articles/${articleId}/authors/${value.id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                vm.articleAuthors[key].pivot = {
                                    article_id : articleId,
                                    author_id : vm.articleAuthors[key].id
                                };
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
                }
            });
        },

        //Delete any authors
        deleteAuthors(author)
        {
            let vm = this;

            vm.articleAuthors.forEach(function (value, key)
            {
                if(value.id === author.id && value.pivot)
                {
                    Api.http
                        .delete(`/articles/${vm.article.id}/authors/${vm.articleAuthors[key].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                Vue.toast('Article author deleted successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                        });
                }
            });
        },

        /**
         * ARTICLE INFORMANTS
         */
        //Search for an informant
        searchInformants(query)
        {
            this.searchedInformant.query = query;
            this.informantsIsLoading = true;

            if(this.searchedInformant.promise)
            {
                this.searchedInformant.promise = false;

                setTimeout(() => {
                    Api.http
                        .get(`/users?search=${this.searchedInformant.query}`)
                        .then(response => {
                            this.existingInformants = response.data;
                            this.searchedInformant.promise = true;
                            this.informantsIsLoading = false;
                        });
                }, 400);
            }
        },

        //Link informant to article
        linkInformantToArticle(articleId)
        {
            let vm = this;

            this.articleInformants.forEach(function (value, key)
            {
                if(! (value.pivot && value.pivot.article_id === articleId))
                {
                    Api.http
                        .put(`/articles/${articleId}/informants/${value.id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                vm.articleInformants[key].pivot = {
                                    article_id : articleId,
                                    informant_id : vm.articleInformants[key].id
                                };
                                Vue.toast('Article informant linked successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                            else
                            {
                                Vue.toast('Error in linking the article informant. Please retry again', {
                                    className: ['nau_toast', 'nau_warning'],
                                });
                            }
                        });
                }
            });
        },

        //Delete any informants
        deleteInformants(informant)
        {
            let vm = this;

            vm.articleInformants.forEach(function (value, key)
            {
                if(value.id === informant.id && value.pivot)
                {
                    Api.http
                        .delete(`/articles/${vm.article.id}/informants/${vm.articleInformants[key].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                Vue.toast('Article informant deleted successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                        });
                }
            });
        },

        /**
         * PLACES
         */
        searchPlaces(query)
        {
            this.searchedPlace.query = query;
            this.placesIsLoading = true;

            if(this.searchedPlace.promise)
            {
                this.searchedPlace.promise = false;

                setTimeout(() => {
                    if(this.searchedPlace.query !== '')
                    {
                        Api.http
                            .get(`/places?search=${this.searchedPlace.query}`)
                            .then(response => {
                                this.existingPlaces = response.data;
                                this.searchedPlace.promise = true;
                                this.placesIsLoading = false;
                            });
                    }
                    else
                    {
                        this.searchedPlace.promise = true;
                        this.placesIsLoading = false;
                    }
                }, 400);
            }
        },

        /**
         * CHANNELS
         */
        linkChannelToArticle(articleId)
        {
            Api.http
                .put(`/articles/${articleId}/channels/${this.articleChannel}`)
                .then(response => {
                    if(response.status === 204)
                    {
                        Vue.toast('Article channel linked successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    }
                    else
                    {
                        Vue.toast('Error in linking the article channel. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        /**
         *  PUBLICATION DATE
         */
        changeDate(date)
        {
            this.article.published_at = date;
        },

        /**
         *  ORDER DATE
         */
        changeOrderDate(date)
        {
            this.article.order_date = date;
        },

        /**
         *  NOTIFICATION REGIONS
         */
        //Reset the notification regions when one uncheck the push notification checkbox
        resetArticleRegions()
        {
            let vm = this;

            if(! this.article.push_notification)
            {
                this.regions.forEach(function (value, key)
                {
                    vm.regions[key].checked = false;
                });
            }
        },

        //Submit the notification regions for an article
        submitArticleNotificationRegions(articleId)
        {
            let vm = this;

            this.regions.forEach(function (value, key)
            {
                if(value.checked === true && value.linked !== articleId)
                {
                    vm.linkRegionsToArticle(articleId, key);
                }
                else if(value.linked === articleId && value.checked == false)
                {
                    vm.deleteArticleRegions(articleId, key);
                }
            });
        },

        //Link regions to article
        linkRegionsToArticle(articleId, key)
        {
            Api.http
                .put(`/articles/${articleId}/notification-regions/${this.regions[key].id}`)
                .then(response => {
                    if(response.status === 204)
                    {
                        this.regions[key].linked = articleId;
                        Vue.toast('Article notification region linked successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    }
                    else
                    {
                        Vue.toast('Error in linking the article notification region. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        //Delete any notification regions
        deleteArticleRegions(articleId, key)
        {
            Api.http
                .delete(`/articles/${articleId}/notification-regions/${this.regions[key].id}`)
                .then(response => {
                    if(response.status === 204)
                    {
                        this.regions[key].linked = null;
                        this.regions[key].checked = 0;

                        Vue.toast('Article notification region deleted successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    }
                });
        },
    }
};

export default publishMixin;