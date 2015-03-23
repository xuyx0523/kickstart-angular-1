esp-best
===

ESP best practices pak. Package of esp-best for the [Pak Package Manager](https://github.com/embedthis/pak).

### Provides

* [esp-angular-skeleton](https://github.com/embedthis/esp-angular-skeleton)
* [bootstrap](https://github.com/embedthis/bootstrap)
* [angular-bootstrap](https://github.com/embedthis/angular-bootstrap)
* [html5shiv](https://github.com/embedthis/html5shiv)
* [font-awesome](https://github.com/embedthis/font-awesome)
* [more](https://github.com/embedthis/more)
* [respond](https://github.com/embedthis/respond)

Also includes:
 * Expansive plugins:
    * [exp-css](https://github.com/embedthis/exp-css) for CSS files
    * [exp-less](https://github.com/embedthis/exp-less) for Less files
    * [exp-j](https://github.com/embedthis/exp-js) for script files

### To install:

    pak install esp-best

### Description

The esp-best pak wraps a set of best-practice paks into one convenient installable pak.
It provides a skeleton for an Angular/Bootstrap/ESP application.

### Configuration

See [esp-angular-skeleton README](https://github.com/embedthis/esp-angular-skeleton/tree/master/README.md)

#### esp.json

* esp.combine &mdash; Combine ESP controllers and views into one single shared library.
* esp.generate &mdash; Template file for esp generate appweb.
* esp.optimize &mdash; Compile files with optimization or debug symbols.
* http.auth.store &mdash; Store passwords in an application database.
* http.auth.auto &mdash; Automatically login (for dev debug) as the given name with specified authorization roles.
* http.auth.auto.url &mdash; URL to redirect to.
* http.cache &mdash; Enable default client-side caching of static web content for 1 day.
* http.compress &mdash; Enable serving of compressed content (gzip).
* http.redirect &mdash; Redirect all requests to SSL.
* modes &mdash; Debug and release specific properties.

```
{
    "esp": {
        "generate": {
            "appweb": "esp-best/appweb.conf"
        }
    },
    "http": {
        "auth": {
            "store": "app"
        }
    },
    "modes": {
        "debug": {
            "esp": {
                "optimize": false,
                "combine": false
            },
            "http": {
                "auth": {
                    "auto": {
                        "name": "",
                        "roles": [ "*" ]
                    }
                },
                "compress": false
            }
        },
        "release": {
            "esp": {
                "optimize": true,
                "combine": true
            },
            "http": {
                "auth": {
                    "auto": {
                        "url": ""
                    }
                },
                "cache": true,
                "compress": true,
                "redirect": "https://"
            }
        }
    }
}
```

### Get Pak from

[https://github.com/embedthis/pak](https://github.com/embedthis/pak)
