/*
    Vlan
 */
#include "esp-app.h"

static void create() {

    if (updateRec(createRec("vlan", params()))) {
        inform("New VLAN created");
        setFlash("redraw", "true");
        renderView("vlan-list");
    } else {
        renderView("vlan-edit");
    }
}

static void destroy() {
    if (removeRec("vlan", param("id"))) {
        inform("VLAN %s removed", param("id"));
    }
    setFlash("redraw", "true");
    renderView("vlan-list");
}

static void edit() {
    if (!readRec("vlan")) {
        setFlash("error", "Can't find VLAN %s", param("id"));
        renderView("list");
    }
}

static void init() {
    createRec("vlan", 0);
    renderView("vlan-edit");
}

static void update() {
    if (updateFields("vlan", params())) {
        inform("Vlan updated successfully.");
        renderView("vlan-list");
    } else {
        /* Validation failed */
        renderView("vlan-edit");
    }
}


ESP_EXPORT int esp_controller_vlan(HttpRoute *route, MprModule *module)
{
    espDefineAction(route, "vlan-create", create);
    espDefineAction(route, "vlan-destroy", destroy);
    espDefineAction(route, "vlan-edit", edit);
    espDefineAction(route, "vlan-init", init);
    espDefineAction(route, "vlan-update", update);
    return 0;
}
