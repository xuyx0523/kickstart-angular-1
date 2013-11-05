/*
    mapping.c - Port to VLAN mappings
 */
#include "esp.h"

static void createMapping() {
    EdiRec      *vlan;

    if ((vlan = readRecWhere("vlan", "name", "==", param("vlan"))) == 0) {
        renderResult(feedback("error", "Cannot find: %s", param("vlan")));
        return;
    }
    setParam("vlanId", getField(vlan, "id")); 
    renderResult(createRecFromParams("mapping"));
}

static void getMapping() {
    renderRec(readRec("mapping", param("id")));
}

static void listMappings() {
    renderGrid(readTable("mapping"));
}

static void removeMapping() {
    renderResult(removeRec("mapping", param("id")));
}

static void updateMapping() {
    renderResult(updateRecFromParams("mapping"));
}

ESP_EXPORT int esp_controller_kick_mapping(HttpRoute *route, MprModule *module)
{
    espDefineAction(route, "mapping-create", createMapping);
    espDefineAction(route, "mapping-get", getMapping);
    espDefineAction(route, "mapping-list", listMappings);
    espDefineAction(route, "mapping-remove", removeMapping);
    espDefineAction(route, "mapping-update", updateMapping);
    return 0;
}
