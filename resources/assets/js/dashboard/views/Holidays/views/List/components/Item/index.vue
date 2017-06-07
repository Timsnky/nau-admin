<template>
    <tr>
        <td>{{ holiday.id }}</td>
        <td>{{ date }}</td>
        <td>{{ holiday.name }}</td>
        <td>
            <router-link
                :to="{name: 'holidays.edit', params: {id: holiday.id}}"
                class="btn btn-warning">
                Edit
            </router-link>
            <button
                class="btn btn-danger"
                type="button"
                @click="handleDeleteHoliday">
                Delete
            </button>
        </td>
    </tr>
</template>

<script>
    export default {
        props: {
            holiday: Object
        },

        computed: {
            date() {
                return moment(this.holiday.date).format('DD.MM.YYYY');
            }
        },

        methods: {
            handleDeleteHoliday() {
                this.$emit('deleteHoliday', this.holiday);
            }
        }
    }
</script>

<style scoped>
    .table > tbody > tr > td {
        vertical-align: middle;
    }
</style>
