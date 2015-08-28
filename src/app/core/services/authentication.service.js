import config from '../config';

class AuthService {

    constructor($injector) {
        this.resource = $injector.get('$resource');
        this.logger = $injector.get('$log');
        this.$q = $injector.get('$q');
        this.sessionStorage = $injector.get('$window').sessionStorage;
    }

    login(model) {
        var self = this;
        return self.resource(config.serviceHost + '/auth/login', null, {
            login: {method: 'POST'}
        }).login(model).$promise.then(
            (data) => {
                self.sessionStorage.token = data.token;
                return data;
            },
            (error) => {
                delete self.sessionStorage.token;
                return self.$q.reject({errorCode: error.status});
            });
    }

    logout() {

        return this.resource(config.serviceHost + '/auth/logout', null, {
            get: {method: 'GET'}
        }).get().$promise.then(
            (data) => {
                delete this.sessionStorage.token;
                this.logger.debug({
                    info: 'Session is destroyed.',
                    result: data.result
                });
            },
            () => {
                delete this.sessionStorage.token;
            }
        );
    }

    isAuthenticated() {
        return !!this.sessionStorage.token;
    }

    register() {

    }
}

AuthService.$inject = ['$injector'];

export default AuthService;
