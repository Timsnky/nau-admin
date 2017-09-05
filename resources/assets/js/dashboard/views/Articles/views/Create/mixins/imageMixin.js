let imageMixin = {
    methods: {
        /**
         * IMAGES
         */
        //Handle when images are uploaded
        articleImagesChange: function () {
            var fileElement = document.getElementById('article_images');
            if (!fileElement) return;
            for (var i = 0; i < fileElement.files.length; i++) {
                var reader = new FileReader();
                reader.readAsDataURL(fileElement.files[i]);
                reader.onload = (e) => {
                    this.articleImages.push({ url: e.target.result, lead: '', id: null });
                };
            }
        },

        //Save selected source of article image
        imageSourceSelected(key)
        {
            this.articleImages[key].source = this.articleImages[key].selectedSource;
        },

        //Upload article images and link them to article
        uploadArticleImages(articleId)
        {
            let vm = this;

            this.articleImages.forEach(function (value, key)
            {
                if(! value.id)
                {
                    Api.http
                        .post(`/images`, {
                            image: value.url,
                            name: vm.article.title,
                            source: vm.article.title,
                            lead: (value.lead !== '') ? value.lead : vm.article.title,
                        })
                        .then(response => {
                            if(response.status === 201)
                            {
                                vm.articleImages[key] = response.data;
                                vm.linkImageToArticle(key, articleId);
                            }
                            else
                            {
                                Vue.toast('Error in uploading the selected Image. Please retry again', {
                                    className: ['nau_toast', 'nau_warning'],
                                });
                            }
                        });
                }
                else
                {
                    Api.http
                        .put(`/images/${value.id}`, {
                            image: value.url,
                            name: value.name,
                            source: value.source,
                            lead: value.lead,
                        })
                        .then(response => {
                            if(response.status === 200)
                            {
                            }
                            else
                            {
                                Vue.toast('Error in uploading the selected Image. Please retry again', {
                                    className: ['nau_toast', 'nau_warning'],
                                });
                            }
                        });

                    if(! (value.pivot && value.pivot.article_id === articleId))
                    {
                        vm.linkImageToArticle(key, articleId);
                    }
                }
            });
        },

        //Link an image to an article
        linkImageToArticle(key, articleId)
        {
            Api.http
                .put(`/articles/${articleId}/images/${this.articleImages[key].id}`)
                .then(response => {
                    if (response.status === 204)
                    {
                        this.articleImages[key].pivot = {
                            article_id: articleId,
                            element_id: this.articleImages[key].id
                        };

                        Vue.toast('Image added to article successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    }
                    else
                    {
                        Vue.toast('Error in linking the image. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        //Confirm the delete of an image
        confirmArticleImageDelete(key)
        {
            swal({
                title: 'Bist du sicher?',
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Verwerfen',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ja, löschen'
            }).then(() => {
                this.deleteArticleImage(key)
            }).catch(swal.noop);
        },

        //Delete an image from an article
        deleteArticleImage(key)
        {
            let vm = this;

            if(vm.articleImages[key].pivot)
            {
                Api.http
                    .delete(`/articles/${vm.article.id}/images/${vm.articleImages[key].id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            vm.articleImages.splice(key, 1);
                            Vue.toast('Article image detached successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                    });
            }
            else
            {
                vm.articleImages.splice(key, 1);

                Vue.toast('Article image detached successfully', {
                    className: ['nau_toast', 'nau_success'],
                });
            }
        },

        //Update an image details
        updateImage(key)
        {
            let vm = this;

            Api.http
                .put(`/images/${vm.articleImages[key].id}`, {
                    lead: vm.articleImages[key].lead,
                    source: vm.articleImages[key].source
                })
                .then(response => {
                    if(response.status === 200)
                    {
                        Vue.toast('Article image updated successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    }
                });
        }
    }
};

export default imageMixin;