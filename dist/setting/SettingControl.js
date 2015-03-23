/*
    SettingControl.js - Setting Controller
 */

angular.module('app').controller('SettingControl', ["$scope", "$location", "Setting", function ($scope, $location, Setting) {
    Setting.get({id: 1}, $scope);

    $scope.save = function() {
        Setting.update($scope.setting, $scope, function(response) {
            if (!response.error) {
                $location.path('/');
            }
        });
    };
}]);

/*
    Setup the Setting routes
 */
angular.module('app').config(["$routeProvider", function($routeProvider) {
    var esp = angular.module('esp');
    var Default = {
        controller: 'SettingControl',
        abilities: { 'edit': true, 'view': true },
        resolve: { action: esp.checkAuth },
    };
    $routeProvider.when('/setting', angular.extend({}, Default, {templateUrl: esp.url('/setting/edit.html')}));
}]);
