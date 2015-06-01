"use strict";

class NavMenuController {
    constructor($scope) {
        this.menuItems = $scope.menuItems = {};
    }

    addMenuItem(item) {
        this.menuItems[item.state] = item;
    }
}
NavMenuController.$inject = ['$scope'];

function navMenuDirective($injector) {

    return {
        restrict: 'E',
        controller: NavMenuController,
        link: function (scope, element, attrs) {
            function setActiveMenu() {
                angular.forEach(scope.menuItems, function (value, key) {
                    if (value.state === $injector.get('$state').current.name) {
                        value.className = 'active';
                    } else {
                        value.className = '';
                    }
                });
                scope.$broadcast('menuChanged', scope.menuItems);
                $injector.get('$log').debug(scope.menuItems);
            }

            $injector.get('$rootScope').$on("$stateChangeSuccess", () => {
                setActiveMenu();
            });

            setActiveMenu();

        }

    }
}
navMenuDirective.$inject = ['$injector'];

export default navMenuDirective;