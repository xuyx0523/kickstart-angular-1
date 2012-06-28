/*
    Navigation
 */

#include "esp-app.h"

#if UNUSED
function NavigationController() {
    removeCheckers()
}
#endif

//  MOB - move to edi.h

#define ITERATE_RECS(grid, item, next) next = 0; grid && (item = grid->records[next++]) != 0;


static void list() {
    MprBuf      *ports, *vlans, *mappings;
    EdiRec      *port, *vlan, *mapping;
    cchar       *data, *id;
    int         next;

    //  MOB -- currently encoding the controller in "class"
    ports = mprCreateBuf(0, 0);
    for (ITERATE_RECS(readTable("port"), port, next)) {
        //  MOB - should be URI?
        //  MOB - should there be an espGetField(rec, "name")
        if (next > 1) mprPutStringToBuf(ports, ",\n");
        //  MOB - id property not required
        id = ediGetField(port, "id"); 
        mprPutFmtToBuf(ports, "{ 'text': '%s', 'url': 'port/%s/edit', 'id': '%s'}", 
            ediGetField(port, "name"), id, id);
    }

    vlans = mprCreateBuf(0, 0);
    for (ITERATE_RECS(readTable("vlan"), vlan, next)) {
        if (next > 1) mprPutStringToBuf(vlans, ",\n");
        //  MOB - id property not required
        mprPutFmtToBuf(vlans, "{ 'text': '%s', 'url': 'vlan/edit', 'id': '%s'}", 
            ediGetField(vlan, "name"), ediGetField(vlan, "id")); 
    }
    mappings = mprCreateBuf(0, 0);
    for (ITERATE_RECS(readTable("mapping"), mapping, next)) {
        if (next > 1) mprPutStringToBuf(mappings, ",\n");
        //  MOB - id property not required
        mprPutFmtToBuf(mappings, "{ 'text': '%s', 'url': 'mapping/edit', 'id': '%s'}", 
            ediGetField(mapping, "name"), ediGetField(mapping, "id")); 
    }

#if UNUSED
    let i = 0
    for each (map in Port2Vlan.findAll()) {
        let name = map.port.name + "-" + map.vlan.name
        if (map.tagged == "Tagged") {
            name += "-t"
        }
        mappings.append( { "text": name, "url": "Port2Vlan/edit", "id": "" + map.id })
        if (i > 4) {
            //  DEMO
            break
        }
        i++
    }
#endif
    data = sreplace(sfmt("\
[{ \n\
    'text': 'Layer2 Admin-44', \n\
    'expanded': true, \n\
    'children': [{ \n\
            'text': 'Ports', \n\
            'url': 'port', \n\
            'children': [%s]\n\
        }, {\n\
            'text': 'VLANs', \n\
            'url': 'vlan', \n\
            'children': [%s]\n\
        }, {\n\
            'text': 'Mappings', \n\
            'url': 'mappings', \n\
            'children': [%s]\n\
    }]\n\
}, {\n\
    'text': 'Statistics', \n\
    'url': 'Stats/', \n\
    'children': [{ \n\
        'text': 'Packet Traffic', \n\
        'url': 'Stats/traffic' \n\
    }, { \n\
        'text': 'Demo', \n\
        'url': 'Stats/' \n\
    }]\n\
}]\n", mprGetBufStart(ports), mprGetBufStart(vlans), mprGetBufStart(mappings)), "'", "\"");
    mprLog(4, "Navigation data: %s", data);
    render(data);
}


ESP_EXPORT int esp_controller_navigation(HttpRoute *route, MprModule *module)
{
    espDefineAction(route, "navigation-list", list);
    return 0;
}

