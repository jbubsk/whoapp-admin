'use strict';

import UsersController from './users.controller';
import usersRoute from './users.route';

export default angular.module('users', [])
    .config(usersRoute)
    .controller('UsersController', UsersController);