'use strict';

class LoginController {
    constructor($injector) {
        this.model = {
            username: '',
            password: ''
        };
        this.authService = $injector.get('AuthService');
        this.logger = $injector.get('$log');
        this.state = $injector.get('$state');
    }

    login() {
        this.authService
            .login(this.model)
            .then(function (data) {
                if (data.username) {
                    this.state.go('auth.home');
                }
            }.bind(this));
    }
}

LoginController.$inject = ['$injector'];

export default LoginController;
