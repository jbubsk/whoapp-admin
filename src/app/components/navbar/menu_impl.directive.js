"use strict";

function menuImpl() {
    return {
        restrict: 'E',
        scope: {
            logout: '&'
        },
        templateUrl: 'app/components/navbar/menu.html',
        controller: function($scope){
            $scope.$on('menuChanged', function (e, menuItems) {
                $scope.menus = menuItems;
            });
        }

    }
}

export default menuImpl;