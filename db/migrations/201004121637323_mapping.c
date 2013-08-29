/*
    mapping
 */
#include "esp.h"

static int forward(Edi *db)
{
    EdiRec  *rec;
    int     rc, i;

    rc = 0;

    rc += ediAddTable(db, "mapping");
    rc += ediAddColumn(db, "mapping", "id", EDI_TYPE_INT, EDI_AUTO_INC | EDI_INDEX | EDI_KEY);
    rc += ediAddColumn(db, "mapping", "portId", EDI_TYPE_INT, EDI_FOREIGN);
    rc += ediAddColumn(db, "mapping", "vlanId", EDI_TYPE_INT, EDI_FOREIGN);
    rc += ediAddColumn(db, "mapping", "tagged", EDI_TYPE_STRING, 0);
    if (rc < 0) {
        return rc;
    }
    if ((rec = ediCreateRec(db, "mapping")) == 0) {
        return MPR_ERR_CANT_CREATE;
    }
    for (i = 0; i < 4; i++) {
        if (!ediSetField(rec, "portId", itos(i + 1)) ||
            !ediSetField(rec, "tagged", "untagged") ||
            !ediSetField(rec, "vlanId", "1")) {
            mprError("Can't update fields for mapping table");
            rc = MPR_ERR_CANT_WRITE;
            break;
        }
        if (ediUpdateRec(db, rec) < 0) {
            mprError("Can't update record for mapping table");
            rc = MPR_ERR_CANT_WRITE;
            break;
        }
    }
    return rc;
}

static int backward(Edi *db)
{
    return ediRemoveTable(db, "mapping");
}

ESP_EXPORT int esp_migration_mapping(Edi *db)
{
    ediDefineMigration(db, forward, backward);
    return 0;
}
