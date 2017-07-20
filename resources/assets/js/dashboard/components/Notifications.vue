<template>
    <li class="slim-scroll dropdown dropdown-extended dropdown-notification" id="header_notification_bar" @click="newNotificationsCount = 0">
        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="true">
            <i class="icon-bell"></i>
            <span v-show="newNotificationsCount > 0" class="badge badge-default">{{ newNotificationsCount }}</span>
        </a>
        <ul class="dropdown-menu">
            <li class="external">
                <h3><span class="bold">Neue Nachrichten</span></h3>
            </li>
            <li>
                <div style="position: relative; overflow: hidden; width: auto; height: 250px;">
                    <ul class="dropdown-menu-list scroller" style="height: 250px; overflow: hidden; width: auto;" data-handle-color="#637283" data-initialized="1">
                        <li v-for="notification in notifications">
                            <a href="javascript:;">
                                <span class="time">{{ notification.time.format('H:mm') }}</span>
                                <span class="details">
                                    <span class="label label-sm label-icon label-success">
                                        <i class="fa fa-plus"></i>
                                    </span> {{ notification.text }}
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </li>
</template>

<script>
    export default {
        data() {
            return {
                notifications: [],
                newNotificationsCount: 0,
            };
        },

        mounted() {
            Echo.private('notifications.' + Api.user().id)
                .listen('VideoProcessed', (e) => {
                    this.notifications.unshift({
                        text: e.video.name + ' ist nun fertig verarbeitet.',
                        time: moment()
                    });
                    this.newNotificationsCount++;
                });
        }
    }
</script>

<style lang="scss" scoped>
    .dropdown-menu {
        max-width: inherit !important;
        min-width: inherit !important;
        width: 400px !important;

        .dropdown-menu-list>li a .time {
            max-width: inherit !important;
        }
    }
</style>
