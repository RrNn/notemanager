const mix = require('laravel-mix');

mix
  .js('resources/js/dom.js', 'public/js')
  .sass('resources/sass/app.scss', 'public/css')
  .options({
    processCssUrls: false,
  });
