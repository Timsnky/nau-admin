<template>
    <div class="row">
        <div class="col-xs-4">
            <dropdownWeeks
                :year="year"
                :week="week"
                @changeWeek="changeWeek"/>
        </div>
        <div class="col-xs-4">
            <h4 class="text-center">Week view</h4>
        </div>
        <div class="col-xs-4 text-right">
            <button
                @click="handlePrevWeek"
                class="btn btn-default">
                <i class="fa fa-chevron-left"></i>
            </button>
            <button
                @click="handleNextWeek"
                class="btn btn-default">
                <i class="fa fa-chevron-right"></i>
            </button>
            <button
                @click="handleCurrentWeek"
                class="btn btn-default">
                Current
            </button>
        </div>
    </div>
</template>

<script>
    import DropdownWeeks from './components/DropdownWeeks';

    export default {
        props: {
            week: [String, Number],
            year: [String, Number],
        },

        components: {
            dropdownWeeks: DropdownWeeks,
        },

        methods: {
            handlePrevWeek() {
                const date = moment(`${this.week}-${this.year}`, 'WW-YYYY');
                date.subtract(1, 'week');

                this.navigate(date.year(), date.week());
            },
            handleNextWeek() {
                const date = moment(`${this.week}-${this.year}`, 'WW-YYYY');
                date.add(1, 'week');

                this.navigate(date.year(), date.week());
            },
            handleCurrentWeek() {
                const date = moment();

                this.navigate(date.year(), date.week());
            },
            changeWeek(date) {
                const { year, week } = date;

                this.navigate(year, week);
            },
            navigate(year, week) {
                this.$emit('navigate', { year, week });
            }
        }
    }
</script>
