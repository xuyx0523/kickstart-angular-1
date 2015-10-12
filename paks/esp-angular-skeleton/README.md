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

* less.enable &mdash; Enable the compile-less-css service to process less files.
* less.dependencies &mdash; Explicit map of dependencies if not using "stylesheet". 
* less.files &mdash; Array of less files to compile.
* less.stylesheet &mdash; Primary stylesheet to update if any less file changes.
    If specified, the "dependencies" map will be automatically created. 
* ng-compile-js.files &mdash; Array of Angular Javasccript files to compile.
* ng-compile-html.enable &mdash; Compile Angular HTML files into pure Javascript.
* css.enable &mdash; Enable minifying CSS files.
* js.compress &mdash; Enable compression of script files.
* js.dotmin &mdash; Set '.min.js' as the output file extension after minification. Otherwise will be '.js'.
* js.enable &mdash; Enable minifying script files.
* js.files &mdash; Array of files to minify. Files are relative to 'contents'.
* js.mangle &mdash; Enable mangling of Javascript variable and function names.

```
{
    services: {
        'css': {
            enable: true,
        },
        'less': {
            enable: true,
            stylesheet: 'css/all.css',
            dependencies: { 'css/all.css.less' : '**.less' },
            documents: [ '!**.less', '**.css.less' ]
        },
        'js': {
            enable: true,
            files:      null,
            compress:   true,
            mangle:     true,
            dotmin:     false,
        },
        'ng-compile-js': {
            files: [
                '**.js',
                '!lib/**.js',
                'lib/angular*/**.js',
                'lib/esp*/**.js'
            ]
        },
        'ng-package':   false
    }
}
```

### Get Pak from

[https://embedthis.com/pak](https://embedthis.com/pak)
