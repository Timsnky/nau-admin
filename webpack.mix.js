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
    .copyDirectory('node_modules/eonasdan-bootstrap-datetimepicker/build', 'public/assets/global/plugins/eonasdan-bootstrap-datetimepicker')
    .copyDirectory('node_modules/bootstrap/fonts', 'public/assets/global/plugins/eonasdan-bootstrap-datetimepicker/fonts')
    .copyDirectory('node_modules/cropperjs/dist', 'public/assets/global/plugins/cropperjs')
    .copyDirectory('resources/assets/images', 'public/assets/images')
    .copy('node_modules/font-awesome/fonts', 'public/fonts')
    .js('resources/assets/js/dashboard/app.js', 'public/js')
    .js('resources/assets/js/authentication/login.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css')
    .options({
        processCssUrls: false
    });
