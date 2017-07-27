<template>
    <div>
        <div class="form-group">
            <label for="body">Kommentar</label>
            <multiselect v-model="comment" :options="comments" :show-labels="false" :custom-label="customLabel" placeholder="Kommentar auswählen">
                <template slot="option" scope="props">
                    <img class="avatar" :src="props.option.author.avatar">
                    <span>
                        <span>
                            <b>{{ props.option.author.name }}</b><br>
                            <span class="linebreaks">{{ props.option.content }}</span>
                        </span>
                    </span>
                </template>
            </multiselect>
        </div>

        <div class="form-group">
            <button :disabled="!this.comment" type="button" class="btn btn-primary" @click="post">Posten</button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                comment: {},
                comments: [],
            }
        },

        methods: {
            post() {
                Api.http
                    .put(`/livetickers/${this.$route.params.article}/comments/${this.comment.id}`)
                    .then(response => {
                        this.$emit('new-post');
                        Vue.toast('Liveticker wurde erstellt', {
                            className : ['nau_toast','et-info'],
                        });
                    });
            },

            customLabel (comment) {
                return comment.content;
            },
        },

        mounted() {
            Api.http
                .get(`/articles/${this.$route.params.article}/comments`)
                .then(response => {
                    this.comments = response.data;
                });
        },
    }
</script>

<style lang="scss">
    .avatar {
        float: left;
        border-radius: 50% !important;
        width: 30px;
        height: 30px;
        margin-right: 1em;
    }

    .comment {
        vertical-align: top;
    }

    .linebreaks {
        white-space: pre-line;
    }
</style>
