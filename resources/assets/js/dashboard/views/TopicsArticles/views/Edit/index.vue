<template>
    <div>
        <page-title
            title="Edit Article"
            sub="sub heading"/>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        v-model.trim="newArticle.title"
                        placeholder="Add title"
                        class="form-control">
                </div>
            </div>

            <div class="form-body">
                <div class="form-group">
                    <label for="lead">Lead</label>
                    <input
                        id="lead"
                        type="text"
                        name="lead"
                        v-model.trim="newArticle.lead"
                        placeholder="Add lead"
                        class="form-control">
                </div>
            </div>

            <div class="form-body">
                <div class="form-group">
                    <label for="dateline">Dateline</label>
                    <input
                        id="dateline"
                        type="text"
                        name="dateline"
                        v-model.trim="newArticle.dateline"
                        placeholder="Add dateline"
                        class="form-control">
                </div>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!newArticle.title || !newArticle.dateline || !newArticle.dateline">
                    Submit
                </button>
                <button
                    class="btn btn-default"
                    type="button"
                    @click="reset">
                    Reset
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import _pick from 'lodash/pick';
    import request from 'dashboard/utils/request';

    export default {
        data() {
            return {
                article: {},
                newArticle: {}
            };
        },

        created() {
            request
                .get(`/articles/${this.$route.params.articleID}`)
                .then(response => {
                    this.article = response.data;
                    this.newArticle = _pick(this.article, ['title', 'lead', 'dateline']);
                })
                .catch(err => console.log('Show some error message here'));
        },

        methods: {
            handleSubmit() {
                const { title, lead, dateline } = this.newArticle;

                if (title && lead && dateline) {
                    request
                        .put(`/topics/${this.$route.params.topicID}/articles/${this.article.id}`, { title, lead, dateline })
                        .then(response => this.$router.push('/articles'))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },
            reset() {
                this.newArticle = _pick(this.article, ['title', 'lead', 'dateline']);
            }
        }
    }
</script>
