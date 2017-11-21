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
                return this.unread !== 0;
            },

            read() {
                this.$store.commit('READ_NEW_NOTIFICATIONS');
            },

            clear() {
                this.$store.commit('CLEAR_NOTIFICATIONS');
            },

            /**
            * Register the service worker.
            */
            registerServiceWorker () {
                if (!('serviceWorker' in navigator)) {
                    console.log('Service workers aren\'t supported in this browser.')
                    return
                }

                navigator.serviceWorker.register('/sw.js')
                .then(() => this.initialiseServiceWorker())
            },

            initialiseServiceWorker () {
                if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
                    console.log('Notifications aren\'t supported.')
                    return
                }

                if (Notification.permission === 'denied') {
                    console.log('The user has blocked notifications.')
                    return
                }

                if (!('PushManager' in window)) {
                    console.log('Push messaging isn\'t supported.')
                    return
                }

                navigator.serviceWorker.ready.then(registration => {
                    registration.pushManager.getSubscription()
                    .then(subscription => {
                        if (!subscription) {
                            return
                        }

                        this.updateSubscription(subscription)
                    })
                    .catch(e => {
                        console.log('Error during getSubscription()', e)
                    })
                })
            },

            /**
            * Subscribe for push notifications.
            */
            subscribe () {
                navigator.serviceWorker.ready.then(registration => {
                    const options = { userVisibleOnly: true }
                    const vapidPublicKey = env.VAPID_PUBLIC_KEY

                    if (vapidPublicKey) {
                        options.applicationServerKey = this.urlBase64ToUint8Array(vapidPublicKey)
                    }

                    registration.pushManager.subscribe(options)
                    .then(subscription => {
                        this.updateSubscription(subscription)
                    })
                    .catch(e => {
                        if (Notification.permission === 'denied') {
                            console.log('Permission for Notifications was denied')
                        } else {
                            console.log('Unable to subscribe to push.', e)
                        }
                    })
                })
            },

            /**
            * Unsubscribe from push notifications.
            */
            unsubscribe () {
                navigator.serviceWorker.ready.then(registration => {
                    registration.pushManager.getSubscription().then(subscription => {
                        if (!subscription) {
                            return
                        }

                        subscription.unsubscribe().then(() => {
                            this.deleteSubscription(subscription)
                        }).catch(e => {
                            console.log('Unsubscription error: ', e)
                        })
                    }).catch(e => {
                        console.log('Error thrown while unsubscribing.', e)
                    })
                })
            },

            /**
            * Send a request to the server to update user's subscription.
            *
            * @param {PushSubscription} subscription
            */
            updateSubscription (subscription) {
                const key = subscription.getKey('p256dh')
                const token = subscription.getKey('auth')

                const data = {
                    endpoint: subscription.endpoint,
                    key: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : null,
                    token: token ? btoa(String.fromCharCode.apply(null, new Uint8Array(token))) : null
                }

                this.loading = true

                Api.http.post('/subscriptions', data)
                .then(() => { this.loading = false })
            },

            /**
            * Send a requst to the server to delete user's subscription.
            *
            * @param {PushSubscription} subscription
            */
            deleteSubscription (subscription) {
                this.loading = true

                Api.http.post('/subscriptions/delete', { endpoint: subscription.endpoint })
                .then(() => { this.loading = false })
            },

            /**
            * https://github.com/Minishlink/physbook/blob/02a0d5d7ca0d5d2cc6d308a3a9b81244c63b3f14/app/Resources/public/js/app.js#L177
            *
            * @param  {String} base64String
            * @return {Uint8Array}
            */
            urlBase64ToUint8Array (base64String) {
                const padding = '='.repeat((4 - base64String.length % 4) % 4);
                const base64 = (base64String + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/')

                const rawData = window.atob(base64)
                const outputArray = new Uint8Array(rawData.length)

                for (let i = 0; i < rawData.length; ++i) {
                    outputArray[i] = rawData.charCodeAt(i)
                }

                return outputArray
            }
        },

        mounted() {
            this.registerServiceWorker();
            this.subscribe();

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
