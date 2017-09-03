let initializationMixin = {
    /**
     * INITIALIZE THE ARTICLE (EDIT ONLY)
     */
    initialiseArticle(id)
    {
        Api.http
            .get(`/articles/${id}`)
            .then(response => {
                if(response.status === 200)
                {
                    if(response.data.image)
                    {
                        this.articleMainImage = response.data.image;
                    }
                    this.article = response.data;
                    this.articleTitle = this.article.title;
                    delete this.article['image'];
                    this.initializeLeadEditor(this);
                    if(this.article.teaser_id)
                    {
                        this.initializeArticleTeaserImage(this.article.teaser_id);
                    }
                    this.initializeArticleImages(id);
                    this.initializeArticleSliders(id);
                    this.initializeArticleVideos(id);
                    this.initializeArticleAuthors(id);
                    this.initializeArticleInformants(id);
                    this.initializeArticleElements(id);
                }
                else
                {
                    Vue.toast('Error in retrieving the article for edit. Please retry again', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            });
    },

    //Initialise article teaser image
    initializeArticleTeaserImage(id)
    {
        Api.http
            .get(`/images/${id}`)
            .then(response => {
                if(response.status === 200)
                {
                    this.articleTeaserImage = response.data;
                }
                else
                {
                    Vue.toast('Error in retrieving the article teaser image. Please retry again', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            });
    },

    //Get the images linked to the article
    initializeArticleImages(id)
    {
        let vm = this;
        Api.http
            .get(`/articles/${id}/images`)
            .then(response => {
                if(response.status === 200)
                {
                    this.articleImages = response.data;

                    this.articleImages.forEach(function (value, key)
                    {
                        value.selectedSource = "";
                    })
                }
                else
                {
                    Vue.toast('Error in retrieving the article images. Please retry again', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            });
    },

    //Get the sliders and images for the article
    initializeArticleSliders(id)
    {
        Api.http
            .get(`/articles/${id}/sliders`)
            .then(response => {
                if(response.status === 200)
                {
                    this.articleSliders = response.data;
                    let vm = this;

                    this.articleSliders.forEach(function (value, key)
                    {
                        vm.initializeSliderImages(key);
                    })
                }
                else
                {
                    Vue.toast('Error in retrieving the article images. Please retry again', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            });
    },

    //Get the slider images for a given slider
    initializeSliderImages(key)
    {
        Api.http
            .get(`/sliders/${this.articleSliders[key].id}/images`)
            .then(response => {
                if(response.status === 200)
                {
                    this.articleSliders[key].images = response.data;
                }
                else
                {
                    Vue.toast('Error in retrieving the article images. Please retry again', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            });

    },

    //Get the videos linked to the article
    initializeArticleVideos(id)
    {
        Api.http
            .get(`/articles/${id}/videos`)
            .then(response => {
                if(response.status === 200)
                {
                    this.articleVideos = response.data;
                }
                else
                {
                    Vue.toast('Error in retrieving the article videos. Please retry again', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            });
    },

    //Get the authors for the article
    initializeArticleAuthors(id)
    {
        Api.http
            .get(`/articles/${id}/authors`)
            .then(response => {
                if(response.status === 200)
                {
                    this.articleAuthors = response.data;
                }
                else
                {
                    Vue.toast('Error in retrieving the authors. Please retry again', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            });
    },

    //Get the informants for the article
    initializeArticleInformants(id)
    {
        Api.http
            .get(`/articles/${id}/informants`)
            .then(response => {
                if(response.status === 200)
                {
                    this.articleInformants = response.data;
                }
                else
                {
                    Vue.toast('Error in retrieving the informants. Please retry again', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            });
    },

    //Get the channels for the dropdown
    initializeChannels()
    {
        Api.http
            .get(`/channels`)
            .then(response => {
                if(response.status === 200)
                {
                    this.existingChannels = response.data;
                    this.articleChannel = this.existingChannels[0].id;
                }
                else
                {
                    Vue.toast('Error in retrieving the channels. Please retry again', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            });

    },

    //Get the article elements for ordering
    initializeArticleElements(id)
    {
        Api.http
            .get(`/articles/${id}/elements`)
            .then(response => {
                if(response.status === 200)
                {
                    this.articleElements = response.data;
                }
                else
                {
                    Vue.toast('Error in retrieving the elements. Please retry again', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            });
    },

    /**
     * EDITORS
     */
    //Initialize the editors when creating an article
    initializeEditors()
    {
        this.initializeLeadEditor(this);
    },

    //Initialize lead editor
    initializeLeadEditor(vm)
    {
        let leadSection = $($('.wysihtmlLead')).get(0);

        let leadEditor = new wysihtml5.Editor($(leadSection).find('#leadEditor').get(0), {
            toolbar:      $(leadSection).find('#lead-toolbar').get(0),
            parserRules:  wysihtml5ParserRules,
        }).on("load", function ()
        {
            let ed = this;
            $('.wysihtml5-sandbox').contents().find('body').on("keyup", function(event) {
                vm.article.lead = ed.getValue();
            });
        }).on("change", function () {
            vm.article.lead = this.getValue();
        });

        this.leadEditor = leadEditor;
    },
};

export default initializationMixin;