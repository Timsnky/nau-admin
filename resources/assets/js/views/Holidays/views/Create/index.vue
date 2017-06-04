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

                <div class="form-group">
                    <label for="date">Date</label>
                    <input
                        id="date"
                        type="text"
                        name="date"
                        v-model.trim="holiday.date"
                        placeholder="Add date"
                        class="form-control">
                </div>
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
    import request from 'utils/request';

    export default {
        data() {
            return {
                holiday: {
                    name: '',
                    date: ''
                }
            }
        },

        methods: {
            handleSubmit() {
                const { name, date } = this.holiday;

                if (name && date) {
                    request
                        .post('/holidays', { name, date })
                        .then(response => console.log(response))
                        .catch(err => console.log('Show some error message here'));
                } else {
                    console.log('Show some error message here');
                }
            },

            reset() {
                this.holiday = {
                    name: ''
                }
            }
        }
    }
</script>
