/*
    UserControl.js - User Controller
 */
 
'use strict';

app.controller('UserControl', function ($rootScope, $scope, $location, $timeout, User, SessionStore, Esp) {

    $scope.login = function() {
        User.login($scope.user, function(response, fn) {
            if (response.error) {
                if (response.feedback) {
                    $scope.error = response.feedback.error;
                }
                SessionStore.remove('user');
                Esp.user = null;
            } else {
                Esp.user = response.user;
                if (Esp.user) {
                    Esp.user.lastAccess = Date.now();
                    SessionStore.put('user', Esp.user);
                }
                $location.path("/");
            }
            $rootScope.feedback = response.feedback;
        });
    };

    $scope.logout = function() {
        if (Esp.user) {
            Esp.user = null;
            SessionStore.remove('user');
            User.logout({}, function() {
                $location.path('/service/user/login');
            });
        } else {
            $location.path('/service/user/login');
        }
    };

    /*
        Session timeout watchdog
     */
    $timeout(function sessionTimeout() {
        var timeout = Esp.config.settings.timeouts.session * 1000;
        if (Esp.user && Esp.user.lastAccess) {
            if ((Date.now() - Esp.user.lastAccess) > timeout) {
                $rootScope.feedback = { error: "Login Session Expired"};
                $scope.logout();
            } else if ((Date.now() - Esp.user.lastAccess) > (timeout - (60 * 1000))) {
                $rootScope.feedback = { warning: "Session Will Soon Expire"};
            }
            // console.log("SESSION TIME REMAINING", (timeout - ((Date.now() - Esp.user.lastAccess))) / 1000, "secs");
            $timeout(sessionTimeout, 60 * 1000, true);
        }
    }, 60 * 1000, true);

});

/*
    User controller routes for login
 */
app.config(function($routeProvider) {
    $routeProvider.when('/service/user/login/', {
        templateUrl: '/app/user/user-login.html',
        controller: 'UserControl'
    });
});
