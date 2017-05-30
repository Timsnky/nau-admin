<template>
    <div>
        <page-title title="Edit Idea" sub="sub heading"></page-title>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        v-model="newIdea.title"
                        placeholder="Add title"
                        class="form-control">
                </div>

                <div class="form-group">
                    <label for="text">Idea</label>
                    <textarea
                        id="text"
                        name="text"
                        v-model="newIdea.text"
                        placeholder="Edit idea"
                        class="form-control"
                        rows="5"></textarea>
                </div>
            </div>

            <div class="form-actions">
                <button class="btn blue" type="submit">Submit</button>
                <button class="btn default" type="button" @click="reset">Reset</button>
            </div>
        </form>
    </div>
</template>

<script>
    import _pick from 'lodash/pick';

    export default {
        data() {
            return {
                idea: {},
                newIdea: {}
            }
        },

        mounted() {
            axios
                .get(`https://api-naut.livesystems.ch/ideas/${this.$route.params.id}`)
                .then(response => {
                    this.idea = response.data;
                    this.newIdea = _pick(this.idea, ['title', 'text']);
                })
                .catch(err => console.log('Show some error message here'));
        },

        methods: {
            handleSubmit() {
                console.log('submit', this.newIdea);
                const { title, text } = this.newIdea;

                if (title && text) {
                    axios
                        .put(`https://api-naut.livesystems.ch/ideas/${this.idea.id}`, { title, text })
                        .then(response => this.$router.push('/ideas'))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.newIdea = _pick(this.idea, ['title', 'text']);
            }
        }
    }
</script>
