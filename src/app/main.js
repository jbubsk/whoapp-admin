'use strict';

import 'angular';
import 'angular-ui-router';
import 'angular-cookies';
import 'angular-resource';
import 'angular-animate';
import 'angular-sanitize';
import 'jquery';

import appCore from './core/core';
import layoutModule from './core/layout/layout';

import loginModule from './states/login/login';
import homeModule from './states/home/home';
import placesModule from './states/places/places';
import interestsModule from './states/interests/interests';
import usersModule from './states/users/users';

import servicesModule from './core/services/services';
import directivesModule from './core/directives/directives';

var application = angular.module('whoappAdmin', [
    'ngCookies',
    'ngResource',
    'ngAnimate',
    'ui.router',

    appCore.name,
    layoutModule.name,
    loginModule.name,
    homeModule.name,
    placesModule.name,
    interestsModule.name,
    usersModule.name,

    servicesModule.name,
    directivesModule.name
]);

angular.element(document).ready(function () {
    angular.bootstrap(document, [application.name]);
});