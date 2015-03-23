/*
    Status.js - Status model
 */

angular.module('app').factory('Status', ["EspResource", function (EspResource) {
    /* 
        Use group() just to minimize server-side routes. Really a singleton 
     */
    return EspResource.group("status");
}]);
