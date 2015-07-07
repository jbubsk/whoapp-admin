'use strict';

import interceptors from './interceptors';
import config from './config';

function onApplicationConfig($injector) {
    var $httpProvider = $injector.get('$httpProvider'),
        $locationProvider = $injector.get('$locationProvider'),
        $urlRouterProvider = $injector.get('$urlRouterProvider');

    console.log(config);
    $locationProvider.html5Mode({
        enabled: config.env !== 'development',
        requireBase: false
    });

    $urlRouterProvider.otherwise('/home');

    $urlRouterProvider.when('/', '/home');

    $httpProvider.interceptors.push(interceptors);
}
onApplicationConfig.$inject = ['$injector'];

export default onApplicationConfig;
