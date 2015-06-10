"use strict";

import UsersController from './users.controller';

var ModuleName = 'users';

angular.module(ModuleName, [])
    .controller('UsersController', UsersController);

export default ModuleName;