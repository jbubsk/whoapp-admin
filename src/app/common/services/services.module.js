'use strict';

import Session from './session.service';
import AuthService from './authentication.service';

var ServicesModule = 'services';

angular.module(ServicesModule, [])
	.service('Session', Session)
	.service('AuthService', AuthService);

export default ServicesModule;
