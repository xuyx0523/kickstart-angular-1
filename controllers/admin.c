/*
    Admin
 */

#include "esp-app.h"

static void show() {
}

ESP_EXPORT int esp_controller_admin(HttpRoute *route, MprModule *module) 
{
    espDefineAction(route, "admin-show", show);
    return 0;
}
