<template>
    <div class="form-body">
        <div class="form-body">
            <label><b>Artikel-Text</b></label>
            <div v-for="(articleBody, index) in articleBodies" class="form-group wysihtmlBody">

                <div id="body-toolbar" style="display: none;" class="wysihtml_toolbar">
                    <div class="row">
                        <div class="col-md-2 col-sm-3 col-xs-4">
                            <div class="btn-group">
                                <a data-wysihtml5-command="bold" title="CTRL+B" class="btn blue btn-outline btn-sm"><i class="fa fa-bold"></i></a>
                                <a data-wysihtml5-command="createLink" class="btn blue btn-outline btn-sm"><i class="fa fa-link"></i></a>
                            </div>
                        </div>

                        <div data-wysihtml5-dialog="createLink" style="display: none;">
                            <div class="col-md-6">
                                <input data-wysihtml5-dialog-field="href" class="form-control input-sm" value="http://">
                            </div>
                            <div class="col-md-2">
                                <div class="btn-group">
                                    <a data-wysihtml5-dialog-action="save" class="btn blue btn-sm">Hinzufügen</a>
                                    <a data-wysihtml5-dialog-action="cancel" class="btn btn-danger btn-sm"><i class="fa fa-times"></i></a>
                                </div>
                            </div>
                        </div>
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
                    class="btn blue item_add_btn"
                    type="button"> +
            </button>
        </div>
        <div class="form-actions">
            <button
                    class="btn blue"
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
                var articleBodyWithContent = false;
                let vm = this;

                var bodies = this.articleBodies.filter((value, key) => {
                    value.content = this.articleBodyEditors[key].editor.getValue();

                    return value.content !== '';
                });

                Api.http
                    .put(`/articles/${articleId}`, { bodies })
                    .then(response => {
                        if(response.status === 200) {
                            response.data.bodies.forEach((value, key) => {
                                this.articleBodies[key] = value;
                                this.articleBodyEditors[key].editor.setValue(this.articleBodies[key].content);
                                Vue.toast('Atikel Texte gespeichert', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            });
                        }
                    })
                    .catch(error => {
                        Vue.toast('Fehler beim speichern der Texte', {
                            className: ['nau_toast', 'nau_warning'],
                        });
                        console.error(error);
                    });
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
