/*
    expansive.es - Configuration for exp-gzip

    Compress final content
 */
Expansive.load({

    services: {
        name:   'gzip',
        keep:   true,
        extra:  null,

        transforms: {
            mappings: {
                'html' 'css', 'js' 'ttf'
            },

            init: function(transform) {
                transform.gzip = Cmd.locate('gzip')
                if (!transform.gzip) {
                    trace('Warn', 'Cannot find gzip')
                }
            },

            pre: function(transform) {
                transform.files = []
            },

            render: function(contents, meta, transform) {
                if (meta.isDocument) {
                    transform.files.push(meta.path)
                }
                return contents
            },

            post: function(transform) {
                let service = transform.service
                let files = transform.files
                if (files.length > 0) {
                    trace('Compress', Object.getOwnPropertyNames(transform.mappings).join(' '))
                }
                if (service.extra && service.extra.length > 0) {
                    let dist = directories.dist
                    service.extra.push('!**.gz')
                    files += dist.files(service.extra, {directories: false, contents: true})
                    trace('Compress', service.extra)
                }
                for each (file in files.unique()) {
                    file.joinExt('gz', true).remove()
                    vtrace('Compress', file)
                    if (transform.service.keep) {
                        Cmd.run('gzip --keep "' + file + '"', {filter: true})
                    } else {
                        Cmd.run('gzip  "' + file + '"', {filter: true})
                    }
                }
            }
        }
    }
})
