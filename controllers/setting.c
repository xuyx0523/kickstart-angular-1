/*
    setting.c - UI Settings
 */
#include "esp.h"

static void getSettings() { 
    renderRec(readRec("settings", "1"));
}

static void updateSettings() { 
    if (canUser("edit", 1)) {
        renderResult(updateRecFromParams("settings"));
    }
}

ESP_EXPORT int esp_controller_layer2_setting(HttpRoute *route)
{
    Edi     *edi;

    edi = getDatabase();
    espDefineAction(route, "setting-get", getSettings);
    espDefineAction(route, "setting-update", updateSettings);
    ediAddValidation(edi, "format", "settings", "email", "(^$|@)");
    return 0;
}
