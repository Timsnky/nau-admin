<template>
    <div>
        <page-title title="Holidays" sub="Create" />

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
                <date-time v-model="holiday.date" format="DD.MM.YYYY" />
            </div>

            <div class="form-actions">
                <button
                    class="btn btn-primary"
                    type="submit"
                    :disabled="!holiday.name || !holiday.date">
                    Create
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
    import DateTime from 'dashboard/components/DateTime';

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
                Api.http
                    .post('/holidays', {
                        name: this.holiday.name,
                        date: this.holiday.date.format('YYYY-MM-DD')
                    })
                    .then(response => this.$router.push({name: 'holidays.list'}))
            },

            reset() {
                this.holiday = {
                    name: '',
                    date: moment().format('YYYY-MM-DD')
                }
            },
        }
    }
</script>
