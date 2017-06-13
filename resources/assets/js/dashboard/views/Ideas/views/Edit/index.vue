<template>
    <div>
        <page-title title="Edit Idea" sub="sub heading"/>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        v-model.trim="newIdea.title"
                        placeholder="Add title"
                        class="form-control">
                </div>

                <div class="form-group">
                    <label for="body">Idea</label>
                    <textarea
                        id="body"
                        name="body"
                        v-model.trim="newIdea.body"
                        placeholder="Edit idea"
                        class="form-control"
                        rows="5"></textarea>
                </div>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!newIdea.title || !newIdea.body">
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
                idea: {},
                newIdea: {}
            }
        },

        mounted() {
            request
                .get(`/ideas/${this.$route.params.id}`)
                .then(response => {
                    this.idea = response.data;
                    this.newIdea = _pick(this.idea, ['title', 'body']);
                })
                .catch(err => console.log('Show some error message here'));
        },

        methods: {
            handleSubmit() {
                const { title, body } = this.newIdea;

                if (title && body) {
                    request
                        .put(`/ideas/${this.idea.id}`, { title, body })
                        .then(response => this.$router.push('/ideas'))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.newIdea = _pick(this.idea, ['title', 'body']);
            }
        }
    }
</script>
