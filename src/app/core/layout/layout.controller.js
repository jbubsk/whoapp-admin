'use strict';

class LayoutController {
	constructor(authenticated, $state) {
		if (!authenticated) {
			$state.go('login');
		}
	}
}

LayoutController.$inject = ['authenticated', '$state'];
export default LayoutController;
