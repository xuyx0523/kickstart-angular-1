/*
    app.c
 */
#include "esp.h"

/*
    Common base controller used for all requests
 */
static void commonController(HttpConn *conn) 
{
    HttpRoute   *route;
    cchar       *loginRequired, *uri, *stem;

    if (!httpLoggedIn(conn)) {
        uri = getUri();
        route = conn->rx->route;
        if (!route->serverPrefix || sstarts(uri, route->serverPrefix)) {
            stem = (route->serverPrefix) ?  &uri[slen(route->serverPrefix)] : uri;
            if (smatch(stem, "/user/login") || smatch(stem, "/user/logout") || smatch(stem, "/user/forgot")) {
                return;
            }
            loginRequired = espGetConfig(conn->rx->route, "app.http.auth.require.users", 0);
            if (loginRequired && *loginRequired) {
                httpError(conn, HTTP_CODE_UNAUTHORIZED, "Access Denied. Login required");
            }
        }
    }
}


//  MOB - move to controllers/user.c in controllers per esp-user (DONE)
/*
    Verify user credentials from database password.
    Callback from httpLogin to verify the username/password
 */
static bool verifyUser(HttpConn *conn, cchar *username, cchar *password)
{
    HttpAuth    *auth;
    HttpUser    *user;
    HttpRx      *rx;
    EdiRec      *urec;

    rx = conn->rx;
    auth = rx->route->auth;
    if ((urec = readRecWhere("user", "username", "==", username)) == 0) {
        httpTrace(conn, "error", "Cannot verify user", "username=%s", username);
        return 0;
    }
    if (!mprCheckPassword(password, getField(urec, "password"))) {
        httpTrace(conn, "error", "Password failed to authenticate", "username=%s", username);
        return 0;
    }
    /*
        Restrict to a single simultaneous login
     */
    if (espTestConfig(rx->route, "app.http.login.single", "true")) {
        if (!espIsCurrentSession(conn)) {
            feedback("error", "Another user still logged in");
            httpTrace(conn, "error", "Too many simultaneous users", 0, 0);
            return 0;
        }
        espSetCurrentSession(conn);
    }
    if ((user = httpLookupUser(auth, username)) == 0) {
        user = httpAddUser(auth, username, 0, ediGetFieldValue(urec, "roles"));
    }
    httpSetConnUser(conn, user);
    httpTrace(conn, "info", "User authenticated", "username=%s", username);
    return 1;
}


ESP_EXPORT int esp_app_kickstart(HttpRoute *route, MprModule *module)
{
    Edi     *edi;

    espDefineBase(route, commonController);
    httpSetAuthVerify(route->auth, verifyUser);

    /*
        Demo Mode.
        This code sets up a private, in-memory, readonly database for each user. 
     */
    if ((edi = espGetRouteDatabase(route)) == 0) {
        mprLog("kickstart", 0, "Cannot get route database in esp_app_kickstart");
    } else {
        ediSetPrivate(edi, 1);
        ediSetReadonly(edi, 1);
    }
    return 0;
}
