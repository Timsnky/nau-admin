<template>
    <div class="day day__redactor m-grid-col m-grid-col-top m-grid-col-left">
        <ul
            v-if="day.shifts.length > 0">
            <li
                v-for="shift in day.shifts">
                <h5>{{ shift.name }} <span v-if="shift.assigned"> : {{ shift.assigned.name }}</span></h5>
            </li>
        </ul>

        <h5 v-else>No shifts</h5>
    </div>
</template>

<script>
    export default {
        props: {
            day: Object
        },
    }
</script>

<style lang="scss">
    .day__redactor {
        ul {
            margin: 0;
            padding-left: 15px;
        }
    }
</style>
