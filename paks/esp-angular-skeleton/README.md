esp-angular-skeleton
===

Pak for esp-angular-skeleton

### Description

The esp-angular-skeleton is a starter skeleton for ESP using
[AngularJS](http://angularjs.org). It provides a default layout,
partial pages, Less stylesheets and is configured to use Expansive
for rendering and tooling to process less stylesheets and minify scripts.

The skeleton is configured for a "debug" and "release" mode of operation via the
"mode" property in package.json. By default, debug mode will disable minification and
mangling of scripts.

The skeleton includes templates for ESP to generate controllers, scaffolds 
and database migrations.

### Provides

* contents/css &mdash; Application less stylesheets
* contents/index.esp &mdash; Default home page
* contents/main.js &mdash; Primary application script
* esp.json &mdash; ESP configuration file
* expansive.json &mdash; Expansive configuration file
* layouts/default.html.exp &mdash; Master web page layout
* paks/ &mdash; Installed packages
* partials/ &mdash; Web page partial content

### Dependencies

The esp-angular-skeleton package depends upon:

* [angular](https://www.npmjs.com/search?q=angular) for the AngularJS framework
* [angular-animate](https://github.com/embedthis/exp-css) Animations for Angular
* [angular-bootstrap](https://github.com/embedthis/angular-bootstrap) Bootstrap UI for Angular
* [angular-route](https://github.com/embedthis/angular-bootstrap) AngularJS Router
* [bootstrap](https://www.npmjs.com/search?q=bootstrap) Bootstrap CSS
* [esp-angular](https://github.com/embedthis/exp-css) ESP support for Angular
* [esp-mvc](https://github.com/embedthis/esp-mvc) for ESP MVC application support.

* [exp-css](https://github.com/embedthis/exp-css) Expansive CSS plugin
* [exp-esp](https://github.com/embedthis/exp-esp) Expansive ESP plugin to compile ESP controllers and pages
* [exp-less](https://github.com/embedthis/exp-less) Expansive Less plugin
* [exp-js](https://github.com/embedthis/exp-js) Expansive JS plugin
* [html5shiv](https://www.npmjs.com/search?q=html5shiv) For HTML5 polyfills
* [jquery](https://www.npmjs.com/search?q=jquery) jQuery client side library

### Installation

    pak install esp-angular-skeleton

### Building

    expansive render

### Running

    expansive

or

    expansive render
    esp

### Configuration

#### esp.json

* esp.generate &mdash; Template files to use when using esp generate.
* http.formats.date &mdash; Default date format.
* http.formats.float &mdash; Default numerical format for floating point numbers.
* http.routes &mdash; Set the route set to use 'esp-restful'

```
{
    "esp": {
        "generate": {
            "appweb": "esp-angular-skeleton/generate/appweb.conf",
            "clientModel": "esp-angular-skeleton/generate/model.js",
            "clientController": "esp-angular-skeleton/generate/controller.js",
            "clientList": "esp-angular-skeleton/generate/list.html",
            "clientEdit": "esp-angular-skeleton/generate/edit.html",
            "controller": "esp-angular-skeleton/generate/controller.c",
            "controllerSingleton": "esp-angular-skeleton/generate/controllerSingleton.c"
        }
    },
    "http": {
        "formats": {
            "response": "json",
            "date": "yyyy-MM-dd",
            "float": 2
        },
        "routes": "esp-restful"
    }
}
```

#### expansive.json

* compile-html.enable &mdash; Compile Angular HTML files into pure Javascript.
* compile-less-css.enable &mdash; Enable the compile-less-css service to process less files.
* compile-less-css.stylesheet &mdash; Primary stylesheet to update if any less file changes.
    If specified, the "dependencies" map will be automatically created. 
* compile-less-css.dependencies &mdash; Explicit map of dependencies if not using "stylesheet". 
* compile-less-css.documents &mdash; Array of less files to compile.
* compile-ng-js.files &mdash; Array of Angular Javasccript files to compile.
* prefix-css.enable &mdash; Enable running autoprefixer on CSS files to handle browser specific extensions.
* minify-css.enable &mdash; Enable minifying CSS files.
* minify-js.enable &mdash; Enable minifying script files.
* minify-js.files &mdash; Array of files to minify. Files are relative to 'contents'.
* minify-js.compress &mdash; Enable compression of script files.
* minify-js.mangle &mdash; Enable mangling of Javascript variable and function names.
* minify-js.dotmin &mdash; Set '.min.js' as the output file extension after minification. Otherwise will be '.js'.
* minify-js.exclude &mdash; Array of files to exclude from minification. Files are relative to 'contents'.
* package-ng.exclude &mdash; Package Angular applications into a single Javascript file.

```
{
    services: {
        'compile-less-css': {
            enable: true,
            stylesheet: 'css/all.css',
            dependencies: { 'css/all.css.less' : '**.less' },
            documents: [ '!**.less', '**.css.less' ]
        },
        'compile-ng-js': {
            files: [
                '**.js',
                '!lib/**.js',
                'lib/esp*/**.js',
                'lib/angular*/**.js',
            ]
        },
        'prefix-css': {
            enable: true,
        },
        'minify-css': {
            enable: true,
        },
        'minify-js': {
            enable: true,
            files:      null,
            compress:   true,
            mangle:     true,
            dotmin:     false,
            exclude:    []
        },
        'package-ng':   false
    }
}
```

### Get Pak from

[https://embedthis.com/pak](https://embedthis.com/pak)
