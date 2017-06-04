const request = axios.create({
    baseURL: 'https://api-naut.livesystems.ch/',
});

request.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

request.interceptors.response.use(undefined, error => {
    const status = error.response.status;

    if (status === 401) {
        localStorage.removeItem('token');
        location.href = "/login";
    }
});

export default request;
