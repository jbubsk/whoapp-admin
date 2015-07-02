import config from '../config';

class AuthService {

    constructor($injector) {
        this.resource = $injector.get('$resource');
        this.logger = $injector.get('$log');
        this.$q = $injector.get('$q');
        this.sessionStorage = $injector.get('$window').sessionStorage;
    }

    login(model) {
        var deferred = this.$q.defer();

        this.resource(config.serviceHost + '/auth/login', null, {
            login: {method: 'POST'}
        }).login(model).$promise.then(
            (data) => {
                this.sessionStorage.token = data.token;
                deferred.resolve(data);
            },
            (error) => {
                delete this.sessionStorage.token;
                deferred.reject({errorCode: error.status});
            });

        return deferred.promise;
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
