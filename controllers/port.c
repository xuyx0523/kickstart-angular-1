/*
    port.c - Port controller
 */
#include "esp.h"

static void getPort() {
    renderRec(readRec("port", param("id")));
}

static void getPortVlans() {
    Edi         *db;
    EdiGrid     *mappings, *vlans, *grid;

    db = getDatabase();
    mappings = readWhere("mapping", "portId", "==", param("id"));
    vlans = ediReadTable(db, "vlan");
    grid = ediJoin(db, mappings, vlans, NULL);
    renderGrid(grid);
}

static void listPorts() {
    renderGrid(readTable("port"));
}

static void updatePort() {
    if (canUser("edit", 1)) {
        renderResult(updateRecFromParams("port"));
    }
}

ESP_EXPORT int esp_controller_layer2_port(HttpRoute *route, MprModule *module)
{
    Edi     *edi;

    espDefineAction(route, "port-get", getPort);
    espDefineAction(route, "port-list", listPorts);
    espDefineAction(route, "port-update", updatePort);
    espDefineAction(route, "port-vlans", getPortVlans);

    edi = espGetRouteDatabase(route);
    ediAddValidation(edi, "format", "port", "mode", "^(Online|Offline)$");
    ediAddValidation(edi, "format", "port", "negotiate", "^(Enabled|Disabled)$");
    ediAddValidation(edi, "format", "port", "duplex", "^(Half|Full)$");
    ediAddValidation(edi, "format", "port", "flowControl", "^(Enabled|Disabled)$");
    ediAddValidation(edi, "format", "port", "jumbo", "^(Enabled|Disabled)$");
    ediAddValidation(edi, "format", "port", "name", "^tty\\d\\d$");
    ediAddValidation(edi, "format", "port", "speed", "^(1000|10000|40000)$");
    return 0;
}
