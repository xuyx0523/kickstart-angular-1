/*
    User
 */

#include "esp-app.h"

static void create() { 
    if (updateRec(createRec("user", params()))) {
        inform("New user created");
        renderView("user-list");
    } else {
        renderView("user-edit");
    }
}

static void destroy() { 
    if (removeRec("user", param("id"))) {
        inform("User removed");
    }
    renderView("user-list");
}

static void edit() { 
    readRec("user");
}

static void init() { 
    createRec("user", 0);
    renderView("user-edit");
}

static void show() { 
    readRec("user");
    renderView("user-edit");
}

static void update() { 
    if (updateFields("user", params())) {
        inform("User updated successfully.");
        renderView("user-list");
    } else {
        renderView("user-edit");
    }
}

static void login() {
    cchar   *name, *password, *referrer;

    name = param("name");
    password = param("password");
    referrer = param("referrer");
    if (!name) {
        setSessionVar("referrer", referrer);
        return;
    }
    if (!getRec()) {
        //  MOB -- error does not exist.
        setFlash("error", "Username is not registered as an administrator");
        return;
    }
    //  MOB - should encode passwords with salt
    if (smatch(name, getField("name")) && smatch(password, getField("password"))) {
        inform("Welcome back");
        if ((referrer = getSessionVar("referrer")) != 0) {
            redirect(referrer);
            setSessionVar("referrer", 0);
        } else {
            redirect("/");
        }
        setSessionVar("id", name);

    } else if (!smatch(getMethod(), "POST")) {
        setFlash("error", "Invalid login");
    }
}

static void logout() {
    inform("Logged Out");
    setSessionVar("id", "");
    redirect("/");
}

ESP_EXPORT int esp_controller_user(HttpRoute *route, MprModule *module) 
{
    espDefineAction(route, "mapping-create", create);
    espDefineAction(route, "mapping-destroy", destroy);
    espDefineAction(route, "mapping-edit", edit);
    espDefineAction(route, "mapping-init", init);
    espDefineAction(route, "mapping-show", show);
    espDefineAction(route, "mapping-update", update);
    espDefineAction(route, "mapping-login", login);
    espDefineAction(route, "mapping-logout", logout);
    return 0;
}
