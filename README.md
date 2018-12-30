Embedthis Kickstart Management Application
===

### Requirements

To build and run you will need to install Expansive and ESP. See:

    https://github.com/embedthis/expansive
    https://github.com/embedthis/esp

### To build:

    pak profile dev
    expansive --clean render

For production, use:

    pak profile prod
    expansive --clean render

### To run:
    esp -v

### To configure:

The expansive build configuration is described by expansive.json. The ESP runtime configuration is described by esp.json.

### Notes

You can run Kickstart via ESP or you can use Appweb which includes ESP. To use Appweb, please consult the [Appweb](https://www.embedthis.com/appweb) documentation for details of hosting ESP applications.

### Documentation

Kickstart uses [Expansive](https://www.embedthis.com/expansive) for rendering the application web pages at build time. Kickstart uses [ESP](https://www.embedthis.com/esp) to serve the pages and invoke controllers and actions at runtime.

### Licensing

Please see LICENSE.md

Copyright
---

Copyright (c) Embedthis Software. All Rights Reserved.  Embedthis and ESP are trademarks of Embedthis Software, LLC. Other brands and their products are trademarks of their respective holders.
