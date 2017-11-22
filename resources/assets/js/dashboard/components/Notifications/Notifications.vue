<template>
    <li class="slim-scroll dropdown dropdown-extended dropdown-notification" ref="notifications" @click="read()">
        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="true">
            <i class="icon-bell"></i>
            <span v-show="hasNew()" class="badge badge-default">{{ unread.length }}</span>
        </a>
        <ul class="dropdown-menu">
            <li class="external">
                <h3><span class="bold">Mitteilungen</span></h3>
                <a v-show="notifications.length > 0" @click.prevent="clear()" href="#">Alle Mitteilungen löschen</a>
            </li>
            <li>
                <ul class="dropdown-menu-list" data-handle-color="#637283" data-initialized="1">
                    <notification v-for="notification in notifications" :notification="notification" :key="notification.id"></notification>
                    <li v-if="notifications.length == 0">
                        <a href="javascript:;">
                            <span class="details">Leider haben Sie keine Mitteilungen. 😢</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
</template>

<script>
    import { mapState } from 'vuex'
    import Notification from './Notification'

    export default {
        data() {
            return {
                loading: false,
            }
        },

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
            },

            hasNew() {
                return this.unread.length > 0;
            },

            read() {
                this.unread.forEach((notification) => {
                    Api.http.put(`/notifications/${notification.id}/read`)
                });

                this.$store.commit('READ_ALL_NOTIFICATIONS');
            },

            clear() {
                this.$store.dispatch('CLEAR_NOTIFICATIONS');
            },
        },

        mounted() {
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

            Echo.private('App.User.'  + Api.user().id)
            .notification(notification => {
                this.push(notification);
            })
            .listen('NotificationRead', ({ notificationId }) => {
                this.$store.dispatch('READ_NEW_NOTIFICATION', notificationId);
            })
            .listen('NotificationReadAll', () => {
                this.$store.commit('READ_NEW_NOTIFICATIONS');
            })
        },

        components: {
            Notification
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
