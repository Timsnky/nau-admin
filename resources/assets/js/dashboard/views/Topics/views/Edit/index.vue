<template>
    <div>
        <page-title title="Topics" sub="Edit" />

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label>Date</label>
                    <date-time
                        @changeDate="changeDate"
                        :date="newTopic.date" />
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
    import DateTime from 'dashboard/components/DateTime';
    import request from 'dashboard/utils/request';

    export default {
        data() {
            return {
                topic: {},
                newTopic: {}
            }
        },

        components: {
            dateTime: DateTime,
        },

        created() {
            request
                .get(`/topics/${this.$route.params.id}`)
                .then(response => {
                    this.topic = response.data;
                    this.newTopic = {
                        name: this.topic.name,
                        date: moment(this.topic.date).format('YYYY-MM-DD')
                    };
                })
                .catch(err => console.log('Show some error message here'));
        },

        methods: {
            handleSubmit() {
                const { name, date } = this.newTopic;

                if (name && date) {
                    request
                        .put(`/topics/${this.topic.id}`, { name, date })
                        .then(response => this.$router.push({name: 'resources.week'}))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.newTopic = {
                    name: this.topic.name,
                    date: moment(this.topic.date).format('YYYY-MM-DD')
                };
            },

            changeDate(date) {
                this.newTopic.date = date;
            }
        }
    }
</script>
