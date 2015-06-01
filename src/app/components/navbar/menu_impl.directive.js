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
                console.debug({msg:'menu-changed', data: menuItems});
                $scope.menus = menuItems;
            });
        }

    }
}

export default menuImpl;