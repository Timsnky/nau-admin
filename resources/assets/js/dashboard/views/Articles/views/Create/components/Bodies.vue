<template>
    <div class="form-body">
        <div class="form-body">
            <label><b>Artikel-Text</b></label>
            <div v-for="(articleBody, index) in articleBodies" class="form-group wysihtmlBody">

                <div id="body-toolbar" style="display: none;" class="wysihtml_toolbar text-right">
                    <a data-wysihtml5-command="bold" title="CTRL+B" class="btn btn-primary btn-sm">Fett</a>
                    <a data-wysihtml5-command="createLink" class="btn btn-primary btn-sm">Link</a>

                    <div data-wysihtml5-dialog="createLink" style="display: none;" class="toolbar_url">
                        <input data-wysihtml5-dialog-field="href" class="form-control" value="http://">
                        <a data-wysihtml5-dialog-action="save" class="btn btn-primary btn-sm">OK</a>&nbsp;&nbsp;&nbsp;<a data-wysihtml5-dialog-action="cancel" class="btn btn-danger btn-sm">Cancel</a>
                    </div>
                </div>
                <textarea
                        id="bodyEditor"
                        v-model.trim="articleBody.content"
                        placeholder="Untertitel mit Fett setzen"
                        class="form-control articleEditor"
                        rows="5">
                                </textarea>
                <div class="form-actions">
                    <button
                            class="btn btn-danger remove_btn"
                            type="button"
                            @click="confirmDelete(index)">
                        Artikel-Text Iöschen
                    </button>
                </div>
            </div>
        </div>
        <div class="form-actions item_add">
            <button
                    @click="addArticleBody()"
                    class="btn btn-primary item_add_btn"
                    :disabled="articleBodies.length >= 5"
                    type="button"> +
            </button>
        </div>
        <div class="form-actions">
            <button
                    class="btn btn-primary"
                    type="button"
                    @click="saveArticleBodies(articleId)"
                    :disabled="articleId == null">
                Artikel-Text speichern
            </button>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                articleBodies: [
                    {
                        content: '',
                        id: null
                    }
                ],
                articleBodyEditors: [
                ],
                articleBodyWithContent: false,
            }
        },

        props: {
            articleId : {
                type: Number,
            }
        },

        mounted()
        {
            if(this.articleId)
            {
                this.initializeArticleBodies(this.articleId);
            }
        },

        created()
        {
            this.$parent.$on('duplicateData', this.duplicateData);
            this.$parent.$on('saveData', this.saveArticleBodies);
        },


        watch: {
            articleId()
            {
                if(this.articleId)
                {
                    this.initializeArticleBodies(this.articleId);
                }
            }
        },

        methods: {
            //Get the data for the bodies linked to the article
            initializeArticleBodies(id)
            {
                Api.http
                    .get(`/articles/${id}/bodies`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            if(response.data.length !== 0)
                            {
                                this.articleBodies = response.data;
                            }

                            let vm = this;

                            setTimeout(() =>
                            {
                                this.articleBodies.forEach(function (value, key)
                                {
                                    vm.initializeBodyEditor(vm, key);
                                })
                            }, 100);
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the article bodies. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Initialize body editors
            initializeBodyEditor(vm, id)
            {
                let bodySection = $($('.wysihtmlBody')).get(id);

                let bodyEditor = new wysihtml5.Editor($(bodySection).find('#bodyEditor').get(0), {
                    toolbar: $(bodySection).find('#body-toolbar').get(0),
                    parserRules: wysihtml5ParserRules
                }).on("change", function () {
                    vm.articleBodies[id].content = this.getValue();
                });

                vm.articleBodyEditors.push({editor: bodyEditor});
            },

            //Add an article body
            addArticleBody()
            {
                let vm = this;
                this.articleBodies.push({content: '', id: null});
                setTimeout(() =>
                {
                    vm.initializeBodyEditor(vm, vm.articleBodies.length - 1);
                }, 100);
            },

            //Confirm the deletion of an item
            confirmDelete(key)
            {
                swal({
                    title: 'Bist du sicher?',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'Verwerfen',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ja, löschen'
                }).then(() => {
                    this.deleteArticleBody(key)
                }).catch(swal.noop);
            },

            //Delete an article body
            deleteArticleBody(key)
            {
                let vm = this;

                if(vm.articleBodies[key].id)
                {
                    Api.http
                        .delete(`/bodies/${vm.articleBodies[key].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                vm.deleteLocalBody(vm, key);
                                Vue.toast('Article body deleted successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                        });
                }
                else
                {
                    vm.deleteLocalBody(vm, key);
                }
            },

            //Delete the body record from local data
            deleteLocalBody(vm, key)
            {
                vm.articleBodyEditors[vm.articleBodies.length - 1].editor.destroy();
                vm.articleBodies.splice(key, 1);
                vm.articleBodyEditors.splice(vm.articleBodyEditors.length - 1, 1);

                vm.articleBodyEditors.forEach(function (value, key)
                {
                    value.editor.setValue(vm.articleBodies[key].content);
                });
            },

            //Save the bodies for the articles
            saveArticleBodies(articleId)
            {
                this.articleBodyWithContent = false;
                let vm = this;

                this.articleBodies.forEach(function (value, key)
                {
                    value.content = vm.articleBodyEditors[key].editor.getValue();

                    if(value.content !== '')
                    {
                        vm.articleBodyWithContent = true;

                        if(value.id && vm.articleId === articleId)
                        {
                            Api.http
                                .put(`/bodies/${value.id}`, {
                                    content: value.content,
                                })
                                .then(response => {
                                    if(response.status === 200)
                                    {
                                        vm.articleBodies[key] = response.data;
                                        Vue.toast('Article body updated successfully', {
                                            className: ['nau_toast', 'nau_success'],
                                        });
                                    }
                                });
                        }
                        else
                        {
                            Api.http
                                .post(`/articles/${articleId}/bodies`, {
                                    content: value.content,
                                })
                                .then(response => {
                                    if(response.status === 201)
                                    {
                                        vm.articleBodies[key] = response.data;
                                        Vue.toast('Article body created successfully', {
                                            className: ['nau_toast', 'nau_success'],
                                        });
                                    }
                                });
                        }
                    }
                });

                if(! (this.articleBodyWithContent && this.articleId === articleId))
                {
                    Vue.toast('Please make sure that you have content in the body', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            },

            //Duplicate the data based on the supplied articleid
            duplicateData(articleId)
            {
                this.saveArticleBodies(articleId);
            }
        },

        beforeDestroy: function ()
        {
            this.articleBodyEditors.forEach(function (value, key)
            {
                value.editor.destroy();
            });
        }
    }
</script>

<style>

</style>
