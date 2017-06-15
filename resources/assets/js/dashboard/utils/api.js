import { store } from '../../store/Store';

const api = {
    baseURL: 'https://api.nau.dev',
    getToken(key = 'token') {
        return Vue.cookie.get(key);
    },
    setToken(key, value) {
        Vue.cookie.set(key, value, { expires: '1h' });
    },
    invalidateToken(key = 'token') {
        store.dispatch('LOGOUT');
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
}, error => console.log(error));

request.interceptors.response.use(undefined, error => {
    const status = error.response.status;

    if (status === 401) {
        api.deleteToken();
    }
});

api.request = request;

export default api;
