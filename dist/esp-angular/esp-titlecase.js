/*
    esp-titlecase.js - Titlecase Filter

    This filter caps the first letter of each word

    string | titlecase
 */

angular.module('esp.titlecase', [])
.filter('titlecase', ["Esp", function(Esp) {
    return function(str) {
        return str ? Esp.titlecase(str) : '';
    };
}]);
