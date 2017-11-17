<template>
    <div class="form-body">
        <div class="form-body">
            <label><b>Info Boxes</b></label>
            <div v-for="(articleInfoBox, index) in articleInfoBoxes" class="form-group wysihtmlInfoBox">
                <div id="infoBox-toolbar" style="display: none;" class="wysihtml_toolbar text-right">
                </div>
                <textarea
                        id="infoBoxEditor"
                        v-model.trim="articleInfoBox.content"
                        placeholder="Here is some text input"
                        class="form-control articleEditor"
                        rows="5">
                                </textarea>
                <div class="form-actions">
                    <button
                            class="btn btn-danger remove_btn"
                            type="button"
                            @click="confirmDelete(index)">
                        Remove InfoBox
                    </button>
                </div>
            </div>
        </div>
        <div class="form-actions item_add">
            <button
                    @click="addArticleInfoBox()"
                    class="btn blue item_add_btn"
                    :disabled="articleInfoBoxes.length >= 5"
                    type="button"> +
            </button>
        </div>
        <div class="form-actions">
            <button
                    class="btn blue"
                    type="button"
                    @click="saveArticleInfoBoxes()"
                    :disabled="articleId == null">
                Save info box
            </button>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                articleInfoBoxes: [
                    {
                        id: null,
                        content: ''
                    }
                ],
                articleInfoBoxEditors: [
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
                this.initializeArticleInfoBoxes(this.articleId);
            }
            else
            {
                this.initializeInfoBoxEditor(this, 0);
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
                    this.initializeArticleInfoBoxes(this.articleId);
                }
            }
        },

        methods: {
            //Get the data for the info boxes linked to the article
            initializeArticleInfoBoxes(id)
            {
                Api.http
                    .get(`/articles/${id}/infoboxes`)
                    .then(response => {
                        if(response.status === 200)
                        {
                            if(response.data.length !== 0)
                            {
                                this.articleInfoBoxes = response.data;
                            }

                            let vm = this;

                            setTimeout(() =>
                            {
                                this.articleInfoBoxes.forEach(function (value, key)
                                {
                                    vm.initializeInfoBoxEditor(vm, key);
                                })
                            }, 100);
                        }
                        else
                        {
                            Vue.toast('Error in retrieving the article info boxes. Please retry again', {
                                className: ['nau_toast', 'nau_warning'],
                            });
                        }
                    });
            },

            //Initialize info box editors
            initializeInfoBoxEditor(vm, id)
            {
                let infoBoxSection = $($('.wysihtmlInfoBox')).get(id);

                let infoBoxEditor = new wysihtml5.Editor($(infoBoxSection).find('#infoBoxEditor').get(0), {
                    toolbar: $(infoBoxSection).find('#infoBox-toolbar').get(0),
                    parserRules: wysihtml5ParserRules
                }).on("change", function () {
                    vm.articleInfoBoxes[id].content = this.getValue();
                });

                vm.articleInfoBoxEditors.push({editor: infoBoxEditor});
            },

            //Add an info box
            addArticleInfoBox()
            {
                let vm = this;
                this.articleInfoBoxes.push({content: '', id: null});
                setTimeout(() =>
                {
                    vm.initializeInfoBoxEditor(vm, vm.articleInfoBoxes.length - 1);
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
                    this.deleteArticleInfoBox(key)
                }).catch(swal.noop);
            },

            //Delete an article info box
            deleteArticleInfoBox(key)
            {
                let vm = this;

                if(vm.articleInfoBoxes[key].id)
                {
                    Api.http
                        .delete(`/articles/${vm.articleId}/infoboxes/${vm.articleInfoBoxes[key].id}`)
                        .then(response => {
                            if(response.status === 204)
                            {
                                vm.deleteLocalInfoBox(vm, key);
                                Vue.toast('Article infobox deleted successfully', {
                                    className: ['nau_toast', 'nau_success'],
                                });
                            }
                        });
                }
                else
                {
                    vm.deleteLocalInfoBox(vm, key);
                }
            },

            //Delete the info box record from local data
            deleteLocalInfoBox(vm, key)
            {
                vm.articleInfoBoxEditors[vm.articleInfoBoxes.length - 1].editor.destroy();
                vm.articleInfoBoxes.splice(key, 1);
                vm.articleInfoBoxEditors.splice(vm.articleInfoBoxEditors.length - 1, 1);

                vm.articleInfoBoxEditors.forEach(function (value, key)
                {
                    value.editor.setValue(vm.articleInfoBoxes[key].content);
                });
            },

            //Save the info boxes for the articles
            saveArticleInfoBoxes()
            {
                this.articleInfoBoxWithContent = false;
                let vm = this;

                this.articleInfoBoxes.forEach(function (value, key)
                {
                    value.content = vm.articleInfoBoxEditors[key].editor.getValue();

                    if(value.content !== '')
                    {
                        vm.articleInfoBoxWithContent = true;

                        if(value.id)
                        {
                            Api.http
                                .put(`/articles/${vm.articleId}/infoboxes/${value.id}`, {
                                    content: value.content,
                                })
                                .then(response => {
                                    if(response.status === 200)
                                    {
                                        vm.articleInfoBoxes[key] = response.data;
                                        Vue.toast('Article info box updated successfully', {
                                            className: ['nau_toast', 'nau_success'],
                                        });
                                    }
                                });
                        }
                        else
                        {
                            Api.http
                                .post(`/articles/${vm.articleId}/infoboxes`, {
                                    content: value.content,
                                })
                                .then(response => {
                                    if(response.status === 201)
                                    {
                                        vm.articleInfoBoxes[key] = response.data;
                                        Vue.toast('Article infobox created successfully', {
                                            className: ['nau_toast', 'nau_success'],
                                        });
                                    }
                                });
                        }
                    }
                });

                if(! this.articleInfoBoxWithContent)
                {
                    Vue.toast('Please make sure that you have content in the infoboxes', {
                        className: ['nau_toast', 'nau_warning'],
                    });
                }
            },
        },

        beforeDestroy: function ()
        {
            this.articleInfoBoxEditors.forEach(function (value, key)
            {
                value.editor.destroy();
            });
        }
    }
</script>

<style>

</style>
