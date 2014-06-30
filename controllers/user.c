/*
    user.c - User authentication and management
 */
#include "esp.h"

static void checkAuthenticated() {
    sendResult(httpIsAuthenticated(getConn()));
}

static void createUser() { 
    if (canUser("edit", 1)) {
        setParam("password", mprMakePassword(param("password"), 0, 0));
        sendResult(createRecFromParams("user"));
    }
}

static void getUser() { 
    EdiRec      *rec;
    if ((rec = readRec("user", param("id"))) != 0) {
        /* Don't send the real password back to the user */
        setField(rec, "password", "        ");
        sendRec(rec);
    } else {
        sendResult(0);
    }
}

static void indexUser() {
    sendGrid(readTable("user"));
}

static void initUser() {
    sendRec(createRec("user", 0));
}

static void listUsers() {
    EdiGrid     *users;
    int         r;

    users = readTable("user");
    for (r = 0; r < users->nrecords; r++) {
        setField(users->records[r], "password", 0);
    }
    sendGrid(users);
}

static void removeUser() { 
    if (canUser("edit", 1)) {
        sendResult(removeRec("user", param("id")));
    }
}

static void updateUser() { 
    EdiRec  *rec;
    cchar   *password;
    if (canUser("edit", 1)) {
        password = strim(param("password"), " ", 0);
        if (smatch(password, "") && (rec = readRec("user", param("id"))) != 0) {
            password = getField(rec, "password");
            setParam("password", password);
        } else {
            setParam("password", mprMakePassword(password, 0, 0));
        }
        if (!updateRecFromParams("user") || ediSave(getDatabase()) < 0) {
            sendResult(0);
        } else {
            sendResult(1);
        }
    }
}

static void forgotPassword() {
    EdiRec  *user;
    cchar   *msg, *name, *to;

    name = param("recover");
    if ((user = readRecWhere("user", "username", "==", name)) == 0) {
        if ((user = readRecWhere("user", "email", "==", name)) == 0) {
            /* Security delay */
            mprSleep(2500);
            sendResult(feedback("error", "Unknown user."));
            return;
        }
    }
    to = getField(user, "email");
    msg = sfmt("Password Reset\nPlease use this new temporary password %s\nLogin at %s\n",
        "temp", sjoin(httpLink(getConn(), "~"), "/user/login", NULL));
    if (espEmail(getConn(), to, "mob@emobrien.com", "Reset Password", 0, 0, msg, 0) < 0) {
        sendResult(feedback("error", "Cannot send password reset email."));
    } else {
        sendResult(feedback("inform", "Password reset details sent."));
    }
}

static void loginUser() {
    HttpConn    *conn = getConn();
    bool        remember = smatch(param("remember"), "true");

    if (httpLogin(conn, param("username"), param("password"))) {
        render("{\"error\": 0, \"user\": {\"name\": \"%s\", \"abilities\": %s, \"remember\": %s}}", conn->username,
            mprSerialize(conn->user->abilities, MPR_JSON_QUOTES), remember ? "true" : "false");
    } else {
        sendResult(feedback("error", "Invalid Login"));
    }       
}

static void logoutUser() {                                                                             
    httpLogout(getConn());
    espClearCurrentSession(getConn());
    sendResult(1);
}

ESP_EXPORT int esp_controller_kickstart_user(HttpRoute *route, MprModule *module) 
{
    Edi     *edi;

    espDefineAction(route, "user-create", createUser);
    espDefineAction(route, "user-get", getUser);
    espDefineAction(route, "user-list", listUsers);
    espDefineAction(route, "user-index", indexUser);
    espDefineAction(route, "user-init", initUser);

    espDefineAction(route, "user-remove", removeUser);
    espDefineAction(route, "user-update", updateUser);

    espDefineAction(route, "user-cmd-check", checkAuthenticated);
    espDefineAction(route, "user-cmd-forgot", forgotPassword);
    espDefineAction(route, "user-cmd-login", loginUser);
    espDefineAction(route, "user-cmd-logout", logoutUser);

    edi = espGetRouteDatabase(route);
    ediAddValidation(edi, "present", "user", "username", 0);
    ediAddValidation(edi, "unique", "user", "username", 0);
    ediAddValidation(edi, "present", "user", "email", 0);
    ediAddValidation(edi, "format", "user", "email", ".*@.*");
    ediAddValidation(edi, "unique", "user", "email", 0);
    ediAddValidation(edi, "present", "user", "roles", 0);
    return 0;
}
