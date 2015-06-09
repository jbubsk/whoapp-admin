"use strict";

import PlacesController from './places.controller';
import cityLoadDirective from './city.load.directive';
import watchErrorDirective from './watch.error.directive';

var ModuleName = 'places';

angular.module(ModuleName, [])
    .controller('PlacesController', PlacesController)
    .directive('cityLoad', cityLoadDirective)
    .directive('watchError', watchErrorDirective);

export default ModuleName;