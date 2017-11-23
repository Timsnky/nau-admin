<template>
    <li>
        <a :href="notification.link ? notification.link : '#'" class="notification">
            <div :class="['icon', notification.level]">
                    <i :class="['fa', notification.icon]"></i>
                </div>
            <div class="details">
                <span v-html="notification.content"></span>
            </div>
            <div class="time" v-if="moment(notification.created).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')">{{ moment(notification.created).format('HH:mm') }}</div>
            <div class="time" v-else>{{ moment(notification.created).format('DD.MM - HH:mm') }}</div>
        </a>
    </li>
</template>

<script>
    export default {
        data() {
            return {

            }
        },

        props: {
            notification: {
                type: Object,
                required: true,
            }
        },

        computed: {
            moment() {
                return moment;
            }
        },

    }
</script>


<style lang="scss" scoped>
    .notification {
        display: flex !important;

        .icon {
            height: 100%;
            padding: 0.3em;
            margin-right: 1em;

            &.info {
                background-color: #3598dc;
                color: #fff;
            }

            &.danger {
                background-color: #e7505a;
                color: #fff;
            }

            &.warning {
                background-color: #F7CA18;
                color: #fff;
            }

            &.success {
                background-color: #26C281;
                color: #fff;
            }
        }

        .details {
            //
        }

        .time {
            height: 100%;
        }
    }
</style>
