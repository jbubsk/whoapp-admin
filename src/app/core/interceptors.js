'use strict';

function interceptors($injector) {
    var logger = $injector.get('$log');

    return {
        'request': function (config) {
            logger.debug(config);
            return config;
        },
        'response': function (response) {
            logger.debug(response);
            return response;
        },
        'responseError': function (response) {
            var $state = $injector.get('$state');
            var Session = $injector.get('Session');
            var $q = $injector.get('$q');

            if (response.status === 401) {
                Session.destroy();
                $state.go('login');
            }
            if (response.data === null) {
                response.status = 503;
            }
            return $q.reject(response);
        }
    };
}
interceptors.$inject = ['$injector'];

export default interceptors;