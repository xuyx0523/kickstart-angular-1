/*
    user
 */
#include "esp-app.h"

static int forward(Edi *db)
{
    EdiRec  *rec;
    int     rc;

    rc = 0;

    rc += ediAddTable(db, "user");
    rc += ediAddColumn(db, "user", "name", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "user", "password", EDI_TYPE_STRING, 0);
    rc += ediAddColumn(db, "user", "permissions", EDI_TYPE_INT, 0);
    if (rc < 0) {
        return rc;
    }
    if ((rec = ediCreateRec(db, "user")) == 0) {
        return MPR_ERR_CANT_CREATE;
    }
    if (!ediSetField(rec, "name", "admin") ||
        !ediSetField(rec, "password", "") ||
        !ediSetField(rec, "permissions", "0")) {
        mprError("Can't update fields for user table");
        rc = MPR_ERR_CANT_WRITE;
    }
    if (ediUpdateRec(db, rec) < 0) {
        mprError("Can't update record for user table");
        rc = MPR_ERR_CANT_WRITE;
    }
    return rc;
}

static int backward(Edi *db)
{
    return ediRemoveTable(db, "user");
}

ESP_EXPORT int esp_migration_user(Edi *db)
{
    ediDefineMigration(db, forward, backward);
    return 0;
}

