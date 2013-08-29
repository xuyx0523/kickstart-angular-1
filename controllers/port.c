/*
    port
 */
#include "esp.h"

static void getPort() {
    renderRec(readRec("port", param("id")));
}

static void getPortVlans() {
    Edi         *db;
    EdiGrid     *mappings, *vlans;

    db = getDatabase();
    mappings = ediReadWhere(db, "mapping", "portId", "==", param("id"));
    vlans = ediReadTable(db, "vlan");
    renderGrid(ediJoin(db, mappings, vlans, NULL));
}

static void listPorts() {
    // setStatus(404);
    renderGrid(readTable("port"));
}

static void updatePort() {
    renderResult(updateRecFromParams("port"));
}


ESP_EXPORT int esp_module_port(HttpRoute *route, MprModule *module)
{
    Edi     *edi;

    edi = getDatabase();
    espDefineAction(route, "port-get", getPort);
    espDefineAction(route, "port-list", listPorts);
    espDefineAction(route, "port-update", updatePort);
    espDefineAction(route, "port-vlans", getPortVlans);

//  MOB - should booleans be 0, 1?
    ediAddValidation(edi, "format", "port", "mode", "^(Online|Offline)$");
    ediAddValidation(edi, "format", "port", "negotiate", "^(Enabled|Disabled)$");
    ediAddValidation(edi, "format", "port", "duplex", "^(Half|Full)$");
    ediAddValidation(edi, "format", "port", "flowControl", "^(Enabled|Disabled)$");
    ediAddValidation(edi, "format", "port", "jumbo", "^(Enabled|Disabled)$");
    ediAddValidation(edi, "format", "port", "name", "^tty\\d\\d$");
    ediAddValidation(edi, "format", "port", "speed", "^(1000|10000|40000)$");
#if UNUSED
    ediAddValidation(edi, "format", "port", "status", "^(Normal|Offline)$");
#endif
    return 0;
}
