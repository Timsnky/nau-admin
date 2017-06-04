<template>
    <div>
        <page-title
            title="Week View"
            sub="sub heading"/>

        <div class="row">
            <div class="col-xs-4">
                <div class="input-group">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Search">
                    <span class="input-group-btn"><button class="btn btn-default" type="button"><i
                        class="fa fa-calendar"></i></button></span>
                </div>
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

        <div class="row">
            <div class="col-xs-12">
                <div class="m-grid">
                    <div class="m-grid-row">
                        <week-day
                            v-for="(item, index) in [0,1,2,3,4,5,6]"
                            :key="index"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import request from 'utils/request';
    import WeekDay from './components/WeekDay';

    export default {
        data() {
            return {
                start: '',
                end: '',
            };
        },

        components: {
            weekDay: WeekDay,
        },

        created() {
            this.start = this.$route.query.start || moment().startOf('week').format('YYYY-MM-DD');
            this.end = this.$route.query.end || moment().endOf('week').format('YYYY-MM-DD');

            this.setData();
        },

        beforeRouteUpdate (to, from, next) {
            this.start = to.query.start;
            this.end = to.query.end;

            this.setData();
            next();
        },

        methods: {
            setData() {
                console.log(111, this.start, this.end);
                request
                    .get('/work-shifts', {
                        start: this.start,
                        end: this.end,
                    })
                    .then(response => console.log(response.data))
                    .catch(err => console.log('Show some error message here'));
            },
            handlePrevWeek() {
                const start = moment(this.start, 'YYYY-MM-DD').subtract(7, 'days').format('YYYY-MM-DD');
                const end = moment(this.end, 'YYYY-MM-DD').subtract(7, 'days').format('YYYY-MM-DD');

                this.navigate(start, end);
            },
            handleNextWeek() {
                const start = moment(this.start, 'YYYY-MM-DD').add(7, 'days').format('YYYY-MM-DD');
                const end = moment(this.end, 'YYYY-MM-DD').add(7, 'days').format('YYYY-MM-DD');

                this.navigate(start, end);
            },
            handleCurrentWeek() {
                const start = moment().startOf('week').format('YYYY-MM-DD');
                const end = moment().endOf('week').format('YYYY-MM-DD');

                this.navigate(start, end);
            },
            navigate(start, end) {
                this.$router.push(`/resources/week?start=${start}&end=${end}`);
            }
        }
    }
</script>
