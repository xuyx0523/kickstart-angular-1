exp-gzip
===

Expansive plugin for gzip.

Provides the 'compress' service.

### To install:

    pak install exp-gzip

### To configure in expansive.json:

* compress.enable &mdash; Enable compressing all files using gzip.
* compress.files &mdash; Array of file patterns to compress. Defaults to *.html, *.css, *.js.

```
{
    services: {
        compress: {
            enable: true,
            files:  [ '**.html', '**.css', '**.js' ]
        }
    }
}
```

### Get Pak from

[https://embedthis.com/pak/](https://embedthis.com/pak/download.html)
