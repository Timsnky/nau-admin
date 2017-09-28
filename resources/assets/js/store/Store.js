import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

export const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        'user': {
            "name": "Loading",
            "avatar": "https://media.nau.ch/default_avatar.png",
            "roles": []
        },
        'selected_image_id' : null,
        'selected_video_id' : null,
        'selected_survey_id': null,
        'video_selector_id': null,
        'image_selector_id': null,
        notifications: [],
        unreadNotifications: 0,
    },
    actions: {
        LOAD_AUTENTICATED_USER: function ({ commit }) {
            Api.http.get('/me').then((response) => {
                commit('SET_USER', { user: response.data })
            }, (err) => {
                location.href = '/login';
            })
        },
        LOGOUT: function ({ commit }) {
            return new Promise((resolve, reject) => {
                commit('LOGOUT');
                Api.http.post('/token/invalidate').then((response) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                })
            })
        },
        SET_IMAGE: ({commit}, image_id) => {
            commit('SET_IMAGE', image_id);
        },
        RESET_IMAGE: ({commit}) => {
            commit('RESET_IMAGE');
        },
        SET_IMAGE_SELECTOR: ({commit}, image_selector_id) => {
            commit('SET_IMAGE_SELECTOR', image_selector_id);
        },
        RESET_IMAGE_SELECTOR: ({commit}) => {
            commit('RESET_IMAGE_SELECTOR');
        },
        SET_VIDEO: ({commit}, video_id) => {
            commit('SET_VIDEO', video_id);
        },
        RESET_VIDEO: ({commit}) => {
            commit('RESET_VIDEO');
        },
        SET_VIDEO_SELECTOR: ({commit}, video_selector_id) => {
            commit('SET_VIDEO_SELECTOR', video_selector_id);
        },
        RESET_VIDEO_SELECTOR: ({commit}) => {
            commit('RESET_VIDEO_SELECTOR');
        },
        SET_SURVEY: ({commit}, survey_id) => {
            commit('SET_SURVEY', survey_id);
        },
        RESET_SURVEY: ({commit}) => {
            commit('RESET_SURVEY');
        },
        ADD_NOTIFICATION: ({commit}, notification) => {
            commit('ADD_NOTIFICATION', notification);
            commit('INCREMENT_UNREAD_NOTIFICATIONS', notification);
        },
    },
    mutations: {
        CLEAR_NEW_NOTIFICATIONS: (state) => {
            state.unreadNotifications = 0;
        },
        INCREMENT_UNREAD_NOTIFICATIONS: (state) => {
            state.unreadNotifications += 1;
        },
        ADD_NOTIFICATION: (state, notification) => {
            state.notifications.unshift(notification);
        },
        SET_USER: (state, { user }) => {
            state.user = user;
        },
        LOGOUT: (state) => {
            state.user = null;
        },
        SET_IMAGE: (state, image_id) => {
            state.selected_image_id = image_id;
        },
        RESET_IMAGE: (state) => {
            state.selected_image_id = null;
        },
        SET_IMAGE_SELECTOR: (state, image_id) => {
            state.image_selector_id = image_id;
        },
        RESET_IMAGE_SELECTOR: (state) => {
            state.image_selector_id = null;
        },
        SET_VIDEO: (state, video_id) => {
            state.selected_video_id = video_id;
        },
        SET_VIDEO_SELECTOR: (state, video_id) => {
            state.video_selector_id = video_id;
        },
        RESET_VIDEO_SELECTOR: (state) => {
            state.video_selector_id = null;
        },
        RESET_VIDEO: (state) => {
            state.selected_video_id = null;
        },
        SET_SURVEY: (state, survey_id) => {
            state.selected_survey_id = survey_id;
        },
        RESET_SURVEY: (state) => {
            state.selected_survey_id = null;
        }
    }
});
