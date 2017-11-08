<template>
    <div :class="{'bg-font-blue-hoki bg-blue-hoki': isToday, 'bg-font-default bg-default': !isToday, 'day': true, 'day__name': true, 'm-grid-col': true, 'm-grid-col-middle': true, 'm-grid-col-left': true}">
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
        height: auto;
        font-weight: bold;
        padding: 0;

        a {
            color: currentColor;
            display: block;
            padding: 20px 10px;
        }
    }
</style>
