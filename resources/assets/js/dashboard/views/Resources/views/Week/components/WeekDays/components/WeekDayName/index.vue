<template>
    <div :class="{'is-today': isToday, 'day': true, 'day__name': true, 'm-grid-col': true, 'm-grid-col-middle': true, 'm-grid-col-left': true}">
        <router-link :to="url">{{ dayName }}</router-link>
    </div>
</template>

<script>
    export default {
        props: {
            day: Object
        },

        computed: {
            url() {
                return {
                    name: 'resources.day',
                    params: {
                        date: moment(this.day.date).format('YYYY-MM-DD')
                    }
                };
            },

            isToday() {
                return moment(this.day.date).format('DDMMYYYY') == moment().format('DDMMYYYY');
            },

            dayName() {
                return moment(this.day.date).format('dddd DD.MM.YYYY');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .day__name {
        background-color: #cccccc;
        height: auto;
        padding: 0;

        a {
            color: #333333;
            display: block;
            padding: 20px 10px;

            &:hover {
                color: #333333;
            }
        }
    }

    .is-today {
        background-color: darkgray;
    }
</style>
