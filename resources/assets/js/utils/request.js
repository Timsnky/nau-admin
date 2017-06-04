const request = axios.create({
    baseURL: 'https://api-naut.livesystems.ch/',
});
const token = localStorage.getItem('token');

if (token) {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default request;
