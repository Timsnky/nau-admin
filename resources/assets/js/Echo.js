import LaravelEcho from "laravel-echo"

const Echo = new LaravelEcho({
    broadcaster: 'socket.io',
    host: env.API_DOMAIN + ':' + env.ECHO_PORT + '?auth_key=' + env.ECHO_KEY,
    namespace: 'App.Events',
});

export default Echo;
