/*
   testDir.js
 */

'use strict';

/*
    esp-demo
 */
app.directive('espDemo', function ($parse) {
    return {
        restrict: 'EAC',
        templateUrl: '/path/x.html',
        link: function(scope, elt, att) {
            scope.$watch(att.field, function(value) {
                //  use attrs.elt
                elt.text(value)
            })
        }
    }
});


app.directive('espDemo', function ($parse) {
    return function linkFn(scope, elt, att) {
        elt.text('Hello World');
    };
});

app.directive('espDemo', function ($parse) {
    return {
        restrict: 'E,A',
        transclude: true,       // Include the text
        template: '<span ng-transclude></span>',
        templateUrl: '/path/to/template',
        scope: {
            name: '='            // Two way binding
            name: 'bind'         // Binds attribute 'name=someVar' into the scope
        },
    };
});

app.directive('espDemo', function ($parse) {
    return {
        link: function linkFn(scope, elt, att) {
            elt.text('Hello World');
        }
    };
});

app.directive('espDemo2', function ($parse) {
    return {
        /* 
            Compile function runs before scope available
            Compile function modifies template
         */
        compile: function compileFn(celt, att) {
            celt.addClass('compiling');

            /*
                Link funtion runs for each repeated element
             */
            return function linkfn(scope, elt, att) {
                elt.text('Hello World');
            }
        }
    }
});

/*
    <div esp-demo></div>
 */
