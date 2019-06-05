 Embedthis Kickstart Management Application
===

Kickstart is a sample application that demonstrates use of [ESP](https://www.embedthis.com/esp) to create a device management application. It uses [Expansive](https://www.expansive.com) to build and render web pages at build time.

### Branches
The repository has two branches:

* master - Most recent release of the software.
* dev - Current ongoing development, may be less reliable.

We recommend using the master branch.

### Requirements

To build and run you will need to install Expansive and ESP. See:

    https://github.com/embedthis/expansive
    https://github.com/embedthis/esp

You will also need to install the following tools:

    npm install html-minifier -g
    npm install less -g
    npm install ng-annotate -g
    npm install postcss -g
    npm install uglifyjs -g

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
