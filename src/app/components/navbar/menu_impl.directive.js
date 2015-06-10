"use strict";

class MenuImplController {
    constructor($scope) {
        $scope.$on('menuChanged', function (e, menuItems) {
            $scope.menus = menuItems;
        });
    }
}
MenuImplController.$inject = ['$scope'];

function menuImpl() {

    return {
        restrict: 'E',
        scope: {
            logout: '&'
        },
        templateUrl: 'app/components/navbar/menu.html',
        controller: MenuImplController

    }
}

export default menuImpl;