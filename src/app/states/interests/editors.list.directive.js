'use strict';

function editorsListDirective() {
    return {
        restrict: 'A',
        controller: ['$scope',function ($scope) {
            this.broadcast = function () {
                $scope.$broadcast('clicked');
            };
        }]
    };
}

export default editorsListDirective;