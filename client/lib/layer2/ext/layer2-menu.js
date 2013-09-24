/*
    layer2-menu.js - Layer2 sidebar menus

    <layer2-menu text="Text" />
 */
app.directive('layer2Menu', function($filter, $rootScope, $compile) {
    return {
        restrict: 'E',
        transclude: true,
        compile: function(element, attrs) {
            element.removeAttr('class');
            element.replaceWith('<li><a href="' + attrs.href + '#"><i class="' + attrs.class + 
                '"></i><span class="menu-item" ng-transclude></span></a></li>');
        }
    };
});
