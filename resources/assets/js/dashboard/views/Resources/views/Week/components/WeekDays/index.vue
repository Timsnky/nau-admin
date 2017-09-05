<template>
    <div class="row">
        <div class="col-xs-12">
            <!-- Mobile Version -->
            <div class="m-grid visible-xs visible-sm">
                <div v-for="(day, index) in dates">
                    <div class="m-grid-row">
                        <week-day-name
                            :day="day"
                            :key="index" />
                    </div>

                    <div class="m-grid-row">
                        <week-day-topics
                        :day="day"
                        :key="index" />
                    </div>

                    <div class="m-grid-row">
                        <week-day-redactor
                        :day="day"
                        :key="index" />
                    </div>
                </div>
            </div>

            <!-- Desktop Version -->
            <div class="m-grid hidden-xs hidden-sm">
                <div class="m-grid-row">
                    <week-day-name
                        v-for="(day, index) in dates"
                        :day="day"
                        :key="index" />
                </div>
                <div class="m-grid-row">
                    <week-day-topics
                        v-for="(day, index) in dates"
                        :day="day"
                        :key="index" />
                </div>
                <div class="m-grid-row">
                    <week-day-redactor
                        v-for="(day, index) in dates"
                        :day="day"
                        :key="index" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import WeekDayName from './components/WeekDayName';
    import WeekDayRedactor from './components/WeekDayRedactor';
    import WeekDayTopics from './components/WeekDayTopics';

    export default {
        props: {
            dates: Array,
        },

        components: {
            WeekDayName,
            WeekDayRedactor,
            WeekDayTopics,
        }
    }
</script>

<style lang="scss">
    .day {
        border: 1px solid #dddddd;
        padding: 20px 10px;
        height: 100px;

        h5 {
            margin: 5px 0;
        }
    }
</style>
