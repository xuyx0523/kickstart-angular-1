/*
    Mapping
 */
#include "esp-app.h"

static void create() {
    if (updateRec(createRec("mapping", params()))) {
        inform("New mapping created");
        setFlash("redraw", "true");
        renderView("mapping-list");
    } else {
        renderView("mapping-edit");
    }
}

static void destroy() {
    if (removeRec("mapping", param("id"))) {
        inform("Mapping %s removed", param("id"));
    }
    setFlash("redraw", "true");
    renderView("mapping-list");
}

static void edit() {
    //  MOB - uses params.id
    readRec("mapping");
}

static void init() {
    createRec("mapping", 0);
    renderView("mapping-edit");
}

static void update() {
    if (updateFields("mapping", params())) {
        inform("Mapping updated successfully.");
        renderView("mapping-list");
    } else {
        /* Validation failed */
        renderView("mapping-edit");
    }
}

ESP_EXPORT int esp_controller_mapping(HttpRoute *route, MprModule *module) 
{
    espDefineAction(route, "mapping-create", create);
    espDefineAction(route, "mapping-destroy", destroy);
    espDefineAction(route, "mapping-edit", edit);
    espDefineAction(route, "mapping-init", init);
#if UNUSED
    espDefineAction(route, "mapping-list", list);
    espDefineAction(route, "mapping-show", show);
#endif
    espDefineAction(route, "mapping-update", update);
    return 0;
}
