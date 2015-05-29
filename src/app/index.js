'use strict';

import RouterModule from '../app/router/router.module';
import NavbarModule from '../app/components/navbar/navbar.module';
import HomeModule from '../app/components/home/home.module';
import LoginModule from '../app/components/login/login.module';

import ServicesModule from '../app/common/services/services.module';

angular.module('whoappAdmin', [
	'ngCookies',
	'ngResource',
	'mm.foundation',

	RouterModule,
	NavbarModule,
	HomeModule,
	LoginModule,

	ServicesModule
]);
