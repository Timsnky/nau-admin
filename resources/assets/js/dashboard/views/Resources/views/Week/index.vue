<template>
    <div>
        <page-title title="Resource Management" sub="Week View"/>

        <week-navigation
            :year="year"
            :week="week"
            @navigate="navigate"/>

        <week-days :dates="dates"/>
    </div>
</template>

<script>
    import request from 'dashboard/utils/request';
    import WeekDays from './components/WeekDays';
    import WeekNavigation from './components/WeekNavigation';

    export default {
        data() {
            return {
                dates: [],
                year: this.$route.query.year || moment().year(),
                week: this.$route.query.week || moment().week(),
            };
        },

        components: {
            weekDays: WeekDays,
            weekNavigation: WeekNavigation,
        },

        created() {
            this.setData();
        },

        beforeRouteUpdate (to, from, next) {
            const date = moment();

            this.year = to.query.year || date.year();
            this.week = to.query.week || date.week();

            this.setData();
            next();
        },

        methods: {
            setData() {
                const { week, year } = this;

                request
                    .get(`/resources/overview?year=${year}&week=${week}`)
                    .then(response => this.dates = response.data)
                    .catch(err => console.log('Show some error message here'));
            },
            navigate(date) {
                const { week, year } = date;

                if (week !== this.week || year !== this.year) {
                    this.$router.push({ name: 'resources.week', query: { year, week } });
                }
            }
        }
    }
</script>
