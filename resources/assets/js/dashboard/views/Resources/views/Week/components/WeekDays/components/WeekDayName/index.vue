<template>
    <div class="day day__name m-grid-col m-grid-col-middle m-grid-col-left">
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

            dayName() {
                return moment(this.day.date).format('dddd');
            }
        }
    }
</script>

<style>
    .day__name {
        background-color: #cccccc;
        height: auto;
        padding: 0;
    }

    .day__name a {
        color: #333333;
        display: block;
        padding: 20px 10px;
    }

    .day__name a:hover {
        color: #333333;
    }
</style>
