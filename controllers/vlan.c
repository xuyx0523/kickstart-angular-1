/*
    Vlan
 */
#include "esp.h"

static void createVlan() {
    renderResult(createRecFromParams("vlan"));
}

static void getVlan() {
    renderRec(readRec("vlan", param("id")));
}

static void getVlanPorts() {
    Edi         *db;
    EdiGrid     *mapping, *vlans, *ports, *result;

    db = getDatabase();
    mapping = ediReadWhere(db, "mapping", "vlanId", "==", param("id"));
    vlans = ediReadTable(db, "vlan");
    ports = ediReadTable(db, "port");
    result = ediJoin(db, mapping, vlans, ports, NULL);
//MOB
    espDumpGrid(result);
    renderGrid(result);
}

static void listVlans() {
    // setStatus(404);
    renderGrid(readTable("vlan"));
}

static void removeVlan() {
    renderResult(removeRec("vlan", param("id")));
}

static void updateVlan() {
    renderResult(updateRecFromParams("vlan"));
}

/*
    addPort: id, port
 */
static void addPort() {
    Edi         *db;
    EdiRec      *port;
    EdiGrid     *maps;
    cchar       *vlanId;
    int         i;

    db = getDatabase();
    //  MOB - addParam()
    if (!param("tagged")) {
        setParam("tagged", "untagged");
    }
    if ((port = ediReadOneWhere(db, "port", "name", "==", param("port"))) == 0) {
        //  MOB - better API
        feedback("error", "Cannot find: tty \"%s\"", param("port"));
        renderResult(0);
        return;
    }
    vlanId = param("id");
    setParam("vlanId", vlanId);
    setParam("portId", port->id);

    /*
        Check if mapping already exists
        MOB - Need API to to multipare (AND) queries
     */
    if ((maps = readRecsWhere("mapping", "portId", "==", port->id)) != 0) {
        for (i = 0; i < maps->nrecords; i++) {
            if (smatch(getField(maps->records[i], "vlanId"), param("id"))) {
                renderResult(1);
                return;
            }
        }
    }
    renderResult(createRecFromParams("mapping"));
}

static void removePort() {
    Edi         *db;
    EdiRec      *port;
    EdiGrid     *maps;
    cchar       *vlanId;
    int         i;

    db = getDatabase();
    if ((port = ediReadOneWhere(db, "port", "name", "==", param("port"))) == 0) {
        //  MOB - better API
        feedback("error", "Cannot find: tty \"%s\"", param("port"));
        renderResult(0);
        return;
    }
    vlanId = param("id");
    if ((maps = readRecsWhere("mapping", "portId", "==", port->id)) != 0) {
        for (i = 0; i < maps->nrecords; i++) {
            if (smatch(getField(maps->records[i], "vlanId"), param("id"))) {
                renderResult(removeRec("mapping", maps->records[i]->id));
                return;
            }
        }
    }
    feedback("error", "Cannot find: mapping");
    renderResult(0);
}

ESP_EXPORT int esp_module_vlan(HttpRoute *route, MprModule *module)
{
    Edi     *edi;

    edi = getDatabase();
    espDefineAction(route, "vlan-create", createVlan);
    espDefineAction(route, "vlan-get", getVlan);
    espDefineAction(route, "vlan-list", listVlans);
    espDefineAction(route, "vlan-remove", removeVlan);
    espDefineAction(route, "vlan-update", updateVlan);
    espDefineAction(route, "vlan-ports", getVlanPorts);
    espDefineAction(route, "vlan-add", addPort);
    espDefineAction(route, "vlan-remove", removePort);

    ediAddValidation(edi, "format", "vlan", "name", "^vlan\\d\\d$");
    return 0;
}
