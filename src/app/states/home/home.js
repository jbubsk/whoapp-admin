'use strict';

import HomeController from './home.controller';
import homeRoute from './home.route';

export default angular.module('home', [])
    .config(homeRoute)
    .controller('HomeController', HomeController);
