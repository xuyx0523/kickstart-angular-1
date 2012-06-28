/*
    Stats
 */

#include "esp-app.h"

static void data() {
    double     prior, result;
   
    prior = (double) stoi(param("prior"));
    result = (prior * 0.9) + (random() * 0.1);
    setHeader("Content-Type", "text/javascript");
#if UNUSED
    //  MOB - need renderJson
#endif
    render("%d", (int) result);
}


ESP_EXPORT int esp_controller_stats(HttpRoute *route, MprModule *module) 
{
    espDefineAction(route, "stats-data", data);
    return 0;
}
