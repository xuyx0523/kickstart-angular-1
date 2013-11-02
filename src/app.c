/*
    app.c
 */
#include "esp.h"

static void base(HttpConn *conn) 
{
    cchar       *loginRequired, *uri, *next, *prefix;

    if (!httpLoggedIn(conn)) {
        uri = getUri();
        prefix = espGetConfig(conn->rx->route, "settings.prefix", 0);
        if (sstarts(uri, prefix)) {
            next = &uri[slen(prefix)];
            if (smatch(next, "/user/login") || smatch(next, "/user/logout") || smatch(next, "/user/forgot")) {
                #if MOB
                sstarts(next, "/dash") || sstarts(next, "/status"))
                #endif
                return;
            }
            loginRequired = espGetConfig(conn->rx->route, "settings.loginRequired", 0);
            if (loginRequired && *loginRequired) {
                httpError(conn, HTTP_CODE_UNAUTHORIZED, "Access Denied. Login required");
            }
        }
    }
}

/*
    Verify user credentials from database password.
    Callback from httpLogin to verify the username/password
 */
static bool verifyUser(HttpConn *conn, cchar *username, cchar *password)
{
    HttpAuth    *auth;
    HttpUser    *user;
    EdiRec      *urec;

    auth = conn->rx->route->auth;
    if ((urec = readRecWhere("user", "username", "==", username)) == 0) {
        mprLog(5, "verifyUser: Unknown user \"%s\"", username);
        return 0;
    }
    if (password && !mprCheckPassword(password, getField(urec, "password"))) {
        mprLog(5, "Password for user \"%s\" failed to authenticate", username);
        return 0;
    }
    if ((user = httpLookupUser(auth, username)) == 0) {
        user = httpAddUser(auth, username, 0, ediGetFieldValue(urec, "roles"));
    }
    httpSetConnUser(conn, user);
    mprLog(5, "User \"%s\" authenticated", username);
    return 1;
}

ESP_EXPORT int esp_app_layer2(HttpRoute *route, MprModule *module)
{
    Edi     *edi;

    /*
        Establish common base class routine for all services
     */
    espDefineBase(route, base);
    httpSetAuthStoreVerify("app", verifyUser);
    
    /*
        Demo Mode.
        This code sets up a private, in-memory, readonly database for each user. 
     */
    if ((edi = espGetRouteDatabase(route)) == 0) {
        mprError("Cannot get route database in esp_app_layer2");
    } else {
        ediSetPrivate(edi, 1);
        ediSetReadonly(edi, 1);
    }
    return 0;
}
