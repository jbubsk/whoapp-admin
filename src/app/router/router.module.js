'use strict';

import Router from './router';

var RouterModule = 'router';

angular.module(RouterModule, ['ui.router'])
	.config(Router);

export default RouterModule;
