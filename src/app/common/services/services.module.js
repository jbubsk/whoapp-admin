'use strict';

import Session from './session';
import AuthService from './authentication';

var ServicesModule = 'services';

angular.module(ServicesModule, [])
	.service('Session', Session)
	.service('AuthService', AuthService);

export default ServicesModule;
