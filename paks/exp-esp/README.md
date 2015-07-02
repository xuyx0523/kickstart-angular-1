exp-esp
===

Expansive plugin for ESP files.

Provides the 'compile-esp' service.

### To install:

    pak install exp-esp

### To configure in expansive.json:

* compile-esp.enable &mdash; Set to true to enable the compilation of ESP files. Defaults to true.
* compile-esp.remove &mdash; Remove the dist/*.esp files after compilation. Note: this 
    means you cannot do stand-alone 'esp compile' as the file will not be present to compile.
    You must do 'expansive render'. Defaults to false.
* serve-esp.command &mdash; ESP command line to invoke esp.

```
{
    services: {
        'compile-esp': {
            enable: true
        }
        'serve-esp': {
            command: 'esp --log stdout:4 --trace stdout:4',
        }
    }
}
```

### Get Pak from

[https://embedthis.com/pak/](https://embedthis.com/pak/download.html)
