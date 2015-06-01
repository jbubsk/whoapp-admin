"use strict";

import InterestsController from './interests.controller';

var ModuleName = 'interests';

angular.module(ModuleName, [])
    .controller('InterestsController', InterestsController);

export default ModuleName;