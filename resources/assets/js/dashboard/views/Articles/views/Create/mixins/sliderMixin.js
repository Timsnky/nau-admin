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
            let vm = this;

            this.articleSliders.forEach(function (value, key)
            {
                if(value.id && value.pivot && value.pivot.article_id === articleId)
                {
                    vm.updateSliderDetails(value, key);
                }
                else
                {
                    vm.createSliderDetails(value, key, articleId)
                }
            })
        },

        //Create a slider details
        createSliderDetails(slider, key, articleId)
        {
            let vm = this;
            Api.http
                .post(`/articles/${articleId}/sliders`, {
                    name: slider.name
                })
                .then(response => {
                    if(response.status === 201)
                    {
                        let images = vm.articleSliders[key].images;
                        vm.articleSliders[key] = response.data;
                        vm.articleSliders[key]['images'] = images;
                        vm.linkImagesToSlider(key);
                        Vue.toast('Article slider added successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    }
                    else
                    {
                        Vue.toast('Error in creating the slider. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        //Update a slider details
        updateSliderDetails(slider, key)
        {
            let vm = this;
            Api.http
                .put(`/articles/${this.article.id}/sliders/${slider.id}`, {
                    name: slider.name
                })
                .then(response => {
                    if(response.status === 200)
                    {
                        let images = vm.articleSliders[key].images;
                        vm.articleSliders[key] = response.data;
                        vm.articleSliders[key]['images'] = images;
                        vm.linkImagesToSlider(key);
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
        linkImagesToSlider(sliderKey)
        {
            let vm = this;

            this.articleSliders[sliderKey].images.forEach(function (value, key)
            {
                if(! (value.pivot.slider_id === vm.articleSliders[sliderKey].id))
                {
                    vm.saveImageLinkToSlider(sliderKey, value.id, key);
                }
                else
                {
                    Api.http
                        .delete(`/sliders/${vm.articleSliders[sliderKey].id}/images/${value.id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                vm.saveImageLinkToSlider(sliderKey, value.id, key);
                            }
                        });
                }
            });
        },

        //Save image link to slider
        saveImageLinkToSlider(sliderKey, imageId, key)
        {
            let vm = this;
            Api.http
                .put(`/sliders/${vm.articleSliders[sliderKey].id}/images/${imageId}`, {
                    'order' : key
                })
                .then(response => {
                    if (response.status === 204)
                    {
                        vm.articleSliders[sliderKey].images[key].pivot.slider_id = vm.articleSliders[sliderKey].id;

                        Vue.toast('Slider image added to article successfully', {
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