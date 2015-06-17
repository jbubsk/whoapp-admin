import config from '../config';

class AuthService {

    constructor($injector) {
        this.resource = $injector.get('$resource');
        this.session = $injector.get('Session');
        this.logger = $injector.get('$log');
        this.$q = $injector.get('$q');
    }

    login(model) {
        var deferred = this.$q.defer();

        this.resource(config.serviceHost + '/auth/login', null, {
            login: {method: 'POST', withCredentials: true}
        }).login(model).$promise.then(
            function (data) {
                this.session.create(data.username);
                this.logger.debug({
                    info: 'New session is created.',
                    result: data.result
                });
                deferred.resolve(data);
            }.bind(this),
            function (error) {
                this.logger.debug({
                    info: 'Authentication is failed.',
                    result: error.data
                });
                deferred.reject(error);
            }.bind(this));

        return deferred.promise;
    }

    logout() {

        return this.resource(config.serviceHost + '/auth/logout', null, {
            get: {method: 'GET', withCredentials: true}
        }).get().$promise.then(
            function (data) {
                this.session.destroy();
                this.logger.debug({
                    info: 'Session is destroyed.',
                    result: data.result
                });
            }.bind(this)
        );
    }

    isAuthenticated() {
        return this.session.isAuthenticated();
    }

    register() {

    }
}

AuthService.$inject = ['$injector'];

export default AuthService;
