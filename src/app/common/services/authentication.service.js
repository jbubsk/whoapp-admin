import config from '../config';
import Session from './session.service';

class AuthService {

    constructor($injector) {
        this.resource = $injector.get('$resource');
        this.session = $injector.get('Session');
        this.logger = $injector.get('$log');
    }

    login(model, successCallback, errorCallback) {

        return this.resource(config.apiUrl + '/auth/login', null, {
            login: {method: 'POST', withCredentials: true}
        }).login(model, function (data) {
            this.session.create(data.username);
            this.logger.debug({
                info: 'New session is created.',
                result: data.result
            });
        }.bind(this)).$promise;
    }

    logout(successCallback, errorCallback) {

        return this.resource(config.apiUrl + '/auth/logout', null, {
            get: {method: 'GET', withCredentials: true}
        }).get(function (data) {
            this.session.destroy();
            this.logger.debug({
                info: 'Session is destroyed.',
                result: data.result
            });
        }.bind(this)).$promise;
    }

    register(model, successCallback, errorCallback) {

    }

    isAuthenticated() {
        return this.session.isAuthenticated();
    }
}

AuthService.$inject = ['$injector'];

export default AuthService;
