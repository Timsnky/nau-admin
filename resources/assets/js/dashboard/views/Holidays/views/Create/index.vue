<template>
    <div>
        <page-title
            title="Create Holiday"
            sub="sub heading"/>

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        v-model.trim="holiday.name"
                        placeholder="Add name"
                        class="form-control">
                </div>
            </div>

            <div class="form-group">
                <label>Date</label>
                <date-time
                    @changeDate="changeDate"
                    :date="holiday.date"/>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!holiday.name || !holiday.date">
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
    import DateTime from 'dashboard/components/DateTime';
    import request from 'dashboard/utils/request';

    export default {
        data() {
            return {
                holiday: {
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
                const { title, lead, dateline } = this.article;

                if (title && lead && dateline) {
                    request
                        .post('/articles', { title, lead, dateline })
                        .then(response => this.$router.push('/articles'))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.holiday = {
                    name: '',
                    date: moment().format('YYYY-MM-DD')
                }
            },

            changeDate(date) {
                this.holiday.date = date;
            }
        }
    }
</script>
