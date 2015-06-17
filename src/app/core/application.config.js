'use strict';

import interceptors from './interceptors';
//import homeTemplate from '../states/home/home.html!text';

function onApplicationConfig($injector) {
    var $httpProvider = $injector.get('$httpProvider'),
        $locationProvider = $injector.get('$locationProvider'),
        //$stateProvider = $injector.get('$stateProvider'),
        $urlRouterProvider = $injector.get('$urlRouterProvider');

    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });

    //$stateProvider
    //    .state('home', {
    //        url: '/home',
    //        template: homeTemplate,
    //        auth: true
    //    });

    $urlRouterProvider.otherwise('/home');

    //$urlRouterProvider.when('/', '/home');

    $httpProvider.interceptors.push(interceptors);
}
onApplicationConfig.$inject = ['$injector'];

export default onApplicationConfig;
