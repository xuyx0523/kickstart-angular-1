/*
    expansive.es - Configuration for exp-esp

    Post process by compiling esp pages, controllers and apps
 */
Expansive.load({
    transforms: [{
        name:   'compile-esp',
        files:  null,
        remove: false,
        script: `
            function post(meta, service) {
                let esp = Cmd.locate('esp')
                if (!esp) {
                    trace('Warn', 'Cannot find esp')
                    return
                }
                if (expansive.filters || service.files) {
                    let files = expansive.directories.dist.files(service.files || '**.esp')
                    for each (path in files) {
                        let match = false
                        for each (filter in expansive.filters) {
                            filter = expansive.directories.dist.join(Path(filter).trimComponents(1))
                            if (filter.startsWith(path) || path.startsWith(filter)) {
                                match = true
                                break
                            }
                        }
                        if (match) {
                            trace('Compile', 'esp compile', path)
                            run([esp, 'compile', path])
                            if (service.remove) {
                                path.remove()
                            }
                        }
                    }
                } else {
                    trace('Compile', 'esp compile')
                    run([esp, 'compile'])
                    for each (path in expansive.directories.dist.files('**.esp')) {
                        if (service.remove) {
                            path.remove()
                        }
                    }
                }
            }
        `

    }, {
        name:     'serve-esp',
        command:  'esp --trace stdout:4',
        script: `
            let service = expansive.services['serve-esp']
            expansive.control.server ||= service.command
        `
    }]
})
