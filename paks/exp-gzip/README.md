exp-gzip
===

Expansive plugin for gzip.

Provides the 'compress' service.

### To install:

    pak install exp-gzip

### To configure in expansive.json:

* gzip.enable &mdash; Enable compressing all files using gzip.
* gzip.extra &mdash; Extra files to compress. Typically used to compress unprocessed files from ./files.
* gzip.mappings &mdash; File extensions to compress. Defaults to: [ 'html', 'css', 'js', 'ttf' ].
* gzip.keep &mdash; Keep uncompressed file after compressing. Defaults to true.

```
{
    services: {
        compress: {
            enable: true,
            files:  [ '**.html', '**.css', '**.js' ],
            keep:   false
        }
    }
}
```

### Get Pak from

[https://embedthis.com/pak/](https://embedthis.com/pak/)
