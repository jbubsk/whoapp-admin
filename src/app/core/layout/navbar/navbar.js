'use strict';

import NavbarController from './navbar.controller';
import menuItemDirective from './menu_item.directive';
import navMenuDirective from './nav_menu.directive';
import menuImplDirective from './menu_impl.directive';

export default angular.module('navbar', [])
    .controller('NavbarController', NavbarController)
    .directive('menuItem', menuItemDirective)
    .directive('navMenu', navMenuDirective)
    .directive('menuImpl', menuImplDirective);
