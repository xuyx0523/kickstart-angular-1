exp-esp
===

Expansive plugin for ESP files. This plugin will compile esp pages into loadable libraries.

Provides the 'esp' service.

### To install:

    pak install exp-esp

### To configure in expansive.json:

* clean &mdash; Command to use to clean the cache. Defaults to 'esp clean'.
* command &mdash; Command to use to compile the files. Defaults to 'esp compile'.
* enable &mdash; Set to true to enable the compilation of ESP files. Defaults to true.
* esp &mdash; Set to the path to the esp command. Appweb users may need to set this to 'appesp'.
* keep &mdash; Keep the dist/\**.esp files after compilation. Note: this means you cannot do stand-alone 
    'esp compile' as the files will not be present to compile. You must do 'expansive render'. Defaults to true.
* options &mdash; ESP command line options to use when serving. Defaults to '--trace stdout:4'
* serve &mdash; ESP command line to invoke esp. If set, the 'options' are not used. Defaults to 'esp'

```
{
    services: {
        'esp': {
            esp: '/path/to/esp/command,
            keep: true
            serve: 'esp --log stdout:4 --trace stdout:4',
        }
    }
}
```

### Get Pak from

[https://embedthis.com/pak/](https://embedthis.com/pak/)

