<template>
    <div class="form-body">
        <div class="form-body">
            <div class="form-group">
                <label>Tags</label>
                <multiselect
                        id="tagsMultiSelect"
                        v-model="articleTags"
                        :options="existingTags"
                        tag-placeholder="Add this as new tag"
                        placeholder="Tags hinzufügen"
                        label="tag"
                        :max-height="500"
                        :options-limit="100"
                        :clear-on-select="false"
                        :close-on-select="false"
                        :hide-selected="true"
                        track-by="id"
                        :multiple="true"
                        :taggable="true"
                        open-direction="bottom"
                        :internal-search="false"
                        :loading="tagIsLoading"
                        @tag="addArticleTag"
                        @search-change="searchTags"
                        @remove="deleteTag">
                </multiselect>
            </div>

            <div class="form-group">
                <label>Verwandte Artikel</label>
                <multiselect
                        id="relatedStoriesMultiSelect"
                        v-model="articleRelatedStories"
                        :options="existingRelatedStories"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :hide-selected="true"
                        :preserve-search="true"
                        placeholder="Verwandte Artikel hinzufügen"
                        open-direction="bottom"
                        label="title"
                        track-by="id"
                        :internal-search="false"
                        :loading="relatedStoryIsLoading"
                        @search-change="searchRelatedStories"
                        @remove="deleteRelatedArticles">
                </multiselect>
            </div>
        </div>
        <div class="form-actions">
            <button
                    class="btn btn-primary"
                    type="button"
                    @click="saveArticleTagsAndRelatedStories(articleId)"
                    :disabled="articleId == null">
                Speichern
            </button>
        </div>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';

    export default {
        data() {
            return {
                articleTags: [
                ],
                existingTags: [
                ],
                deletedTags: [],
                originalTags: [],
                tagIsLoading: false,
                articleRelatedStories: [
                ],
                existingRelatedStories: [
                ],
                searchedRelatedStory: {
                    query: '',
                    promise: true
                },
                relatedStoryIsLoading: false
            }
        },

        props: {
            articleId : {
                type: Number,
            }
        },

        components: {
            Multiselect
        },

        mounted()
        {
            if(this.articleId)
            {
                this.initializeArticleTags(this.articleId);
                this.initializeArticleRelatedStories(this.articleId);
            }
        },

        created()
        {
            this.$parent.$on('duplicateData', this.duplicateData);
            this.$parent.$on('saveData', this.saveArticleTagsAndRelatedStories);
        },

        watch: {
            articleId()
            {
                if(this.articleId)
                {
                    this.initializeArticleTags(this.articleId);
                    this.initializeArticleRelatedStories(this.articleId);
                }
            }
        },

        methods: {
            //Get the tags for the article
            initializeArticleTags(id)
            {
                Api.http
                    .get(`/articles/${id}/tags`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.originalTags = response.data.map((tag) => { return tag.tag });
                            this.articleTags = response.data;
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the tags. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Get the related stories for the article
            initializeArticleRelatedStories(id)
            {
                Api.http
                    .get(`/articles/${id}/related`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            this.articleRelatedStories = response.data;

                            this.articleRelatedStories.forEach(function (value, key)
                            {
                                value.linked = 1;
                            })
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the related stories. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            /**
             * ARTICLE TAGS
             */
            //Add a new tag to an article
            addArticleTag(newTag)
            {
                const tag = {
                    tag: newTag,
                    id: null,
                };
                this.articleTags.push(tag);
            },

            //Call the server to search for tags
            searchTags: _.debounce(function(query)
            {
                this.tagIsLoading = true;
                Api.http
                    .get(`/tags?search=${query}`)
                    .then(response => {
                        this.existingTags = response.data;
                        this.tagIsLoading = false;
                    });
            }, 400),

            //Validate the article
            validateTagsAndRelatedStories(articleId)
            {
                let errorString = "";
                let errorArray = [];

                if(articleId !== this.articleId)
                {
                    return errorString;
                }

                if(errorArray.length === 1)
                {
                    errorString = errorArray[0];
                }
                else if(errorArray.length === 2)
                {
                    errorString = errorArray[0] + ' and ' + errorArray[1];
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
                            errorString += 'and ' + value;
                        }
                    });
                }

                return errorString;
            },

            //Save Article tags and related stories
            saveArticleTagsAndRelatedStories(articleId)
            {
                let errorString = this.validateTagsAndRelatedStories(articleId);

                if(errorString !== "")
                {
                    Vue.toast('Please provide ' + errorString + ' for the article in order to save', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
                else
                {
                    this.saveArticleTags(articleId);
                    this.linkRelatedStoriesToArticle(articleId);
                }
            },

            //Save the article tags
            async saveArticleTags(articleId)
            {
                this.deletedTags.forEach(async (tag, key) => {
                    if(this.deletedTags.indexOf(tag) !== -1) {
                        await this.unlinkTagFromArticle(articleId, tag);
                        this.deletedTags.splice(this.deletedTags.indexOf(tag), 1)
                    }
                });

                this.articleTags.forEach(async (tag, key) => {
                    if(tag.id == null) {
                        tag = await this.createNewTag(tag);
                        await this.linkTagToArticle(articleId, tag);
                    } else if(this.originalTags.indexOf(tag.tag) === -1) {
                        await this.linkTagToArticle(articleId, tag);
                    }
                });

                this.originalTags = this.articleTags.map((tag) => { return tag.tag });
            },

            createNewTag(tag) {
                return Api.http.post('/tags', {tag: tag.tag})
                    .then((response) => { return response.data });
            },

            //Link a tag to an article
            linkTagToArticle(articleId, tag)
            {
                return Api.http
                    .put(`/articles/${articleId}/tags/${tag.id}`)
                    .then(response => {
                        return response.data;
                    })
                    .catch(error => {
                        console.error(error);
                    })
            },

            unlinkTagFromArticle(articleId, tag) {
                return Api.http.delete(`/articles/${articleId}/tags/${tag.id}`);
            },

            //Delete a tag
            deleteTag(tag)
            {
                if(tag.id === null) {
                    return;
                }

                this.deletedTags.push(tag);
            },

            /**
             * ARTICLE RELATED STORIES
             */
            //Search for a related story
            searchRelatedStories(query)
            {
                this.searchedRelatedStory.query = query;
                this.relatedStoryIsLoading = true;

                if(this.searchedRelatedStory.promise)
                {
                    this.searchedRelatedStory.promise = false;

                    setTimeout(() => {
                        Api.http
                            .get(`/articles?search=${this.searchedRelatedStory.query}`)
                            .then(response => {
                                this.existingRelatedStories = response.data.data;
                                this.searchedRelatedStory.promise = true;
                                this.relatedStoryIsLoading = false;
                            });
                    }, 400);
                }
            },

            //Link related story to article
            linkRelatedStoriesToArticle(articleId)
            {
                let vm = this;

                this.articleRelatedStories.forEach(function (value, key)
                {
                    if(! (value.linked && articleId === vm.articleId))
                    {
                        Api.http
                            .put(`/articles/${articleId}/related/${value.id}`)
                            .then(response => {
                                if(response.status === 204)
                                {
                                    vm.articleRelatedStories[key].linked = 1;
                                    Vue.toast('Article related story linked successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                                else
                                {
                                    Vue.toast('Error in linking the article related story item. Please retry again', {
                                        className: ['nau_toast', 'nau_warning'],
                                    });
                                }
                            });
                    }
                });
            },

            //Delete any related articles
            deleteRelatedArticles(article)
            {
                let vm = this;

                vm.articleRelatedStories.forEach(function (value, key)
                {
                    if(value.id === article.id && value.created_at)
                    {
                        Api.http
                            .delete(`/articles/${vm.articleId}/related/${vm.articleRelatedStories[key].id}`)
                            .then(response => {
                                if(response.status === 204)
                                {
                                    Vue.toast('Article related story deleted successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                            });
                    }
                });
            },

            //Duplicate the data based on the article id
            duplicateData(articleId)
            {
                this.saveArticleTagsAndRelatedStories(articleId);
            }
        }
    }
</script>
