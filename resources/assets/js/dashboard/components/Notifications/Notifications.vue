<template>
    <li class="slim-scroll dropdown dropdown-extended dropdown-notification" ref="notifications" @click="read()">
        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="true">
            <i class="icon-bell"></i>
            <span v-show="hasNew()" class="badge badge-default">{{ unread }}</span>
        </a>
        <ul class="dropdown-menu">
            <li class="external">
                <h3><span class="bold">Mitteilungen</span></h3>
                <a v-show="notifications.length > 0" @click.prevent="clear()" href="#">Alle Mitteilungen löschen</a>
            </li>
            <li>
                <ul class="dropdown-menu-list" data-handle-color="#637283" data-initialized="1">
                    <li v-for="notification in notifications">
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
                </ul>
            </li>
        </ul>
    </li>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        computed: {
            ...mapState({
                notifications: 'notifications',
                unread: 'unreadNotifications'
            }),

            moment() {
                return moment;
            }
        },

        methods: {
            push(notification) {
                this.$store.dispatch('ADD_NOTIFICATION', notification);
                this.sendDesktopNotification(notification);
            },

            hasNew() {
                return this.unread !== 0;
            },

            read() {
                this.$store.commit('READ_NEW_NOTIFICATIONS');
            },

            clear() {
                this.$store.commit('CLEAR_NOTIFICATIONS');
            },

            checkDesktopNotifications() {
                if(!Notification) {
                    // Browser does not support notifications
                    return false;
                }

                if (Notification.permission !== 'granted')
                    Notification.requestPermission();
            },

            sendDesktopNotification(notification) {
                var desktopNotification = new Notification(notification.title, {
                    icon: '/android-chrome-192x192.png',
                    body: notification.text,
                });

                if(notification.link) {
                    desktopNotification.onclick = () => {
                        window.open(notification.link);
                    };
                }
            }
        },

        mounted() {
            this.checkDesktopNotifications();

            Echo.private('notifications.' + Api.user().id)
                .listen('Notification', (notification) => {
                    console.log(notification);
                    this.push(notification);
                });

            Echo.channel('notifications')
                .listen('Notification', (notification) => {
                    console.log(notification);
                    this.push(notification);
                });
        }
    }
</script>

<style lang="scss" scoped>
    .dropdown-menu {
        max-width: inherit !important;
        min-width: inherit !important;
        width: 420px !important;

        .dropdown-menu-list {
            &>li a .time {
                max-width: inherit !important;
            }

            max-height: 250px;
            overflow-y: auto;
        }
    }
</style>
