/*
    ports migration
 */
#include "esp.h"

static int forward(Edi *db) 
{
    EdiRec  *rec;
    int     rc, i;

    rc = 0;
    rc += ediAddTable(db, "port");
    rc += ediAddColumn(db, "port", "id", EDI_TYPE_INT, EDI_AUTO_INC | EDI_INDEX | EDI_KEY);
    rc += ediAddColumn(db, "port", "mode", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "port", "negotiate", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "port", "duplex", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "port", "flowControl", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "port", "jumbo", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "port", "name", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "port", "speed", EDI_TYPE_INT, 0);
    rc += ediAddColumn(db, "port", "status", EDI_TYPE_STRING, 0);

    rc += ediAddColumn(db, "port", "rxBytes", EDI_TYPE_INT, 0);
    rc += ediAddColumn(db, "port", "rxPackets", EDI_TYPE_INT, 0);
    rc += ediAddColumn(db, "port", "txBytes", EDI_TYPE_INT, 0);
    rc += ediAddColumn(db, "port", "txPackets", EDI_TYPE_INT, 0);

    if ((rec = ediCreateRec(db, "port")) == 0) {
        return MPR_ERR_CANT_CREATE;
    }
    for (i = 0; i < 16; i++) {
        //  MOB - inconsistent return code ediSetField returns rec, but ediUpdateRec returns int
        if (!ediSetField(rec, "mode", "Online") ||
            !ediSetField(rec, "negotiate", "Enabled") ||
            !ediSetField(rec, "duplex", "Full") ||
            !ediSetField(rec, "flowControl", "Enabled") ||
            !ediSetField(rec, "jumbo", "Disabled") ||
            !ediSetField(rec, "name", sfmt("tty%02d", i)) ||
            !ediSetField(rec, "speed", "1000") ||
            !ediSetField(rec, "status", "Normal") ||
            !ediSetField(rec, "rxBytes", "0") ||
            !ediSetField(rec, "rxPackets", "0") ||
            !ediSetField(rec, "txBytes", "0") ||
            !ediSetField(rec, "txPackets", "0")) {
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
