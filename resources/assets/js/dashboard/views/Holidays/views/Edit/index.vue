<template>
    <div>
        <page-title title="Holidays" sub="Edit" />

        <form @submit.prevent="handleSubmit">
            <div class="form-body">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        v-model.trim="newHoliday.name"
                        placeholder="Add name"
                        class="form-control">
                </div>

                <div class="form-group">
                    <label>Date</label>
                    <date-time
                        @changeDate="changeDate"
                        :date="newHoliday.date" />
                </div>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!newHoliday.name || !newHoliday.date">
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
                holiday: {},
                newHoliday: {}
            }
        },

        components: {
            dateTime: DateTime,
        },

        created() {
            request
                .get(`/holidays/${this.$route.params.id}`)
                .then(response => {
                    this.holiday = response.data;
                    this.newHoliday = {
                        name: this.holiday.name,
                        date: moment(this.holiday.date).format('YYYY-MM-DD')
                    };
                })
                .catch(err => console.log('Show some error message here'));
        },

        methods: {
            handleSubmit() {
                const { name, date } = this.newHoliday;

                if (name && date) {
                    request
                        .put(`/holidays/${this.holiday.id}`, { name, date })
                        .then(response => this.$router.push('/holidays'))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.newHoliday = {
                    name: this.holiday.name,
                    date: moment(this.holiday.date).format('YYYY-MM-DD')
                };
            },

            changeDate(date) {
                this.newHoliday.date = date;
            }
        }
    }
</script>
