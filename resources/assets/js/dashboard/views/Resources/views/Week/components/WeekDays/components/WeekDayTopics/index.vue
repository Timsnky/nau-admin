<template>
    <div class="day day__topics m-grid-col m-grid-col-top m-grid-col-left">
        <ul
            v-if="day.topics.length > 0">
            <li
                v-for="topic in day.topics">
                <h5>{{ topic.name }}</h5>
            </li>
        </ul>

        <h5 v-else>No topics</h5>
    </div>
</template>

<script>
    export default {
        props: {
            day: Object
        }
    }
</script>

<style>
    .day__topics {
        background-color: #eeeeee;
    }

    .day__topics ul {
        margin: 0;
        padding-left: 15px;
    }
</style>
