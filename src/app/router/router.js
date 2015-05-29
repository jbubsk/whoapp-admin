'use strict';

function Router($stateProvider, $urlRouterProvider, $injector) {
	$stateProvider
		.state('main', {
			abstract: true,
			templateUrl: 'app/layout/layout.html'
		})
		.state('main.login', {
			url: '/login',
			templateUrl: 'app/components/login/login.html'
		})
		.state('main.home', {
			url: '/home',
			templateUrl: 'app/components/home/home.html'
		});

	$urlRouterProvider.otherwise('/login');
}
Router.$inject = ['$stateProvider', '$urlRouterProvider', '$injector'];

export default Router;
