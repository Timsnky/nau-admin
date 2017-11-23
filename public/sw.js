(() => {
  'use strict'

  const WebPush = {
    init () {
      self.importScripts('/js/libs/idb-keyval-min.js')

      idbKeyval.get('environement').then(val => this.env = val);
      self.addEventListener('push', this.notificationPush.bind(this))
      self.addEventListener('notificationclick', this.notificationClick.bind(this))
      self.addEventListener('notificationclose', this.notificationClose.bind(this))
    },

    /**
     * Handle notification push event.
     *
     * https://developer.mozilla.org/en-US/docs/Web/Events/push
     *
     * @param {NotificationEvent} event
     */
    notificationPush (event) {
      if (!(self.Notification && self.Notification.permission === 'granted')) {
        return
      }

      // https://developer.mozilla.org/en-US/docs/Web/API/PushMessageData
      if (event.data) {
        event.waitUntil(
          this.sendNotification(event.data.json())
        )
      }
    },

    /**
     * Handle notification click event.
     *
     * https://developer.mozilla.org/en-US/docs/Web/Events/notificationclick
     *
     * @param {NotificationEvent} event
     */
    notificationClick (event) {
      switch(event.action) {
        case 'comment-decline':
          fetch(`${this.env.API_DOMAIN}/comments/${event.notification.data['comment-id']}/decline`, {
            method: 'PUT',
            credentials: 'include',
          })
          break;

        case 'comment-publish':
          fetch(`${this.env.API_DOMAIN}/comments/${event.notification.data['comment-id']}/publish`, {
            method: 'PUT',
            credentials: 'include',
          })
          break;

        default:
          self.clients.openWindow(event.notification.data.link || '/')
      }

      event.notification.close();
    },

    /**
     * Handle notification close event (Chrome 50+, Firefox 55+).
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/onnotificationclose
     *
     * @param {NotificationEvent} event
     */
    notificationClose (event) {
      self.registration.pushManager.getSubscription().then(subscription => {
        if (subscription) {
          this.dismissNotification(event, subscription)
        }
      })
    },

    /**
     * Send notification to the user.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
     *
     * @param {PushMessageData|Object} data
     */
    sendNotification (data) {
      return self.registration.showNotification(data.title, data)
    },

    /**
     * Send request to server to dismiss a notification.
     *
     * @param  {NotificationEvent} event
     * @param  {String} subscription.endpoint
     * @return {Response}
     */
    dismissNotification ({ notification }, { endpoint }) {
      if (!notification.data || !notification.data.id) {
        return
      }

      const data = new FormData()
      data.append('endpoint', endpoint)

      // Send a request to the server to mark the notification as read.
      fetch(`${this.env.API_DOMAIN}/notifications/${notification.data.id}/dismiss`, {
        method: 'POST',
        credentials: 'include',
        body: data
      })
    }
  }

  WebPush.init()
})()
