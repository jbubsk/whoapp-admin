'use strict';

import LoginController from '../login/login.controller';
import loginRoute from './login.route';

export default angular.module('login', [])
	.config(loginRoute)
	.controller('LoginController', LoginController);
