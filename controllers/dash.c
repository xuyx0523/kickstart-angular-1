/*
    dash.c - Dashboard
 */
#include "esp.h"

#if 0
{
    ports: [
        { rxBytes: NN, rxPackets: NN, txBytes: NN, txPackets: NN }
    ],
    vlans: [
        { rxBytes: NN, rxPackets: NN, txBytes: NN, txPackets: NN }
    ],
    system: {
        rxBytes: NN, rxPackets: NN, txBytes: NN, txPackets: NN,
        ports: {
            online: NN,
            offline: NN,
        },
        vlans: {
            online: NN,
            offline: NN,
        }
        events: {
            total: NN,
        }
    }
}
#endif

#if DEMO || 1
    //  MOB - should not persist port stats?
    //  Separate table
static void demoData() {
    EdiGrid     *ports;
    EdiRec      *port;
    cchar       *value;
    int         r;

    //  MOB - should not persist port stats?
    //  Separate table
    ports = readTable("port");
    for (r = 0; r < ports->nrecords; r++) {
        r += (random() % (ports->nrecords / 3));
        if (r < ports->nrecords) {
            port = ports->records[r];
            //  MOB ediIncField, ediGetFieldAsInt
            value = ediGetFieldValue(port, "rxBytes");
            ediSetField(port, "rxBytes", itos(stoi(value) + (random() % 1000)));
            value = ediGetFieldValue(port, "rxPackets");
            ediSetField(port, "rxPackets", itos(stoi(value) + (random() % 1000)));
            updateRec(port);
        }
    }
}
#endif

static cchar *getDashData(HttpConn *conn) { 
    EdiGrid     *events, *ports, *vlans;
    // EdiRec      *system;
    MprBuf      *buf;
    int         nevents;

    espSetConn(conn);
    buf = mprCreateBuf(0, 0);
    mprPutToBuf(buf, "{");
    ports = ediFilterGridFields(readTable("port"), "rxBytes,rxPackets,txBytes,txPackets,mode", 1);
    mprPutToBuf(buf, "\"ports\": %s,", ediGridAsJson(ports, 0));
    vlans = ediFilterGridFields(readTable("vlan"), "rxBytes,rxPackets,txBytes,txPackets,mode", 1);
    mprPutToBuf(buf, "\"vlans\": %s,", ediGridAsJson(vlans, 0));
    // system = ediFilterRecFields(readRec("system", "1"), "rxBytes,rxPackets,txBytes,txPackets", 1);

    nevents = 0;
    if ((events = readTable("event")) != 0) {
        nevents = events->nrecords;
        events->nrecords = min(events->nrecords, 5);
    }
    //  MOB - should this be in data/schema format?
    mprPutToBuf(buf, "\"system\":{\"events\": %s, \"eventCount\": %d}", ediGridAsJson(events, 0), nevents);

    mprPutToBuf(buf, "}");
    // printf("%s\n", mprGetBufStart(buf));

#if DEMO || 1
    demoData();
#endif
    return mprGetBufStart(buf);
}

static void getDash() {
    render(getDashData(getConn()));
}

/*
    MOB - normally this would push data on-demand
 */
static void updateStream(HttpConn *conn) {
    Esp     *esp;
    ssize   count;

    esp = MPR->espService;
    if (HTTP_STATE_PARSED <= conn->state && conn->state <= HTTP_STATE_CONTENT) {
        if (esp->reloading) {
            httpSendClose(conn, WS_STATUS_OK, "OK");
            return;
        }
        if ((count = httpSendBlock(conn, WS_MSG_TEXT, getDashData(conn), -1, 0)) < 0) {
            mprLog(0, "Count %Ld", count);
            httpError(conn, HTTP_CODE_INTERNAL_SERVER_ERROR, "Cannot send big message");
        }
    }
}

static void getStream() {
    HttpConn    *conn;
    MprEvent    *timer;
    MprTicks    period;

    conn = getConn();
    dontAutoFinalize();
    updateStream(conn);
    period = stoi(espGetConfig(conn->rx->route, "settings.refresh", "1000"));
    timer = mprCreateTimerEvent(conn->dispatcher, "dashboard", period, updateStream, conn, 0);
    httpSetWebSocketData(conn, timer);
}

ESP_EXPORT int esp_controller_kickstart_dash(HttpRoute *route, MprModule *module) 
{
    espDefineAction(route, "dash-get", getDash);
    espDefineAction(route, "dash-cmd-stream", getStream);
    return 0;
}
