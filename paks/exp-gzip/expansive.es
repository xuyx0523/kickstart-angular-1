/*
    expansive.es - Configuration for exp-gzip

    Compress final content
 */
Expansive.load({
    transforms: {
        name:   'compress',
        files:  [ '**.html', '**.css', '**.js', '**.ttf' ],
        script: `
            function post(meta, service) {
                let gzip = Cmd.locate('gzip')
                if (!gzip) {
                    trace('Warn', 'Cannot find gzip')
                    return
                }
                for each (file in directories.dist.files(service.files, {directories: false})) {
                    file.joinExt('gz', true).remove()
                    Cmd.run('gzip --keep "' + file + '"', {filter: true})
                }
            }
        `
    }
})
