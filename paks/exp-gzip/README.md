exp-gzip
===

Expansive plugin for gzip.

Provides the 'compress' service.

### To install:

    pak install exp-gzip

### To configure in expansive.json:

* compress.enable &mdash; Enable compressing all files using gzip.
* compress.extra &mdash; Extra files to compress. Typically used to compress unprocessed files from ./files.
* compress.mappings &mdash; File extensions to compress. Defaults to: mappings: { 'html' 'css', 'js' 'ttf' }.
* compress.keep &mdash; Keep uncompressed file after compressing. Defaults to true.

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
