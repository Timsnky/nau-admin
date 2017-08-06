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
                        placeholder="Type to search or add tag (at least 6 tags required)"
                        label="tag"
                        :max-height="500"
                        :options-limit="100"
                        :clear-on-select="false"
                        :close-on-select="false"
                        track-by="id"
                        :multiple="true"
                        :taggable="true"
                        open-direction="bottom"
                        :internal-search="false"
                        :loading="tagIsLoading"
                        @tag="addArticleTag"
                        @search-change="searchTags"
                        @remove="deleteTags">
                </multiselect>
            </div>

            <div class="form-group">
                <label>Related Stories</label>
                <multiselect
                        id="relatedStoriesMultiSelect"
                        v-model="articleRelatedStories"
                        :options="existingRelatedStories"
                        placeholder="Type to search related story (at least one story required)"
                        label="title"
                        :max-height="500"
                        :options-limit="100"
                        :clear-on-select="false"
                        :close-on-select="false"
                        track-by="id"
                        :multiple="true"
                        open-direction="bottom"
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
                    @click="saveArticleTagsAndRelatedStories()"
                    :disabled="articleId == null">
                Save
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
                searchedTag: {
                    query: '',
                    promise: true
                },
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
            this.$parent.$on('sendData', this.sendData);
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
                    id: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000)),
                    created_at: null
                };
                this.existingTags.push(tag);
                this.articleTags.push(tag);
            },

            //Call the server to search for tags
            searchTags(query)
            {
                this.searchedTag.query = query;
                this.tagIsLoading = true;

                if(this.searchedTag.promise)
                {
                    this.searchedTag.promise = false;

                    setTimeout(() => {
                        Api.http
                            .get(`/tags?search=${this.searchedTag.query}`)
                            .then(response => {
                                this.existingTags = response.data;
                                this.searchedTag.promise = true;
                                this.tagIsLoading = false;
                            });
                    }, 400);
                }
            },

            //Validate the article
            validateTagsAndRelatedStories()
            {
                let errorString = "";
                let errorArray = [];

                if(this.articleTags.length < 6)
                {
                    errorArray.push('at least 6 tags');
                }

                if(this.articleRelatedStories.length < 1)
                {
                    errorArray.push('at least 1 related story');
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
            saveArticleTagsAndRelatedStories()
            {
                let errorString = this.validateTagsAndRelatedStories();

                if(errorString !== "")
                {
                    Vue.toast('Please provide ' + errorString + ' for the article in order to save', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
                else
                {
                    this.saveArticleTags();
                    this.linkRelatedStoriesToArticle();
                }
            },

            //Save the article tags
            saveArticleTags()
            {
                let vm = this;

                this.articleTags.forEach(function (value, key)
                {
                    if(value.created_at)
                    {
                        Api.http
                            .put(`/tags/${value.id}`, {
                                tag: value.tag,
                            })
                            .then(response => {
                                if(response.status === 200)
                                {
                                    let pivot = null;

                                    if(vm.articleTags[key].pivot)
                                    {
                                        pivot = vm.articleTags[key].pivot
                                    }
                                    vm.articleTags[key] = response.data;
                                    vm.articleTags[key].pivot = pivot;
                                    vm.linkTagToArticle(key);
                                    Vue.toast('Article tags updated successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                            });
                    }
                    else
                    {
                        Api.http
                            .post(`/tags`, {
                                tag: value.tag,
                            })
                            .then(response => {
                                if(response.status === 201)
                                {
                                    let pivot = null;

                                    if(vm.articleTags[key].pivot)
                                    {
                                        pivot = vm.articleTags[key].pivot
                                    }
                                    vm.articleTags[key] = response.data;
                                    vm.articleTags[key].pivot = pivot;
                                    vm.linkTagToArticle(key);
                                    Vue.toast('Article tags created successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                            });
                    }
                });
            },

            //Link a tag to an article
            linkTagToArticle(key)
            {
                if(! this.articleTags[key].pivot)
                {
                    Api.http
                        .put(`/articles/${this.articleId}/tags/${this.articleTags[key].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                this.articleTags[key].pivot = {
                                    article_id : this.articleId,
                                    tag_id : this.articleTags[key].id
                                };
                                Vue.toast('Article tag item linked successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                            else
                            {
                                Vue.toast('Error in linking the article tag item. Please retry again', {
                                    className: ['nau_toast', 'nau_warning'],
                                });
                            }
                        });
                }
            },

            //Delete a tag
            deleteTags(tag)
            {
                let vm = this;

                vm.articleTags.forEach(function (value, key)
                {
                    if(value.id === tag.id && value.created_at)
                    {

                        Api.http
                            .delete(`/articles/${vm.articleId}/tags/${vm.articleTags[key].id}`)
                            .then(response => {
                                if(response.status === 204)
                                {
                                    Vue.toast('Article tags deleted successfully', {
                                        className: ['nau_toast', 'nau_success'],
                                    });
                                }
                            });
                    }
                });
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
                                this.existingRelatedStories = response.data;
                                this.searchedRelatedStory.promise = true;
                                this.relatedStoryIsLoading = false;
                            });
                    }, 400);
                }
            },

            //Link related story to article
            linkRelatedStoriesToArticle()
            {
                let vm = this;

                this.articleRelatedStories.forEach(function (value, key)
                {
                    if(! value.linked)
                    {
                        Api.http
                            .put(`/articles/${vm.articleId}/related/${value.id}`)
                            .then(response => {
                                if(response.status === 204)
                                {
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
        }
    }
</script>

<style>

</style>
