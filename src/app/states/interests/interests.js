'use strict';

import InterestsController from './interests.controller';
import interestsRoute from './interests.route';

export default angular.module('interests', [])
    .config(interestsRoute)
    .controller('InterestsController', InterestsController);