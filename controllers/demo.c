/*
    demo.c - Demo
 */
#include "esp.h"

static void demo1() {
    double  prior, result;

    prior = (double) stoi(param("prior"));
    if (prior) {
        result = (prior * 0.9) + ((random() % 100) * 0.1);
    } else {
        result = random() % 100;
    }
    setHeader("Content-Type", "text/javascript");
    render("%5.1f", result);
}

ESP_EXPORT int esp_controller_layer2_demo(HttpRoute *route, MprModule *module) 
{
    espDefineAction(route, "demo-cmd-demo1", demo1);
    return 0;
}
