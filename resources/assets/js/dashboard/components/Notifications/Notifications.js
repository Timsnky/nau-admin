export default class Notifications {
    constructor(store) {
        this.store = store;
    }

    push(notification) {
        this.store.dispatch('ADD_NOTIFICATION', notification);
    }

    hasNew() {
        return this.store.unreadNotifications !== 0;
    }

    all() {
        return this.store.notifications;
    }

    clear() {
        this.store.commit('CLEAR_NEW_NOTIFICATIONS');
    }
}
