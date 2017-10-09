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
                    <date-time v-model="newHoliday.date" format="DD.MM.YYYY" />
                </div>
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!newHoliday.name || !newHoliday.date">
                    Edit
                </button>
                <button
                    class="btn btn-default"
                    type="button"
                    @click="reset">
                    Reset
                </button>
                <router-link class="btn btn-danger" :to="{name: 'holidays.list'}">Cancel</router-link>
            </div>
        </form>
    </div>
</template>

<script>
    import _pick from 'lodash/pick';
    import DateTime from 'dashboard/components/DateTime';

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
            Api.http
                .get(`/holidays/${this.$route.params.id}`)
                .then(response => {
                    this.holiday = response.data;
                    this.newHoliday = {
                        name: this.holiday.name,
                        date: moment(this.holiday.date)
                    };
                })
                .catch(err => console.log('Show some error message here'));
        },

        methods: {
            handleSubmit() {
                Api.http
                    .put(`/holidays/${this.holiday.id}`, {
                        name: this.newHoliday.name,
                        date: this.newHoliday.date.format('YYYY-MM-DD')
                    })
                    .then(response => this.$router.push('/holidays'))
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
