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
        Vue.cookie.set(key, value, { expires: '1M', 'domain': this.getCookieDomain() });
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

    hasRole(roleName) {
        var matches = this.user().roles.filter((role) => {
            return role.name == roleName;
        });

        return matches.length !== 0
    }

    isAdmin() {
        return this.hasRole('admin');
    }

    isChefJournalist() {
        return this.hasRole('chef-journalist');
    }

    //Images
    getImage() {
        return this.store.state.selected_image_id;
    }

    setImage(id) {
        return this.store.dispatch('SET_IMAGE', id);
    }

    resetImage() {
        return this.store.dispatch('RESET_IMAGE');
    }

    getImageSelector() {
        return this.store.state.image_selector_id;
    }

    setImageSelector(id) {
        return this.store.dispatch('SET_IMAGE_SELECTOR', id);
    }

    resetImageSelector() {
        return this.store.dispatch('RESET_IMAGE_SELECTOR');
    }

    getImageTypes() {
        return this.store.state.imageTypes.map((type) => {
            return this.store.state.availableImageTypes[type];
        });
    }

    getAvailableImageTypes() {
        return this.store.state.availableImageTypes;
    }

    setImageType(type) {
        if(Number.isInteger(type)) {
            type = [type];
        }

        return this.store.dispatch('SET_IMAGE_TYPES', type);
    }

    resetImageTypes() {
        return this.store.dispatch('RESET_IMAGE_TYPES');
    }

    //Videos
    getVideo() {
        return this.store.state.selected_video_id;
    }

    setVideo(id) {
        return this.store.dispatch('SET_VIDEO', id);
    }

    resetVideo() {
        return this.store.dispatch('RESET_VIDEO');
    }

    getVideoSelector() {
        return this.store.state.video_selector_id;
    }

    setVideoSelector(id) {
        return this.store.dispatch('SET_VIDEO_SELECTOR', id);
    }

    resetVideoSelector() {
        return this.store.dispatch('RESET_VIDEO_SELECTOR');
    }

    //Surveys
    getSurvey() {
        return this.store.state.selected_survey_id;
    }

    setSurvey(id) {
        return this.store.dispatch('SET_SURVEY', id);
    }

    resetSurvey() {
        return this.store.dispatch('RESET_SURVEY');
    }

    //Agencies
    getAgencies() {
        return this.store.state.systemAgencies;
    }

}

export default Api;
