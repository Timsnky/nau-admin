class Api {
    constructor(host, http, store) {
        this.host = host;
        this.http = http;
        this.store = store;
    }

    getToken() {
        return Vue.cookie.get('token');
    }

    getCookieDomain() {
        var parts = location.hostname.split('.');
        var subdomain = parts.shift();
        var upperleveldomain = parts.join('.');

        return upperleveldomain;
    }

    setToken(key, value) {
        Vue.cookie.set(key, value, { expires: '1h', 'domain': this.getCookieDomain() });
    }

    invalidateToken() {
        return this.store.dispatch('LOGOUT');
    }

    deleteToken() {
        Vue.cookie.delete('token', {domain: this.getCookieDomain()});
    }

    user() {
        return this.store.state.user;
    }
}

export default Api;
