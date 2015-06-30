'use strict';

import ErrorHandler from '../../core/error.handler';

class LoginController extends ErrorHandler {
    constructor($injector) {
        super();
        this.model = {
            username: '',
            password: ''
        };
        this.authService = $injector.get('AuthService');
        this.logger = $injector.get('$log');
        this.state = $injector.get('$state');
    }

    login() {
        this.hideError();
        this.authService.login(this.model).then(
            () => {
                this.state.go('home');
            },
            (err) => {
                this.handleError(err.errorCode);
            });
    }
}

LoginController.$inject = ['$injector'];

export default LoginController;
