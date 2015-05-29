'use strict';

import LoginController from '../login/login.controller';

var LoginModule = 'login';

angular.module(LoginModule, [])
	.controller('LoginController', LoginController);

export default LoginModule;
