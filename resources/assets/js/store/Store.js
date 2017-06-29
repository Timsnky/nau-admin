import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

export const store = new Vuex.Store({
    plugins: [createPersistedState()],
	state: {
		'user': {}
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
                Api.http.post('/token/invalidate').then((response) => {
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
