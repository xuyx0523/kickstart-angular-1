/*
    user.c - User authentication and management
 */
#include "esp.h"

static void createUser() { 
    if (canUser("edit", 1)) {
        setParam("password", mprMakePassword(param("password"), 0, 0));
        renderResult(createRecFromParams("user"));
    }
}

static void getUser() { 
    renderRec(readRec("user", param("id")));
}

static void indexUser() {
    renderGrid(readTable("user"));
}

static void removeUser() { 
    if (canUser("edit", 1)) {
        renderResult(removeRec("user", param("id")));
    }
}

static void updateUser() { 
    if (canUser("edit", 1)) {
        setParam("password", mprMakePassword(param("password"), 0, 0));
        renderResult(updateRecFromParams("user"));
    }
}

static void login() {
    HttpConn    *conn = getConn();
    if (httpLogin(conn, param("username"), param("password"))) {
        render("{\"success\": 1, \"user\": {\"name\": \"%s\", \"abilities\": %s}}", conn->username, 
            mprSerialize(conn->user->abilities, MPR_JSON_QUOTES));
    } else {
        feedback("error", "Invalid Login");
        renderResult(0);
    }       
}

static void logout() {                                                                             
    httpLogout(getConn());
    renderResult(1);
}

ESP_EXPORT int esp_controller_layer2_user(HttpRoute *route, MprModule *module) 
{
    Edi     *edi;

    edi = getDatabase();
    //  MOB - should ability string be included with the action?
    espDefineAction(route, "user-create", createUser);
    espDefineAction(route, "user-get", getUser);
    espDefineAction(route, "user-index", indexUser);
    espDefineAction(route, "user-remove", removeUser);
    espDefineAction(route, "user-update", updateUser);

    espDefineAction(route, "user-cmd-login", login);
    espDefineAction(route, "user-cmd-logout", logout);

    ediAddValidation(edi, "present", "login", "username", 0);
    ediAddValidation(edi, "unique", "login", "username", 0);
    ediAddValidation(edi, "present", "login", "password", 0);
    return 0;
}
