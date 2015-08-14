/*
    expansive.es - Configuration for exp-esp

    Post process by compiling esp pages, controllers and apps
 */
Expansive.load({
    transforms: [{
        name:    'compile-esp',
        clean:   'esp clean',
        command: 'esp compile',
        esp:     Cmd.locate('esp'),
        files:   null,
        remove:  false,
        script: `
            function post(meta, service) {
                let esp = service.esp
                if (!esp) {
                    trace('Warn', 'Cannot find esp')
                    return
                }
                try {
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
                                trace('Compile', service.command, path)
                                run(service.command.split(' ') + [path])
                                if (service.remove) {
                                    path.remove()
                                }
                            }
                        }
                    } else {
                        trace('Clean', service.clean)
                        run(service.clean)
                        trace('Compile', service.command)
                        run(service.command)
                        for each (path in expansive.directories.dist.files('**.esp')) {
                            if (service.remove) {
                                path.remove()
                                path.dirname.remove()
                            }
                        }
                    }
                } catch (e) {
                    trace('Error', "ESP compilation failed")
                    print(e)
                }
            }
        `

    }, {
        name:     'serve-esp',
        command:  'esp',
        trace:    '--trace stdout:4',
        script: `
            let service = expansive.services['serve-esp']
            if (service.command == 'esp') {
                service.command += ' ' + service.trace + ' ' + (expansive.control.listen || '127.0.0.1:5000')
            } else {
                service.command += ' ' + service.trace
            }
            expansive.control.server ||= service.command
        `
    }]
})
