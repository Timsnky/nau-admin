<template>
    <div>
        <div class="form-group">
            <label for="body">Text</label>
            <textarea v-model="content" id="body" class="form-control" placeholder="text"></textarea>
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
            }
        },

        methods: {
            post() {
                Api.http
                    .post(`/bodies`, {
                        content: this.content,
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
