/*
    table.c - Database table browser
 */
#include "esp.h"

static void getTable() {
    sendGrid(readTable(param("name")));
}

static void listTables() {
    Edi     *edi;
    MprList *tables;
    MprBuf  *buf;
    cchar   *item;
    int     next;

    edi = getDatabase();
    tables = ediGetTables(edi);
    buf = mprCreateBuf(0, 0);
    mprPutStringToBuf(buf, "{");
    for (ITERATE_ITEMS(tables, item, next)) {
        mprPutToBuf(buf, "\"%s\",", item);
    }
    mprAdjustBufEnd(buf, -1);
    mprPutStringToBuf(buf, "}");
    mprAddNullToBuf(buf);
    renderString(mprGetBufStart(buf));
}

ESP_EXPORT int esp_controller_kickstart_table(HttpRoute *route, MprModule *module)
{
    espDefineAction(route, "table-get", getTable);
    espDefineAction(route, "table-list", listTables);
    return 0;
}

