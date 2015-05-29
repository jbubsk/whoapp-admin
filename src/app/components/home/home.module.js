'use strict';

import HomeController from './home.controller';

var HomeModule = 'home';

angular.module(HomeModule, [])
	.controller('HomeController', HomeController);

export default HomeModule;
