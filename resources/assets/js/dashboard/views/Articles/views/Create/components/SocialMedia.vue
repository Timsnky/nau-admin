<template>
    <div class="form-body">
        <div class="form-body">
            <label><b>Social</b></label>
            <div v-for="(articleSocialMedia, index) in articleSocialMedias" class="form-group">
                <div class="form-group">
                    <input
                            type="text"
                            maxlength="100"
                            v-model.trim="articleSocialMedia.url"
                            placeholder="Link hinzufügen"
                            class="form-control article_input">
                    <button
                            @click="confirmDelete(index)"
                            class="btn btn-danger btn-sm delete_btn"
                            type="button"> x
                    </button>
                </div>
                <div class="form-group">
                    <twitter-element :url="articleSocialMedia.url"></twitter-element>
                </div>
            </div>
        </div>
        <div class="form-actions item_add">
            <button
                    @click="addArticleSocialMedia()"
                    class="btn btn-primary item_add_btn"
                    type="button"> +
            </button>
        </div>
        <div class="form-actions">
            <button
                    class="btn btn-primary"
                    type="button"
                    @click="saveArticleSocialMedias(articleId)"
                    :disabled="articleId == null">
                Speichern
            </button>
        </div>
    </div>
</template>

<script>

    import TwitterElement from 'dashboard/components/TwitterTweet';

    export default {
        data() {
            return {
                articleSocialMedias: [
                    {
                        url: '',
                        id: null
                    }
                ],
            }
        },

        props: {
            articleId : {
                type: Number,
            }
        },

        components: {
            TwitterElement
        },

        mounted()
        {
            if(this.articleId)
            {
                this.initializeArticleSocialMedias(this.articleId);
            }
        },

        created()
        {
            this.$parent.$on('duplicateData', this.duplicateData);
        },


        watch: {
            articleId()
            {
                if(this.articleId)
                {
                    this.initializeArticleSocialMedias(this.articleId);
                }
            }
        },

        methods: {
            //Get the data for the social medias linked to the article
            initializeArticleSocialMedias(id)
            {
                Api.http
                    .get(`/articles/${id}/socialmedia`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            if(response.data.length !== 0)
                            {
                                this.articleSocialMedias = response.data;
                            }
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the article social medias. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Add an article social media item
            addArticleSocialMedia()
            {
                this.articleSocialMedias.push({url: '', id: null});
            },

            //Confirm the deletion of an item
            confirmDelete(key)
            {
                swal({
                    title: 'Are you sure?',
                    text: "The entry can not be restored!",
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Abort',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete!'
                }).then(() => {
                    this.deleteArticleSocialMedia(key)
                }).catch(swal.noop);
            },

            //Delete a social media article
            deleteArticleSocialMedia(key)
            {
                let vm = this;

                if(vm.articleSocialMedias[key].id)
                {
                    Api.http
                        .delete(`/articles/${vm.articleId}/socialmedia/${vm.articleSocialMedias[key].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                vm.articleSocialMedias.splice(key, 1);
                                Vue.toast('Article social media item deleted successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                        });
                }
                else
                {
                    vm.articleSocialMedias.splice(key, 1);
                }
            },

            //Save an article social media record
            saveArticleSocialMedias(articleId)
            {
                let vm = this;

                this.articleSocialMedias.forEach(function (value, key)
                {
                    if(value.url !== '')
                    {
                        if(value.id && articleId === vm.articleId)
                        {
                            Api.http
                                .put(`/socialmedia/${value.id}`, {
                                    url: value.url,
                                })
                                .then(response => {
                                    if(response.status === 200)
                                    {
                                        vm.articleSocialMedias[key] = response.data;
                                        Vue.toast('Social media item updated successfully', {
                                            className: ['nau_toast', 'nau_success'],
                                        });
                                    }
                                });
                        }
                        else
                        {
                            Api.http
                                .post(`/socialmedia`, {
                                    url: value.url,
                                })
                                .then(response => {
                                    if(response.status === 201)
                                    {
                                        vm.articleSocialMedias[key] = response.data;
                                        vm.linkSocialMediaToArticle(response.data.id, articleId);
                                        Vue.toast('Social media item created successfully', {
                                            className: ['nau_toast', 'nau_success'],
                                        });
                                    }
                                });
                        }
                    }
                });
            },

            //Link a social media item to an article
            linkSocialMediaToArticle(id, articleId)
            {
                Api.http
                    .put(`/articles/${articleId}/socialmedia/${id}`)
                    .then(response => {
                        if(response.status === 204)
                        {
                            Vue.toast('Social media item linked successfully', {
                                className: ['nau_toast', 'nau_success'],
                            });
                        }
                        else
                        {
                            Vue.toast('Error in linking the social media item. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Duplicate the data to another article
            duplicateData(articleId)
            {
                this.saveArticleSocialMedias(articleId);
            }
        }
    }
</script>

<style>

</style>
