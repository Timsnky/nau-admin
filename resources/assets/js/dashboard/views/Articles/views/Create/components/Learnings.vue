<template>
    <div class="form-body">
        <div class="form-body">
            <p>Learnings</p>
            <div v-for="(articleLearning, index) in articleLearnings" class="form-group">
                <div class="form-group">
                    <input
                            type="text"
                            maxlength="100"
                            v-model.trim="articleLearning.text"
                            placeholder="Input text (max 100chars)"
                            class="form-control article_input">
                    <button
                            @click="confirmDelete(index)"
                            class="btn btn-danger btn-sm delete_btn"
                            type="button"> x
                    </button>
                    <character-counter :limit="100" :itemString="articleLearning.text"></character-counter>
                </div>
            </div>
        </div>
        <div class="form-actions item_add">
            <button
                    @click="addArticleLearning()"
                    class="btn btn-primary item_add_btn"
                    :disabled="articleLearnings.length >= 5"
                    type="button"> +
            </button>
        </div>
        <div class="form-actions">
            <button
                    class="btn btn-primary"
                    type="button"
                    @click="saveArticleLearnings(articleId)">
                Save learnings
            </button>
        </div>
    </div>
</template>

<script>

    import CharacterCounter from 'dashboard/components/CharacterCounter';

    export default {
        data() {
            return {
                articleLearnings: [
                    {
                        text: '',
                        id: null
                    },
                    {
                        text: '',
                        id: null
                    },
                    {
                        text: '',
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
            CharacterCounter
        },

        mounted()
        {
            if(this.articleId)
            {
                this.initializeArticleLearnings(this.articleId);
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
                    this.initializeArticleLearnings(this.articleId);
                }
            }
        },

        methods: {
            //Get the data for the learnings linked to the article
            initializeArticleLearnings(id)
            {
                Api.http
                    .get(`/articles/${id}/learnings`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            if(response.data.length !== 0)
                            {
                                this.articleLearnings = response.data;
                            }
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the article learnings. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            /**
             * ARTICLE LEARNINGS
             */
            //Add article learnings
            addArticleLearning()
            {
                if(this.articleLearnings.length < 5)
                {
                    this.articleLearnings.push({text: '', id: null});
                }
                else
                {
                    Vue.toast('Only a maximum of 5 learnings can be added', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            },

            //Validate learnings save
            validateLearnings(articleId, limit)
            {
                if(articleId !== this.articleId)
                {
                    return false;
                }

                let totalLearnings = 0;

                this.articleLearnings.forEach(function (value, key)
                {
                    if(value.text !== '')
                    {
                        totalLearnings ++;
                    }
                });

                return ! (totalLearnings >= limit);
            },

            //Save article learnings
            saveArticleLearnings(articleId)
            {
                let vm = this;

                if(! this.validateLearnings(articleId, 3))
                {
                    this.articleLearnings.forEach(function (value, key)
                    {
                        if (value.id && articleId === vm.articleId)
                        {
                            Api.http
                                .put(`/articles/${articleId}/learnings/${value.id}`, {
                                    text: value.text,
                                })
                                .then(response => {
                                    if (response.status === 200)
                                    {
                                        vm.articleLearnings[key] = response.data;
                                        Vue.toast('Article learnings updated successfully', {
                                            className: ['nau_toast', 'nau_success'],
                                        });
                                    }
                                    else
                                    {
                                        Vue.toast('Error in updating the learning. Please retry again', {
                                            className: ['nau_toast', 'nau_warning'],
                                        });
                                    }
                                });
                        }
                        else
                        {
                            if (value.text !== '')
                            {
                                Api.http
                                    .post(`/articles/${articleId}/learnings`, {
                                        text: value.text,
                                    })
                                    .then(response => {
                                        if (response.status === 201)
                                        {
                                            vm.articleLearnings[key] = response.data;
                                            Vue.toast('Article learnings created successfully', {
                                                className: ['nau_toast', 'nau_success'],
                                            });
                                        }
                                        else
                                        {
                                            Vue.toast('Error in creating the learning. Please retry again', {
                                                className: ['nau_toast', 'nau_warning'],
                                            });
                                        }
                                    });
                            }
                        }
                    });
                }
                else
                {
                    Vue.toast('Please provide at least 3 learnings inorder to save', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            },

            //Confirm the deletion of an item
            confirmDelete(key)
            {
                if(! this.validateLearnings(this.articleId, 4))
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
                        this.deleteArticleLearning(key)
                    }).catch(swal.noop);
                }
                else
                {
                    Vue.toast('Please provide more than three learnings in order to be allowed to delete', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            },

            //Delete a learning
            deleteArticleLearning(key)
            {
                let vm = this;

                if(vm.articleLearnings[key].id)
                {
                    Api.http
                        .delete(`/articles/${vm.articleId}/learnings/${vm.articleLearnings[key].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                vm.articleLearnings.splice(key, 1);
                                Vue.toast('Article learning deleted successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                        });
                }
                else
                {
                    vm.articleLearnings.splice(key, 1);
                    Vue.toast('Article learning deleted successfully', {
                        className: ['nau_toast', 'nau_success'],
                    });
                }
            },

            //Duplicate the data based on the article id
            duplicateData(articleId)
            {
                this.saveArticleLearnings(articleId);
            }
        }
    }
</script>

<style>

</style>
