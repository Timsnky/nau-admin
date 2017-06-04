<template>
    <div>
        <page-title
            title="Edit Topic"
            sub="sub heading"/>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="date">Date</label>
                    <input
                        id="date"
                        type="text"
                        name="date"
                        v-model.trim="newTopic.date"
                        placeholder="Add date"
                        class="form-control">
                </div>

                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        v-model.trim="newTopic.name"
                        placeholder="Add name"
                        class="form-control">
                </div>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!newTopic.name || !newTopic.date">
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
    import request from 'utils/request';

    export default {
        data() {
            return {
                topic: {},
                newTopic: {}
            }
        },

        created() {
            request
                .get(`/topics/${this.$route.params.id}`)
                .then(response => {
                    this.topic = response.data;
                    this.newTopic = _pick(this.topic, ['name', 'date']);
                })
                .catch(err => console.log('Show some error message here'));
        },

        methods: {
            handleSubmit() {
                const { name, date } = this.newTopic;

                if (name && date) {
                    request
                        .put(`/topics/${this.topic.id}`, { name, date })
                        .then(response => console.log(response))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.newTopic = _pick(this.topic, ['name', 'date']);
            }
        }
    }
</script>
