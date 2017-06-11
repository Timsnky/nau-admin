const { mix } = require('laravel-mix');

mix
    .webpackConfig({
        resolve: {
            modules: [
                path.resolve(__dirname, 'resources/assets/js'),
                'node_modules'
            ],
        }
    })
    .copyDirectory('node_modules/bootstrap-select/dist', 'public/assets/global/plugins/bootstrap-select')
    .copyDirectory('node_modules/bootstrap-datepicker/dist', 'public/assets/global/plugins/bootstrap-datepicker')
    .js('resources/assets/js/dashboard/app.js', 'public/js')
    .js('resources/assets/js/authentication/login.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .version();
