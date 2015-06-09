'use strict';

class LoginController {
    constructor($injector) {
        this.model = {
            username: '',
            password: ''
        };
        this.errorMsg = '';
        this.authService = $injector.get('AuthService');
        this.logger = $injector.get('$log');
        this.state = $injector.get('$state');

        this.errors = {
            400: "Неверные логин/пароль",
            401: "Неверные логин/пароль",
            100: "Извините, временые проблемы на сервере"
        };
    }

    login() {
        this.errorMsg = '';
        this.authService.login(this.model).then(
            function (data) {
                if (data.result && data.result.username) {
                    this.state.go('auth.home');
                } else {

                }
            }.bind(this),

            function (err) {
                if (err.status === 500) {
                    if (typeof err.data === 'string') {
                        this.errorMsg = this.errors[parseInt(err.data, 10)];
                    } else {
                        this.errorMsg = this.errors[err.data];
                    }
                } else {
                    this.logger.debug(err);
                    this.errorMsg = this.errors[err.status];
                }
            }.bind(this));
    }
}

LoginController.$inject = ['$injector'];

export default LoginController;
