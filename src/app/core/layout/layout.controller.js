'use strict';

class LayoutController {
	constructor(authenticated, $state, Session) {
		if (!authenticated) {
			Session.destroy();
			$state.go('login');
		}
	}
}

LayoutController.$inject = ['authenticated', '$state', 'Session'];
export default LayoutController;
