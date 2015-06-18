'use strict';

import interceptors from './interceptors';

function onApplicationConfig($injector) {
    var $httpProvider = $injector.get('$httpProvider'),
        $locationProvider = $injector.get('$locationProvider'),
        $urlRouterProvider = $injector.get('$urlRouterProvider');

    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });

    $urlRouterProvider.otherwise('/home');

    $urlRouterProvider.when('/', '/home');

    $httpProvider.interceptors.push(interceptors);
}
onApplicationConfig.$inject = ['$injector'];

export default onApplicationConfig;
