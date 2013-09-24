/*
    log
 */
#include "esp.h"

static bool createLog(Edi *db, cchar *type, cchar *title, cchar *msg)
{
    EdiRec  *rec;

    if ((rec = ediCreateRec(db, "log")) == 0) {
        return MPR_ERR_CANT_CREATE;
    }
    if (!ediSetField(rec, "date", sfmt("%Ld", mprGetTime())) || 
        !ediSetField(rec, "type", type) || 
        !ediSetField(rec, "title", title) || 
        !ediSetField(rec, "message", msg)) {
        return 0;
    }
    if (ediUpdateRec(db, rec) < 0) {
        mprError("Can't update record for log table");
        return 0;
    }
    return 1;
}


static int forward(Edi *db)
{
    int     i, rc;

    rc = 0;
    rc += ediAddTable(db, "log");
    rc += ediAddColumn(db, "log", "id", EDI_TYPE_INT, EDI_AUTO_INC | EDI_INDEX | EDI_KEY);
    rc += ediAddColumn(db, "log", "date", EDI_TYPE_INT, 0);
    rc += ediAddColumn(db, "log", "type", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "log", "title", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "log", "message", EDI_TYPE_STRING, 0);
    if (rc < 0) {
        return rc;
    }
    if (!createLog(db, "warning", "Port limit exceeded", "Port has exceeded configured transfer limit") ||
        !createLog(db, "error", "Port stuck", "Port not operating anymore") ||
        !createLog(db, "critical", "Port failed", "Port interface is not operational")) {
        return MPR_ERR_CANT_WRITE;
    }
    for (i = 0; i < 30; i++) {
        if (!createLog(db, "inform", "Port flow control", "Port exercised flow control")) {
            return MPR_ERR_CANT_WRITE;
        }
    }
    return 0;
}

static int backward(Edi *db)
{
    return ediRemoveTable(db, "log");
}

ESP_EXPORT int esp_migration_log(Edi *db)
{
    ediDefineMigration(db, forward, backward);
    return 0;
}

