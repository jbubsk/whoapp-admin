'use strict';

import Router from './router';
import RouterRun from './router.run';

var RouterModule = 'router';

angular.module(RouterModule, ['ui.router'])
	.config(Router)
	.run(RouterRun);

export default RouterModule;
