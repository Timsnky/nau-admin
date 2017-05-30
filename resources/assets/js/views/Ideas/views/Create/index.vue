<template>
    <div>
        <page-title title="Create Idea" sub="sub heading"></page-title>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        v-model="idea.title"
                        placeholder="Add title"
                        class="form-control">
                </div>

                <div class="form-group">
                    <label for="text">Idea</label>
                    <textarea
                        id="text"
                        name="text"
                        v-model="idea.text"
                        placeholder="Add idea"
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
    export default {
        data() {
            return {
                idea: {
                    title: '',
                    text: ''
                }
            }
        },

        methods: {
            handleSubmit() {
                console.log('submit', this.idea);
                const { title, text } = this.idea;

                if (title && text) {
                    axios
                        .post('https://api-naut.livesystems.ch/ideas', { title, text })
                        .then(response => this.$router.push('/customers'))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.idea = {
                    title: '',
                    text: ''
                }
            }
        }
    }
</script>
