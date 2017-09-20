let videoMin = {
    methods: {
        /**
         * VIDEOS
         */
        //Handle when a video is  uploaded
        articleVideosChange: function ()
        {
            var fileElement = document.getElementById('article_videos');
            if (!fileElement) return;
            for (var i = 0; i < fileElement.files.length; i++) {
                var reader = new FileReader();
                reader.readAsDataURL(fileElement.files[i]);
                reader.onload = (e) => {
                    this.articleVideos.push({ video: e.target.result, lead: '', id: null });
                };
            }
        },

        //Get a video after a selection via the modal
        getVideo(id)
        {
            Api.http
                .get(`/videos/${id}`)
                .then(response =>
                {
                    if(response.status === 200)
                    {
                        this.articleVideos.push(response.data);
                    }
                    else
                    {
                        Vue.toast('Error in retrieving the selected video. Please retry again', {
                            className : ['nau_toast','nau_warning'],
                        });
                    }
                });
        },

        //Upload article videos and link them to article
        uploadArticleVideos(articleId)
        {
            let vm = this;

            this.articleVideos.forEach(function (video, key)
            {
                if(! video.id)
                {
                    vm.submitVideoDetails(video, key, articleId);
                }
                else
                {
                    if(! (video.pivot && video.pivot.article_id === articleId))
                    {
                        vm.linkVideoToArticle(video.id, key, articleId);
                    }
                }

            });
        },

        //Submit the video details
        submitVideoDetails(video, key, articleId)
        {
            let vm = this;

            Api.http
                .post(`/videos`, {
                    name: this.article.title,
                    lead: (video.lead !== '') ? video.lead : vm.article.title,
                    source: vm.article.title,
                    user_id: Api.user().id
                })
                .then(response => {
                    if(response.status === 201)
                    {
                        vm.startVideoUpload(response, video, key, articleId);
                    }
                    else
                    {
                        Vue.toast('Error in uploading the selected video. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        //Start the video upload
        startVideoUpload(data, video, key, articleId)
        {
            let uploadUrl = data.data.upload_url;
            let urlArray = uploadUrl.split("api-naut.livesystems.ch");
            let tokenString = urlArray[urlArray.length - 1];

            Api.http
                .put(tokenString, {
                    video : video.video
                })
                .then(response => {
                    if(response.status === 200)
                    {
                        this.completeVideoUpload(response, video, key, articleId);
                    }
                    else
                    {
                        Vue.toast('Error in uploading the selected video. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        //Complete the video upload
        completeVideoUpload(data, video, key, articleId)
        {
            let uploadUrl = data.data.complete_url;
            let urlArray = uploadUrl.split("api-naut.livesystems.ch");
            let tokenString = urlArray[urlArray.length - 1];

            Api.http
                .post(tokenString)
                .then(response => {
                    if (response.status === 200)
                    {
                        video.video = response.data;
                        video.lead = response.data.lead;
                        video.id = response.data.id;
                        this.linkVideoToArticle(video.id, key, articleId);
                    }
                    else {
                        Vue.toast('Error in uploading the selected video. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        //Link the video to the article
        linkVideoToArticle(id, key, articleId)
        {
            Api.http
                .put(`/articles/${articleId}/videos/${id}`)
                .then(response => {
                    if(response.status === 204)
                    {
                        this.articleVideos[key].pivot = {
                            article_id: articleId,
                            element_id: id
                        };
                        Vue.toast('Video linked successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    }
                    else
                    {
                        Vue.toast('Error in linking the video. Please retry again', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                    }
                });
        },

        //Confirm the delete of a video
        confirmVideoDelete(key)
        {
            swal({
                title: 'Bist du sicher?',
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Verwerfen',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ja, entfernen'
            }).then(() => {
                this.deleteArticleVideo(key)
            }).catch(swal.noop);
        },

        //Delete a video from an article
        deleteArticleVideo(key)
        {
            let vm = this;

            if(vm.articleVideos[key].pivot)
            {
                Api.http
                    .delete(`/articles/${vm.article.id}/videos/${vm.articleVideos[key].id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            vm.articleVideos.splice(key, 1);
                            Vue.toast('Article video detached successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                    });
            }
            else
            {
                vm.articleVideos.splice(key, 1);
            }
        },

        //Update a video details
        updateVideo(key)
        {
            let vm = this;

            Api.http
                .put(`/videos/${vm.articleVideos[key].id}`, {
                    lead: vm.articleVideos[key].lead,
                    source: vm.articleVideos[key].source
                })
                .then(response => {
                    if(response.status === 200)
                    {
                        Vue.toast('Article video updated successfully', {
                            className: ['nau_toast', 'nau_success'],
                        });
                    }
                });
        }
    }
};

export default videoMin;
