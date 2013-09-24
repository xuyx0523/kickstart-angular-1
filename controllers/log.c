/*
    log
 */
#include "esp.h"

static void getLog() {
    renderRec(readRec("log", param("id")));
}

static void listLogs() {
    renderGrid(readTable("log"));
}

static void removeLog() {
    if (canUser("edit", 1)) {
        renderResult(removeRec("log", param("id")));
    }
}

ESP_EXPORT int esp_controller_layer2_log(HttpRoute *route, MprModule *module)
{
    Edi     *edi;

    edi = getDatabase();
    espDefineAction(route, "log-get", getLog);
    espDefineAction(route, "log-list", listLogs);
    espDefineAction(route, "log-remove", removeLog);
    return 0;
}
