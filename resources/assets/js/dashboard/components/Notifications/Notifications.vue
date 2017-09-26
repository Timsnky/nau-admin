<template>
    <li class="slim-scroll dropdown dropdown-extended dropdown-notification" ref="notifications" @click="clear()">
        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="true">
            <i class="icon-bell"></i>
            <span v-show="hasNew()" class="badge badge-default">{{ unread }}</span>
        </a>
        <ul class="dropdown-menu">
            <li class="external">
                <h3><span class="bold">Nachrichten</span></h3>
            </li>
            <li>
                <ul class="dropdown-menu-list" data-handle-color="#637283" data-initialized="1">
                    <li v-for="notification in notifications">
                        <a href="javascript:;">
                            <span class="time">{{ moment(notification.time).format('HH:mm') }}</span>
                            <span class="details">
                                <span :class="['label', 'label-sm', 'label-icon', 'label-' + notification.type]">
                                    <i :class="['fa', notification.icon]"></i>
                                </span>
                                <span v-html="notification.text"></span>
                            </span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
</template>

<script>
    import Notification from './Notification.js';
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
            },

            hasNew() {
                return this.unread !== 0;
            },

            clear() {
                this.$store.commit('CLEAR_NEW_NOTIFICATIONS');
            },
        },

        mounted() {
            Echo.private('notifications.' + Api.user().id)
                .listen('VideoProcessed', (e) => {
                    this.push(new Notification(
                        e.video.name + ' ist nun fertig verarbeitet.',
                    ));
                });

            Echo.channel('version')
                .listen('NewVersion', (e) => {
                    this.push(new Notification(
                        'Eine neue Version ist verfügbar <a href="">Jetzt aktuallisieren</a>',
                        'warning',
                        'fa-arrow-circle-o-down',
                    ));
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
