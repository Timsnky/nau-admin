import Vuex from 'vuex';
import api from '../dashboard/utils/api';

export const store = new Vuex.Store({
	state: {
		'user': {},
        'selected_image_id' : null,
        'selected_video_id' : null
	},
    actions: {
        LOAD_AUTENTICATED_USER: function ({ commit }) {
            api.request.get('/me').then((response) => {
                commit('SET_USER', { user: response.data })
            }, (err) => {
                location.href = '/login';
            })
        },
        LOGOUT: function ({ commit }) {
            return new Promise((resolve, reject) => {
                // Do something here... lets say, a http call using vue-resource
                api.request.post('/token/invalidate').then((response) => {
                    commit('LOGOUT');
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
        SET_VIDEO: ({commit}, video_id) => {
            commit('SET_VIDEO', video_id);
        },
        RESET_VIDEO: ({commit}) => {
            commit('RESET_VIDEO');
        }
    },
    mutations: {
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
        SET_VIDEO: (state, video_id) => {
            state.selected_video_id = video_id;
        },
        RESET_VIDEO: (state) => {
            state.selected_video_id = null;
        }
    }
});
