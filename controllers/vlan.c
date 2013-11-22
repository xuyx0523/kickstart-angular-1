/*
    Vlan
 */
#include "esp.h"

static void createVlan() {
    addParam("mode", "Online");
    if (canUser("edit", 1)) {
        sendResult(createRecFromParams("vlan"));
    }
}

static void getVlan() {
    sendRec(readRec("vlan", param("id")));
}

static void getVlanMappings() {
    Edi         *db;
    EdiGrid     *mappings, *vlans, *ports, *result;

    db = getDatabase();
    mappings = ediReadWhere(db, "mapping", "vlanId", "==", param("id"));
    vlans = ediReadTable(db, "vlan");
    ports = ediReadTable(db, "port");
    result = ediJoin(db, mappings, vlans, ports, NULL);
    sendGrid(result);
}

static void initVlan() {
    sendRec(setField(createRec("vlan", 0), "mode", "Online"));
}

static void listVlans() {
    sendGrid(readTable("vlan"));
}

static void removeVlan() {
    if (canUser("edit", 1)) {
        sendResult(removeRec("vlan", param("id")));
    }
}

static void updateVlan() {
    addParam("mode", "Online");
    if (canUser("edit", 1)) {
        sendResult(updateRecFromParams("vlan"));
    }
}

static void addPort() {
    Edi         *db;
    EdiRec      *port;
    EdiGrid     *maps;
    cchar       *vlanId;
    int         i;

    db = getDatabase();
    if ((port = ediReadRecWhere(db, "port", "name", "==", param("port"))) == 0) {
        sendResult(feedback("error", "Cannot find: tty '%s'", param("port")));
        return;
    }
    vlanId = param("id");
    setParam("vlanId", vlanId);
    setParam("portId", port->id);

    /*
        Check if mapping already exists
        MOB - Need API to to multipare (AND) queries
     */
    if ((maps = readWhere("mapping", "portId", "==", port->id)) != 0) {
        for (i = 0; i < maps->nrecords; i++) {
            if (smatch(getField(maps->records[i], "vlanId"), param("id"))) {
                sendResult(feedback("error", "Mapping already exists"));
                return;
            }
        }
    }
    sendResult(createRecFromParams("mapping"));
}

static void removePort() {
    Edi         *db;
    EdiRec      *port;
    EdiGrid     *maps;
    cchar       *vlanId;
    int         i;

    db = getDatabase();
    if ((port = ediReadRecWhere(db, "port", "name", "==", param("port"))) == 0) {
        sendResult(feedback("error", "Cannot find: tty '%s'", param("port")));
        return;
    }
    vlanId = param("id");
    if ((maps = readWhere("mapping", "portId", "==", port->id)) != 0) {
        for (i = 0; i < maps->nrecords; i++) {
            if (smatch(getField(maps->records[i], "vlanId"), param("id"))) {
                sendResult(removeRec("mapping", maps->records[i]->id));
                return;
            }
        }
    }
    sendResult(feedback("error", "Cannot find: mapping"));
}

ESP_EXPORT int esp_controller_kick_vlan(HttpRoute *route, MprModule *module)
{
    Edi     *edi;

    espDefineAction(route, "vlan-create", createVlan);
    espDefineAction(route, "vlan-get", getVlan);
    espDefineAction(route, "vlan-init", initVlan);
    espDefineAction(route, "vlan-list", listVlans);
    espDefineAction(route, "vlan-remove", removeVlan);
    espDefineAction(route, "vlan-update", updateVlan);
    espDefineAction(route, "vlan-mappings", getVlanMappings);
    espDefineAction(route, "vlan-addPort", addPort);
    espDefineAction(route, "vlan-removePort", removePort);

    edi = espGetRouteDatabase(route);
    ediAddValidation(edi, "unique", "vlan", "name", 0);
    ediAddValidation(edi, "format", "vlan", "name", "^vlan\\d\\d$");
    ediAddValidation(edi, "format", "vlan", "mode", "^(Online|Offline)$");
    ediAddValidation(edi, "present", "vlan", "description", 0);
    ediAddValidation(edi, "present", "vlan", "status", 0);
    return 0;
}
