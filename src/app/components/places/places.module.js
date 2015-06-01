"use strict";

import PlacesController from './places.controller';

var ModuleName = 'places';

angular.module(ModuleName, [])
    .controller('PlacesController', PlacesController);

export default ModuleName;