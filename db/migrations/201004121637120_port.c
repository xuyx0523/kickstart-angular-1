/*
    port
 */
#include "esp-app.h"

static int forward(Edi *db) 
{
    EdiRec  *rec;
    int     rc, i;

    rc = 0;
    rc += ediAddTable(db, "port");
    rc += ediAddColumn(db, "port", "id", EDI_TYPE_INT, EDI_AUTO_INC | EDI_INDEX | EDI_KEY);
    rc += ediAddColumn(db, "port", "adminMode", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "port", "autoNegotiate", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "port", "duplex", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "port", "flowControl", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "port", "jumbo", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "port", "name", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "port", "status", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "port", "pvid", EDI_TYPE_INT, 0);
    rc += ediAddColumn(db, "port", "speed", EDI_TYPE_INT, 0);
    rc += ediAddColumn(db, "port", "state", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "port", "type", EDI_TYPE_STRING, 0);

    //  MOB - does this need to be inside the loop?
    if ((rec = ediCreateRec(db, "port")) == 0) {
        return MPR_ERR_CANT_CREATE;
    }
    for (i = 0; i < 16; i++) {
        //  MOB - inconsistent return code ediSetField returns rec, but ediUpdateRec returns int
        if (!ediSetField(rec, "adminMode", "Up") ||
            !ediSetField(rec, "autoNegotiate", "Enabled") ||
            !ediSetField(rec, "duplex", "Full") ||
            !ediSetField(rec, "flowControl", "Enabled") ||
            !ediSetField(rec, "jumbo", "Disabled") ||
            !ediSetField(rec, "name", sfmt("ge%02d", i)) ||
            !ediSetField(rec, "status", "Down") ||
            !ediSetField(rec, "pvid", "1") ||
            !ediSetField(rec, "speed", "1000") ||
            !ediSetField(rec, "state", "Enabled") ||
            !ediSetField(rec, "type", "Physical")) {
            mprError("Can't update field for port table");
            rc = MPR_ERR_CANT_WRITE;
            break;
        }
        if (ediUpdateRec(db, rec) < 0) {
            mprError("Can't update record for port table");
            rc = MPR_ERR_CANT_WRITE;
            break;
        }
    }
    return rc;
}

static int backward(Edi *db) 
{
    return ediRemoveTable(db, "port");
}

ESP_EXPORT int esp_migration_port(Edi *db) 
{
    ediDefineMigration(db, forward, backward);
    return 0;
}
