'use strict';

function stateChangeHandler(event, toState) {
	var injector = this.$injector;

	function inject(name) {
		return injector.get(name);
	}

	if (
		toState.auth &&
		!inject('AuthService').isAuthenticated()
	) {
		event.preventDefault();
		inject('$state').go('login');
	} else if (!toState.auth &&
		inject('AuthService').isAuthenticated()
	) {
		event.preventDefault();
		inject('$state').go('auth.home');
	}
}

function RouterRun($injector) {

	$injector.get('$rootScope')
		.$on('$stateChangeStart', stateChangeHandler.bind({
			$injector: $injector
		}));
}
RouterRun.$inject = ['$injector'];

export default RouterRun;
