/*
    Stats
 */

#include "esp.h"

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

static void traffic() {}

ESP_EXPORT int esp_module_stats(HttpRoute *route, MprModule *module) 
{
    espDefineAction(route, "stats-data", data);
    espDefineAction(route, "stats-cmd-traffic", traffic);
    return 0;
}
