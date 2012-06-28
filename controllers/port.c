/*
    port
 */
#include "esp-app.h"

static void edit() {
    readRec("port");
}

static void update() {
    if (updateFields("port", params())) {
        inform("Port updated successfully.");
        renderView("port-list");
    } else {
        /* Validation failed */
        renderView("port-edit");
    }
}


//  MOB - demo
static void writeMoreData()
{
    render("Now done\n");
    finalize();
}


/* 
    Commet style data
 */
static void data() {
    dontAutoFinalize();
    render("Hello, pausing for 5 seconds ... ");
    flush();
    setTimeout(writeMoreData, 5 * MPR_TICKS_PER_SEC, 0);
} 

ESP_EXPORT int esp_controller_port(HttpRoute *route, MprModule *module)
{
    espDefineAction(route, "port-edit", edit);
    espDefineAction(route, "port-update", update);
    espDefineAction(route, "port-data", data);
    return 0;
}
