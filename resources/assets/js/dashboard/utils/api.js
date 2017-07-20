import { store } from '../../store/Store';

const api = {
    baseURL: env.API_DOMAIN,
    getToken(key = 'token') {
        return Vue.cookie.get(key);
    },
    setToken(key, value) {
        Vue.cookie.set(key, value, { expires: '1h' });
    },
    invalidateToken(key = 'token') {
        return store.dispatch('LOGOUT');
    },
    deleteToken(key = 'token') {
        var parts = location.hostname.split('.');
        var subdomain = parts.shift();
        var upperleveldomain = parts.join('.');

        Vue.cookie.delete(key, {domain: upperleveldomain})
    },
    user() {
        return store.state.user;
    }
};


const request = axios.create({
    withCredentials: true,
    'baseURL': api.baseURL,
});

request.interceptors.request.use(config => {
    const token = api.getToken();

    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, error => { return Promise.reject(error) });

request.interceptors.response.use(response => { return response } , error => {
    const status = error.response.status;

    if (status === 401) {
        api.deleteToken();
    }

    return Promise.reject(error);
});

api.request = request;

export default api;
