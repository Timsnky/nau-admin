<template>
    <li>
        <a :href="notification.link ? notification.link : '#'">
            <span class="time">{{ moment(notification.time).format('HH:mm') }}</span>
            <span class="details">
                <span :class="['label', 'label-sm', 'label-icon', 'label-' + notification.type]">
                    <i :class="['fa', notification.icon]"></i>
                </span>
                <span v-html="notification.content"></span>
            </span>
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
