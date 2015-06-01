'use strict';

function Router($injector) {
    $injector.get('$locationProvider').html5Mode({
        enabled: false,
        requireBase: false
    });

    $injector.get('$stateProvider')
        .state('login', {
            url: '/login',
            templateUrl: 'app/components/login/login.html'
        })
        .state('auth', {
            abstract: true,
            templateUrl: 'app/layout/layout.html'
        })

        .state('auth.home', {
            url: '/home',
            templateUrl: 'app/components/home/home.html',
            auth: true
        })
        .state('auth.places', {
            url: '/places',
            templateUrl: 'app/components/places/places.html',
            auth: true
        })
        .state('auth.interests', {
            url: '/interests',
            templateUrl: 'app/components/interests/interests.html',
            auth: true
        });

    $injector.get('$urlRouterProvider').otherwise('/home');

}
Router.$inject = ['$injector'];

export default Router;























