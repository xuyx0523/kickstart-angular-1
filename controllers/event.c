/*
    event.c - Events controller
 */
#include "esp.h"

static void getEvent() {
    renderRec(readRec("event", param("id")));
}

static void listEvents() {
    renderGrid(readTable("event"));
}

static void removeEvent() {
    if (canUser("edit", 1)) {
        renderResult(removeRec("event", param("id")));
    }
}

ESP_EXPORT int esp_controller_layer2_event(HttpRoute *route)
{
    Edi     *edi;

    edi = getDatabase();
    espDefineAction(route, "event-get", getEvent);
    espDefineAction(route, "event-list", listEvents);
    espDefineAction(route, "event-remove", removeEvent);
    return 0;
}
