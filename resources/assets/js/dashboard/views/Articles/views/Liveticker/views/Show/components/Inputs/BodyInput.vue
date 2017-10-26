<template>
    <div>
        <div class="form-group wysihtmlBody">
            <label for="body">Text</label>
            <div style="display: none;" class="wysihtml_toolbar body-toolbar text-right">
                    <a data-wysihtml5-command="bold" title="CTRL+B" class="btn btn-primary btn-sm">Fett</a>
                    <a data-wysihtml5-command="createLink" class="btn btn-primary btn-sm">Link</a>

                    <div data-wysihtml5-dialog="createLink" style="display: none;" class="toolbar_url">
                        <input data-wysihtml5-dialog-field="href" class="form-control" value="http://">
                        <a data-wysihtml5-dialog-action="save" class="btn btn-primary btn-sm">OK</a>&nbsp;&nbsp;&nbsp;<a data-wysihtml5-dialog-action="cancel" class="btn btn-danger btn-sm">Cancel</a>
                    </div>
                </div>
                <textarea
                    v-model.trim="content"
                    placeholder="Untertitel mit Fett setzen"
                    class="form-control articleEditor"
                    rows="5">
                </textarea>
        </div>

        <div class="form-group">
            <button :disabled="this.content === ''" type="button" class="btn btn-primary" @click="post">Posten</button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                content: '',
                editor: null,
            }
        },

        mounted() {
            let bodySection = $('.wysihtmlBody');
            var vm = this;

            this.editor = new wysihtml5.Editor($(bodySection).find('textarea').get(0), {
                toolbar: $(bodySection).find('.body-toolbar').get(0),
                parserRules: wysihtml5ParserRules
            }).on("change",function() {
                console.log(this.getValue());
                vm.content = this.getValue();
            });
        },

        beforeDestroy()
        {
            this.editor.destroy();
        },

        methods: {
            post() {
                Api.http
                    .post(`/bodies`, {
                        content: this.editor.getValue(),
                    }).then(response => {
                        var body = response.data;

                        Api.http
                            .put(`/livetickers/${this.$route.params.article}/bodies/${body.id}`)
                            .then(response => {
                                this.$emit('new-post');
                                Vue.toast('Liveticker wurde erstellt', {
                                    className : ['nau_toast','et-info'],
                                });
                            });
                    });
            },
        },
    }
</script>
