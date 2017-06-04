<template>
    <div>
        <page-title
            title="Create Topic"
            sub="sub heading"/>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label>Date</label>
                    <date-time
                        @changeDate="changeDate"
                        :date="topic.date"/>
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
    import DateTime from 'views/components/DateTime';
    import request from 'utils/request';

    export default {
        data() {
            return {
                topic: {
                    name: '',
                    date: moment().format('YYYY-MM-DD')
                }
            }
        },

        components: {
            dateTime: DateTime,
        },

        methods: {
            handleSubmit() {
                const { name, date } = this.topic;

                if (name && date) {
                    request
                        .post('/topics', { name, date })
                        .then(response => this.$router.push({name: 'resources.week'}))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.topic = {
                    name: '',
                    date: moment().format('YYYY-MM-DD')
                }
            },

            changeDate(date) {
                this.topic.date = date;
            }
        }
    }
</script>
