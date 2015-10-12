exp-esp
===

Expansive plugin for ESP files.

Provides the 'compile-esp' service.

### To install:

    pak install exp-esp

### To configure in expansive.json:

* compile-esp.clean &mdash; Command to use to clean the cache. Defaults to 'esp clean'.
* compile-esp.command &mdash; Command to use to compile the files. Defaults to 'esp compile'.
* compile-esp.enable &mdash; Set to true to enable the compilation of ESP files. Defaults to true.
* compile-esp.esp &mdash; Set to the path to the esp command. Appweb users may need to set this to
    appesp.
* compile-esp.files &mdash; Set to a file pattern for the files to compile. Defaults to '**.esp'.
* compile-esp.remove &mdash; Remove the dist/*.esp files after compilation. Note: this 
    means you cannot do stand-alone 'esp compile' as the file will not be present to compile.
    You must do 'expansive render'. Defaults to false.
* serve-esp.command &mdash; ESP command line to invoke esp.

```
{
    services: {
        'compile-esp': {
            enable: true,
            esp: '/path/to/esp/command,
            remove: false
        }
        'serve-esp': {
            command: 'esp --log stdout:4 --trace stdout:4',
        }
    }
}
```

### Get Pak from

[https://embedthis.com/pak/](https://embedthis.com/pak/)

