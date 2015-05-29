'use strict';

class LoginController {
	constructor(AuthService, $log) {
		this.model = {
			username: '',
			password: ''
		};
		this.authService = AuthService;
		this.logger = $log;
	}

	login(){
		this.authService.login(this.model).then(function(data){
			this.logger.debug(data);
		});
	}
}

LoginController.$inject = ['AuthService', '$log'];

export default LoginController;
