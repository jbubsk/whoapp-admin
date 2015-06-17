'use strict';

import template from './menu.html!text';

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
        replace: true,
        template: template,
        controller: MenuImplController
    };
}

export default menuImpl;