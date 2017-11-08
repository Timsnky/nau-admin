let sliderMixin = {
    methods: {
        /**
         * SLIDERS
         */
        //Add an article slider
        addArticleSlider()
        {
            this.articleSliders.push({name: '', id: null, images: []});
        },

        //Confirm the delete of a slider
        confirmSliderDelete(key)
        {
            swal({
                title: 'Bist du sicher?',
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Verwerfen',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ja, löschen'
            }).then(() => {
                this.deleteArticleSlider(key)
            }).catch(swal.noop);
        },

        //Remove article slider
        deleteArticleSlider(key)
        {
            let vm = this;

            if(vm.articleSliders[key].id)
            {
                Api.http
                    .delete(`/articles/${vm.article.id}/sliders/${vm.articleSliders[key].id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            vm.articleSliders.splice(key, 1);
                            Vue.toast('Article slider detached successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                    });
            }
            else
            {
                vm.articleSliders.splice(key, 1);
            }
        },

        //Create or Update a slider
        uploadArticleSliders(articleId)
        {
            this.articleSliders.forEach((value, key) => {
                if(value.id) {
                    this.updateSliderDetails(value, key);
                } else {
                    this.createSliderDetails(value, key, articleId)
                }
            })
        },

        //Create a slider details
        createSliderDetails(slider, key, articleId)
        {
            Api.http
                .post(`/articles/${articleId}/sliders`, {
                    name: slider.name
                })
                .then(async (response) => {
                    if(response.status === 201) {
                        this.$set(this.articleSliders, key, $.extend(this.articleSliders[key], response.data));
                        await this.linkImagesToSlider(key);
                        Vue.toast('Article slider added successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    } else {
                        Vue.toast('Error in creating the slider. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        //Update a slider details
        updateSliderDetails(slider, key)
        {
            Api.http
                .put(`/articles/${this.article.id}/sliders/${slider.id}`, {
                    name: slider.name
                })
                .then(async (response) => {
                    if(response.status === 200) {
                        await this.linkImagesToSlider(key);
                        this.$set(this.articleSliders, key, $.extend(this.articleSliders[key], response.data));
                        Vue.toast('Article slider updated successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    }
                    else
                    {
                        Vue.toast('Error in updating the slider. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        //Link images to the slider
        async linkImagesToSlider(sliderKey)
        {
            return new Promise((resolve, reject) => {
                var promises = [];
                this.articleSliders[sliderKey].images.forEach((value, key) => {
                    if(value.pivot.slider_id !== this.articleSliders[sliderKey].id || value.pivot.slider_id == null) {
                        promises.push(this.saveImageLinkToSlider(sliderKey, value.id, key));
                    } else if(value.pivot.order === key) {
                        // Nothing has changed in the ordering
                        return;
                    } else {
                        promises.push(Api.http
                            .delete(`/sliders/${this.articleSliders[sliderKey].id}/images/${value.id}`)
                            .then(response => {
                                if(response.status === 204)
                                {
                                    this.saveImageLinkToSlider(sliderKey, value.id, key);
                                }
                            })
                            .catch((error) => {
                                reject(error);
                            })
                        )
                    }
                });

                Promise.all(promises).then(() => {
                    resolve(true);
                });
            });
        },

        //Save image link to slider
        saveImageLinkToSlider(sliderKey, imageId, key)
        {
            return Api.http
                .put(`/sliders/${this.articleSliders[sliderKey].id}/images/${imageId}`, {
                    'order' : key
                })
                .then(response => {
                    if (response.status === 204) {
                        this.articleSliders[sliderKey].images[key].pivot.slider_id = this.articleSliders[sliderKey].id;
                        this.articleSliders[sliderKey].images[key].pivot.order = key;

                        Vue.toast('Slider image added to article successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    } else {
                        Vue.toast('Error in linking the image. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        //Confirm the delete of a slider image
        confirmSliderImageDelete(key, imageKey)
        {
            swal({
                title: 'Bist du sicher?',
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Verwerfen',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ja, löschen'
            }).then(() => {
                this.deleteSliderImage(key, imageKey)
            }).catch(swal.noop);
        },

        //Delete an image from a slider
        deleteSliderImage(key, imageKey)
        {
            let vm = this;

            if(! (vm.articleSliders[key].id) || ! (vm.articleSliders[key].images[imageKey].pivot.slider_id))
            {
                vm.articleSliders[key].images.splice(imageKey, 1);
            }
            else
            {
                Api.http
                    .delete(`/sliders/${vm.articleSliders[key].id}/images/${vm.articleSliders[key].images[imageKey].id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            vm.articleSliders[key].images.splice(imageKey, 1);
                            Vue.toast('Article slider image detached successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                    });
            }
        },

        //Update an image details
        updateSliderImage(key, imageKey)
        {
            let vm = this;

            Api.http
                .put(`/images/${vm.articleSliders[key].images[imageKey].id}`, {
                    lead: vm.articleSliders[key].images[imageKey].lead,
                    source: vm.articleSliders[key].images[imageKey].source
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

export default sliderMixin;
