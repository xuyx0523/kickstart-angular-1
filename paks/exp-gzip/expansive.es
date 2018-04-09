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
            mappings: [ 'html', 'css', 'js', 'txt', 'ttf', 'xml' ]

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
                    transform.files.push(meta.dest)
                }
                return contents
            },

            post: function(transform) {
                let service = transform.service
                let files = transform.files || []
                /*
                    Double check all files in dist with the mapping patterns. This compresses ./files
                 */
                let patterns = []
                for each (ext in Object.getOwnPropertyNames(transform.mappings)) {
                    patterns.push('**.' + ext)
                }
                patterns.push('!**.gz')
                trace('Compress', patterns.join(' '))
                files += directories.dist.files(patterns, {directories: false, contents: true})

                for each (file in files.unique()) {
                    let dest = file.joinExt('gz', true)
                    if (file.exists && !dest.exists) {
                        vtrace('Compress', file)
                        if (transform.service.keep) {
                            //  Alpine does not have --keep
                            //  Cmd.run('gzip --keep "' + file + '"', {filter: true})
                            let keep = file.joinExt('keep', true)
                            Path(file).copy(keep)
                            Cmd.run('gzip "' + file + '"', {filter: true})
                            Path(keep).rename(file)
                        } else {
                            Cmd.run('gzip "' + file + '"', {filter: true})
                        }
                    }
                }
            }
        }
    }
})
