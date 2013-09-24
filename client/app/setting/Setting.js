/*
    Setting.js - Setting model
 */
'use strict';

app.factory('Setting', function ($resource) {
    return $resource('/service/setting', { 
    }, {
    });
});
