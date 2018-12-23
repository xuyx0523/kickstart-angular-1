/*
    status.c -- Overall system status. Used for the UI banner.
 */
#include "esp.h"

static void getStatus() {
    EdiGrid     *grid;
    HttpConn    *conn = getConn();
    int         count;

    /*
        Get top five event messages
     */
    count = 0;
    if ((grid = readTable("event")) != 0) {
        count = grid->nrecords;
        grid->nrecords = min(grid->nrecords, 5);
    }
    httpAddHeaderString(conn, "Content-Type", "application/json");
    espRender(conn, "{\n  \"eventCount\": %d, \"data\": %s, \"schema\": %s}\n",
        count, ediGridAsJson(grid, 0), ediGetGridSchemaAsJson(grid));
}

ESP_EXPORT int esp_controller_kickstart_status(HttpRoute *route)
{
    espDefineAction(route, "status/get", getStatus);
    return 0;
}
