/*
    layer2-menu.js - Layer2 sidebar menus

    <layer2-menu text="Text" class="" href="" value="" > ... sub menus </layer2-menu>
 */
angular.module('layer2', [])
.directive('layer2Menu', function($compile) {
    var nextId = 0;
    return {
        restrict: 'E',
        transclude: true,
        compile: function(element, attrs, transclude) {
            return function(scope, element, attrs) {
                transclude(scope, function(child, innerScope) {
                    /* Child is a clone of the trancluded content */
                    var arrow = sub = show = href = '';
                    if (child.length) {
                        var id = '$layer2_' + nextId++;
                        show = ' ng-click="' + id + '=!' + id + '"';
                        sub = '<ul class="sub" ng-show="' + id + '"></ul>';
                        arrow = '<i class="arrow fa" ng-class="{\'fa-caret-down\':' + id + 
                                ', \'fa-caret-left\': !' + id + '}""></i>';
                        href = '';
                    } else {
                        href = '#' + attrs.href;
                    }
                    var active = ' ng-class="{selected: path() == \'' + attrs.href + '\'}"';
                    var html = '<li' + active + '>' + 
                                '   <a href="' + href + '"' + show + '>' + 
                                '       <i class="' + attrs.class + '"></i>' + 
                                '       <span>' + attrs.value + '</span>' + arrow + 
                                '   </a>';
                                '</li>';
                    var subelt = angular.element(sub);
                    subelt.append(child);
                    var newelt = angular.element(html);
                    newelt.append(subelt);
                    $compile(newelt)(scope);
                    element.replaceWith(newelt);
                });
            };
        },
    };
});
