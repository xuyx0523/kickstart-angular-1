/*
    Migration system
 */
#include "esp.h"

static int forward(Edi *db) {
    ediAddTable(db, "system");
    ediAddColumn(db, "system", "id", EDI_TYPE_INT, EDI_AUTO_INC | EDI_INDEX | EDI_KEY);
    return 0;
}

static int backward(Edi *db) {
    ediRemoveTable(db, "system");
    return 0;
}

ESP_EXPORT int esp_migration_migration_system(Edi *db)
{
    ediDefineMigration(db, forward, backward);
    return 0;
}
