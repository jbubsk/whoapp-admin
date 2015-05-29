'use strict';

import NavbarController from './navbar.controller';

var NavbarModule = 'navbar';

angular.module(NavbarModule, [])
	.controller('NavbarController', NavbarController);

export default NavbarModule;
