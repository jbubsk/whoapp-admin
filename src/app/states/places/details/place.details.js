'use strict';

import PlaceDetailsController from './place.details.controller';
import placeDetailsRoute from './place.details.route';

export default angular.module('place.details', [])
    .config(placeDetailsRoute)
    .controller('PlaceDetailsController', PlaceDetailsController);