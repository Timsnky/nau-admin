<template>
    <div>
        <page-title title="Create Idea" sub="sub heading"/>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        v-model.trim="idea.title"
                        placeholder="Add title"
                        class="form-control">
                </div>

                <div class="form-group">
                    <label for="body">Idea</label>
                    <textarea
                        id="body"
                        name="body"
                        v-model.trim="idea.body"
                        placeholder="Add idea"
                        class="form-control"
                        rows="5"></textarea>
                </div>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!idea.title || !idea.body">
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
    import request from 'dashboard/utils/request';

    export default {
        data() {
            return {
                idea: {
                    title: '',
                    body: ''
                }
            }
        },

        methods: {
            handleSubmit() {
                const { title, body } = this.idea;

                if (title && body) {
                    request
                        .post('/ideas', { title, body })
                        .then(response => this.$router.push('/ideas'))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.idea = {
                    title: '',
                    body: ''
                }
            }
        }
    }
</script>
