function Interceptors($httpProvider) {

    function interceptor($injector) {
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
                return $q.reject(response);
                //return response;
            }
        }
    }

    interceptor.$inject = ['$injector'];

    $httpProvider.interceptors.push(interceptor);

}
Interceptors.$inject = ['$httpProvider'];

export default Interceptors;