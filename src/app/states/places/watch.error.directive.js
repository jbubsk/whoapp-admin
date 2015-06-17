'use strict';

function watchErrorDirective() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {

            scope.$watch(
                function () {
                    return ngModel.$modelValue;
                }, function () {
                    scope.ctrl.error = '';
                });
        }
    };
}

export default watchErrorDirective;