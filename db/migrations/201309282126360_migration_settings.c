/*
    settings migration
 */
#include "esp.h"

static int forward(Edi *db) {
    EdiRec  *rec;

    ediAddTable(db, "settings");
    ediAddColumn(db, "settings", "id", EDI_TYPE_INT, EDI_AUTO_INC | EDI_INDEX | EDI_KEY);

    ediAddColumn(db, "settings", "http", EDI_TYPE_INT, 0);
    ediAddColumn(db, "settings", "https", EDI_TYPE_INT, 0);
    ediAddColumn(db, "settings", "sslKey", EDI_TYPE_STRING, 0);
    ediAddColumn(db, "settings", "sslCert", EDI_TYPE_STRING, 0);

    ediAddColumn(db, "settings", "emailAlerts", EDI_TYPE_BOOL, 0);
    ediAddColumn(db, "settings", "email", EDI_TYPE_STRING, 0);
    ediAddColumn(db, "settings", "textAlerts", EDI_TYPE_BOOL, 0);
    ediAddColumn(db, "settings", "phone", EDI_TYPE_STRING, 0);
    
    if ((rec = ediCreateRec(db, "settings")) == 0) {
        return MPR_ERR_CANT_CREATE;
    }
    if (!ediSetField(rec, "emailAlerts", "true") ||
        !ediSetField(rec, "textAlerts", "true") ||
        !ediSetField(rec, "email", "it@example.com") ||
        !ediSetField(rec, "phone", "425-1234560") ||
        !ediSetField(rec, "http", "5000") ||
        !ediSetField(rec, "https", "443") ||
        !ediSetField(rec, "sslKey", "") ||
        !ediSetField(rec, "sslCert", "")) {
        mprError("Cannot update setting field");
        return MPR_ERR_CANT_WRITE;
    }
    if (ediUpdateRec(db, rec) < 0) {
        mprError("Cannot update setting table");
        return MPR_ERR_CANT_WRITE;
    }
    return 0;
}

static int backward(Edi *db) {
    ediRemoveTable(db, "settings");
    return 0;
}

ESP_EXPORT int esp_migration_migration_settings(Edi *db)
{
    ediDefineMigration(db, forward, backward);
    return 0;
}
