'use strict';

import PlacesController from './places.controller';
import cityLoadDirective from './city.load.directive';
import watchErrorDirective from './watch.error.directive';
import placesRoute from './places.route';

export default angular.module('places', [])
    .config(placesRoute)
    .controller('PlacesController', PlacesController)
    .directive('cityLoad', cityLoadDirective)
    .directive('watchError', watchErrorDirective);