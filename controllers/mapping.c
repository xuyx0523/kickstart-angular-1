/*
    mapping.c - Port to VLAN mappings
 */
#include "esp.h"

static void createMapping() {
    EdiRec      *vlan;

    if ((vlan = readRecWhere("vlan", "name", "==", param("vlan"))) == 0) {
        sendResult(feedback("error", "Cannot find: %s", param("vlan")));
        return;
    }
    setParam("vlanId", getField(vlan, "id")); 
    sendResult(createRecFromParams("mapping"));
}

static void getMapping() {
    sendRec(readRec("mapping", param("id")));
}

static void listMappings() {
    sendGrid(readTable("mapping"));
}

static void removeMapping() {
    sendResult(removeRec("mapping", param("id")));
}

static void updateMapping() {
    sendResult(updateRecFromParams("mapping"));
}

ESP_EXPORT int esp_controller_kickstart_mapping(HttpRoute *route, MprModule *module)
{
    espDefineAction(route, "mapping-create", createMapping);
    espDefineAction(route, "mapping-get", getMapping);
    espDefineAction(route, "mapping-list", listMappings);
    espDefineAction(route, "mapping-remove", removeMapping);
    espDefineAction(route, "mapping-update", updateMapping);
    return 0;
}
