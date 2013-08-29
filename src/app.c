/*
    app.c
 */
#include "esp.h"

static void base(HttpConn *conn) 
{
    cchar       *uri;

    if (!httpLoggedIn(conn)) {
        uri = getUri();
        if (sstarts(uri, "/service/")) {
            if (smatch(uri, "/service/user/login") || smatch(uri, "/service/user/logout")) {
                return;
            }
            httpError(conn, HTTP_CODE_UNAUTHORIZED, "Access Denied. Login required");
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
    /*
        Establish common base class routine for all services
     */
    espDefineBase(route, base);
    httpSetAuthStoreVerify("app", verifyUser);
    return 0;
}
