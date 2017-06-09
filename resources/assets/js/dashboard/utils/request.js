import router from '../Router';

const request = axios.create({
    withCredentials: true,
    baseURL: 'https://api-naut.livesystems.ch'
});

request.interceptors.response.use(undefined, error => {
    const status = error.response.status;

    if (status === 401) {
        api.deleteToken();
    }

    if (status === 422) {
        console.log(422, router);
        router.push({ name: 'error' });
    }
});

export default request;
