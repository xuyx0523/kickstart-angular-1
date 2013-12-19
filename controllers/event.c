/*
    event.c - Events controller
 */
#include "esp.h"

static void getEvent() {
    sendRec(readRec("event", param("id")));
}

static void listEvents() {
    sendGrid(readTable("event"));
}

static void removeEvent() {
    if (canUser("edit", 1)) {
        sendResult(removeRec("event", param("id")));
    }
}

ESP_EXPORT int esp_controller_kickstart_event(HttpRoute *route, MprModule *module)
{
    espDefineAction(route, "event-get", getEvent);
    espDefineAction(route, "event-list", listEvents);
    espDefineAction(route, "event-remove", removeEvent);
    return 0;
}
