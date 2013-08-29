/*
    NavControl.js - Home page side navigation Controller
 */
'use strict';

app.controller('NavControl', function($scope) {
    $scope.sidenav = [
        { name: 'Ports', uri: '#/service/port/list', icon: '' },
        { name: 'VLANs', uri: '#/service/vlan/list', icon: '' },
    ];
});
