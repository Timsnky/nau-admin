let mainArticleImageMixin = {
    methods: {
        /**
         * MAIN ARTICLE IMAGE
         */
        //Receive the image from the upload button
        mainArticleImageChange() {
            let fileInput = document.getElementById('article_image');
            let file = fileInput.files[0];

            if (!file.type.match('image.*')) {
                Vue.toast('The selected file is not an image. Please select and image and retry.', {
                    className : ['nau_toast','nau_warning'],
                });
                return;
            }

            let reader = new FileReader();
            let vm = this;

            reader.onload = function (e) {
                vm.articleMainImage.url = e.target.result;
                vm.articleMainImage.id = null;

            };

            reader.readAsDataURL(file);
        },

        //Trigger the image selection modal
        showImageSelectionModal(type, key) // 2, null
        {
            if(key !== null)
            {
                this.selectectedSlider = key;
            }

            this.type = type;

            Api.setImageSelector(this.type);
            this.saveImageType(this.type);

            $('#imageSelectionModal').modal('show');
        },

        //Save the image type in store
        saveImageType(type) // 2
        {
            let imageType = 0;

            if(type === 1)
            {
                imageType = 1;
            }
            else if(type === 2 || type === 3)
            {
                imageType = [0, 1];
            }
            else if(type === 4)
            {
                imageType = 2;
            }

            Api.setImageType(imageType);
            this.$emit('imageTypeChange');
        },

        //Get the image once we have obtained the selected id
        getMainImage(id) {
            Api.http
                .get(`/images/${id}`)
                .then(response =>
                {
                    if(response.status === 200)
                    {
                        if(this.type === 1)
                        {
                            this.articleMainImage = response.data;
                        }
                        else if(this.type === 2)
                        {
                            this.articleImages.push(response.data);
                        }
                        else if(this.type === 3)
                        {
                            let sliderImage = response.data;
                            sliderImage.pivot = {
                                order: '',
                                slider_id: null
                            };
                            this.articleSliders[this.selectectedSlider].images.push(sliderImage);
                        }
                        else if(this.type === 4)
                        {
                            this.articleTeaserImage = response.data;
                        }
                        else {

                        }
                    }
                    else
                    {
                        Vue.toast('Error in retrieving the selected Image. Please retry again', {
                            className : ['nau_toast','nau_warning'],
                        });
                    }
                });
        },

        //Submit article image
        submitArticleImage(articleId)
        {
            if(this.articleMainImage.url)
            {
                if (this.articleMainImage.id)
                {
                    this.linkMainImageToArticle(articleId);
                }
                else
                {
                    Api.http
                        .post(`/images`, {
                            image: this.articleMainImage.url,
                            name: this.article.title,
                            source: this.article.title,
                            lead: this.article.title
                        })
                        .then(response => {

                            if(response.status === 201)
                            {
                                this.articleMainImage = response.data;
                                this.linkMainImageToArticle(articleId);
                            }
                            else
                            {
                                Vue.toast('Error in uploading the selected Image. Please retry again', {
                                    className: ['nau_toast', 'nau_warning'],
                                });
                            }
                        });
                }
            }
        },

        /**
         * TEASER IMAGE
         */
        //Receive the teaser image from the upload button
        teaserArticleImageChange() {
            let fileInput = document.getElementById('article_teaser_image');
            let file = fileInput.files[0];

            if (!file.type.match('image.*')) {
                Vue.toast('The selected file is not an image. Please select and image and retry.', {
                    className : ['nau_toast','nau_warning'],
                });
                return;
            }

            let reader = new FileReader();
            let vm = this;

            reader.onload = function (e) {
                vm.articleTeaserImage.url = e.target.result;
                vm.articleTeaserImage.id = null;
            };

            reader.readAsDataURL(file);
        },

        //Submit article teaser image
        submitArticleTeaserImage(articleId)
        {
            if(this.articleTeaserImage.url)
            {
                if (this.articleTeaserImage.id)
                {
                    this.linkTeaserImageToArticle(articleId);
                }
                else
                {
                    Api.http
                        .post(`/images`, {
                            image: this.articleTeaserImage.url,
                            name: this.article.title,
                            source: this.article.title,
                            lead: this.article.title
                        })
                        .then(response => {

                            if(response.status === 201)
                            {
                                this.articleTeaserImage = response.data;
                                this.linkTeaserImageToArticle(articleId);
                            }
                            else
                            {
                                Vue.toast('Error in uploading the selected Image. Please retry again', {
                                    className: ['nau_toast', 'nau_warning'],
                                });
                            }
                        });
                }
            }
        },

        //Link the teaser image to an article
        linkTeaserImageToArticle(articleId)
        {
            Api.http
                .put(`/articles/${articleId}/teaser/${this.articleTeaserImage.id}`)
                .then(response => {
                    if(response.status === 204)
                    {
                        this.article.teaser_id = this.articleTeaserImage.id;

                        Vue.toast('Article teaser image added successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    }
                    else
                    {
                        Vue.toast('Error in updating the article teaser image. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        //Delete the teaser image for an article
        deleteTeaserImage(articleId)
        {
            if(articleId && this.article.teaser_id)
            {
                Api.http
                    .delete(`/articles/${articleId}/teaser/${this.articleTeaserImage.id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            this. articleTeaserImage = { 'url': null, 'id': null};

                            Vue.toast('Article teaser image deleted successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in deleting the article teaser image. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            }
            else
            {
                if(this.articleTeaserImage.url)
                {
                    this. articleTeaserImage = { 'url': null, 'id': null};

                    Vue.toast('Article teaser image deleted successfully', {
                        className: ['nau_toast', 'nau_success'],
                    });
                }
            }
        },
    }
};

export default mainArticleImageMixin;
