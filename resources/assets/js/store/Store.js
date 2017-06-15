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
            api.request.post('/token/invalidate').then((response) => {
                commit('LOGOUT')
            }, (err) => {
                console.log(err)
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
