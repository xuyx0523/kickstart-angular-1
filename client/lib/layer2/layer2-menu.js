/*
    layer2-menu.js - Layer2 sidebar menus

    <layer2-menu text="Text" />
 */
angular.module('layer2', [])
.directive('layer2Menu', function($compile) {
    return {
        restrict: 'E',
        transclude: 'element',
        compile: function(element, attrs, trans) {
            return function(scope, element, attrs) {
                trans(scope, function(child) {
                    var h = element[0].innerHTML;
                    scope.uri = attrs.href;
                    scope.klass = attrs.class;
                    var active = ' ng-class="{selected: path() == \'' + attrs.href + '\'}"';
                    var html = '<li' + active + '><a href="#' + attrs.href + '"><i class="' + attrs.class + 
                        '"></i><span class="menu-item">' + child[0].innerHTML + '</span></a></li>';
                    var newelt = angular.element(html);
                    $compile(newelt)(scope);
                    element.replaceWith(newelt);
                });
            };
        },
    };
});
