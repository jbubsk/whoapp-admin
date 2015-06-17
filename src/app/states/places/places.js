'use strict';

import PlacesController from './places.controller';
import cityLoadDirective from './city.load.directive';
import watchErrorDirective from './watch.error.directive';

export default angular.module('places', [])
    .controller('PlacesController', PlacesController)
    .directive('cityLoad', cityLoadDirective)
    .directive('watchError', watchErrorDirective);