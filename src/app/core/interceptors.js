'use strict';

function interceptors($injector) {
    var logger = $injector.get('$log'),
        $q = $injector.get('$q'),
        sessionStorage = $injector.get('$window').sessionStorage;

    return {
        'request': function (config) {
            config.headers.Authorization = 'Bearer ' + sessionStorage.token;
            logger.debug(config);
            return config;
        },
        'response': function (response) {
            logger.debug(response);
            return response;
        },
        'responseError': function (response) {
            var deferred = $q.defer(),
                $state = $injector.get('$state');

            if (response.data && response.data.code) {
                deferred.reject(response.data.code);
            } else {
                deferred.reject(response.status);
            }
            if (response.status === 401) {
                delete sessionStorage.token;
                $state.go('login');
            }
            return $q.reject(response);
        }
    };
}
interceptors.$inject = ['$injector'];

export default interceptors;