/*
    event migration
 */
#include "esp.h"

static bool createEvent(Edi *db, cchar *type, cchar *title, cchar *msg)
{
    EdiRec  *rec;

    if ((rec = ediCreateRec(db, "event")) == 0) {
        return MPR_ERR_CANT_CREATE;
    }
    if (!ediSetField(rec, "date", sfmt("%Ld", mprGetTime() + (rand() % 3600000))) || 
        !ediSetField(rec, "type", type) || 
        !ediSetField(rec, "title", title) || 
        !ediSetField(rec, "message", msg)) {
        return 0;
    }
    if (ediUpdateRec(db, rec) < 0) {
        mprError("Can't update record for event table");
        return 0;
    }
    return 1;
}


static int forward(Edi *db)
{
    int     i, rc;

    rc = 0;
    rc += ediAddTable(db, "event");
    rc += ediAddColumn(db, "event", "id", EDI_TYPE_INT, EDI_AUTO_INC | EDI_INDEX | EDI_KEY);
    rc += ediAddColumn(db, "event", "date", EDI_TYPE_DATE, 0);
    rc += ediAddColumn(db, "event", "type", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "event", "title", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "event", "message", EDI_TYPE_STRING, 0);
    if (rc < 0) {
        return rc;
    }
    if (!createEvent(db, "warning", "Port limit exceeded", "Port 14 has exceeded maximum sustained transfer limit") ||
        !createEvent(db, "error", "Port stuck", "Port 1 not operating anymore") ||
        !createEvent(db, "critical", "Port failed", "Port 2 is not operational") ||
        !createEvent(db, "infom", "Port enabled", "Port 7 enabled")) {
        return MPR_ERR_CANT_WRITE;
    }
    for (i = 0; i < 30; i++) {
        if (!createEvent(db, "inform", "Port flow control", "Port exercised flow control")) {
            return MPR_ERR_CANT_WRITE;
        }
    }
    return 0;
}

static int backward(Edi *db)
{
    return ediRemoveTable(db, "event");
}

ESP_EXPORT int esp_migration_event(Edi *db)
{
    ediDefineMigration(db, forward, backward);
    return 0;
}

