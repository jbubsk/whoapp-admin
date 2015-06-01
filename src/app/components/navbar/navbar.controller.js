'use strict';

class NavbarController {
    constructor($injector) {
        this.authService = $injector.get('AuthService');
        this.logger = $injector.get('$log');
        this.state = $injector.get('$state');
    }

    logout() {
        this.authService.logout().then(function () {
            this.state.go('login');
        }.bind(this));
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
    }
}

NavbarController.$inject = ['$injector'];

export default NavbarController;
