<template>
    <div>
        <page-title
            title="Create Topic"
            sub="sub heading"/>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="date">Date</label>
                    <input
                        id="date"
                        type="text"
                        name="date"
                        v-model.trim="topic.date"
                        placeholder="Add date"
                        class="form-control">
                </div>

                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        v-model.trim="topic.name"
                        placeholder="Add name"
                        class="form-control">
                </div>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!topic.name || !topic.date">
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
    import request from 'utils/request';

    export default {
        data() {
            return {
                topic: {
                    name: '',
                    date: ''
                }
            }
        },

        methods: {
            handleSubmit() {
                const { name, date } = this.topic;

                if (name && date) {
                    request
                        .post('/topics', { name, date })
                        .then(response => console.log(response))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.topic = {
                    name: ''
                }
            }
        }
    }
</script>
