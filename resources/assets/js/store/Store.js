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
        'availableImageTypes': [
            {
                id: 1,
                name: 'Normal Image'
            },
            {
                id: 2,
                name: 'Teaser Image',
            },
            {
                id: 3,
                name: 'Top Teaser Image',
            },
            {
                id: 4,
                name: 'Comment Image',
            }

        ],
        'imageType' : {
            id: 1,
            name: 'Normal Image'
        },
        'selected_image_id' : null,
        'selected_video_id' : null,
        'selected_survey_id': null,
        'video_selector_id': null,
        'image_selector_id': null,
        notifications: [],
        unreadNotifications: 0,
        foldermaster: null,
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
        FETCH_FOLDERMASTER: async ({commit}) => {
            var response = await Api.http.get('/foldermaster');
            commit('SET_FOLDERMASTER', response.data.user);
        },
        SET_FOLDERMASTER: async ({commit}, userId) => {
            var response = await Api.http.put('/foldermaster', {
                user_id: userId,
            });
            commit('SET_FOLDERMASTER', response.data.user);
        },
        SET_IMAGE_TYPES: ({commit}, types) => {
            commit('SET_IMAGE_TYPES', types);
        },
        RESET_IMAGE_TYPES: ({commit}) => {
            commit('RESET_IMAGE_TYPES');
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
        READ_NEW_NOTIFICATIONS: (state) => {
            state.unreadNotifications = 0;
        },
        INCREMENT_UNREAD_NOTIFICATIONS: (state) => {
            state.unreadNotifications += 1;
        },
        ADD_NOTIFICATION: (state, notification) => {
            state.notifications.unshift(notification);
        },
        CLEAR_NOTIFICATIONS: (state) => {
            state.notifications = [];
        },
        SET_USER: (state, { user }) => {
            state.user = user;
        },
        SET_FOLDERMASTER: (state, foldermaster) => {
            state.foldermaster = foldermaster;
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
        },
        SET_IMAGE_TYPES: (state, types) => {
            state.imageTypes = types;
        },
        RESET_IMAGE_TYPES: (state) => {
            state.imageTypes = [];
        }
    }
});
