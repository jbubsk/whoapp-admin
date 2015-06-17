'use strict';

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
        link: function (scope) {
            $injector.get('$log').debug('navMenu linked');
            function setActiveMenu() {
                angular.forEach(scope.menuItems, function (value) {
                    if (value.state === $injector.get('$state').current.name) {
                        value.className = 'active';
                    } else {
                        value.className = '';
                    }
                });
                $injector.get('$log').debug({'setting active menu': scope.menuItems});
                //scope.$broadcast('menuChanged', scope.menuItems);
            }

            $injector.get('$rootScope').$on('$stateChangeSuccess', () => {
                setActiveMenu();
            });

            setActiveMenu();
            $injector.get('$timeout')(function () {
                scope.$broadcast('menuChanged', scope.menuItems);
            }, 100);
        }
    };
}
navMenuDirective.$inject = ['$injector'];

export default navMenuDirective;