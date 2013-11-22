/*
    setting.c - UI Settings
 */
#include "esp.h"

static void getSettings() { 
    sendRec(readRec("settings", "1"));
}

static void updateSettings() { 
    if (canUser("edit", 1)) {
        sendResult(updateRecFromParams("settings"));
    }
}

ESP_EXPORT int esp_controller_kick_setting(HttpRoute *route, MprModule *module)
{
    Edi     *edi;

    edi = espGetRouteDatabase(route);
    //  MOB - inconsistent setting/settings
    espDefineAction(route, "setting-get", getSettings);
    espDefineAction(route, "setting-update", updateSettings);
    ediAddValidation(edi, "format", "settings", "email", "(^$|@)");
    return 0;
}
