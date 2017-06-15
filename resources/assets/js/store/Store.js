import Vuex from 'vuex';
import api from '../dashboard/utils/api';

export const store = new Vuex.Store({
	state: {
		'user': {}
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


        }
    },
    mutations: {
        SET_USER: (state, { user }) => {
            state.user = user
        },
        LOGOUT: (state) => {
            state.user = null
        }
    }
});
