function Interceptors($httpProvider) {

    function interceptor($injector) {
        var logger = $injector.get('$log');

        return {
            'request': function (config) {
                //$log.debug(config);
                return config;
            },
            'response': function (response) {
                //$log.debug(response);
                return response;
            },
            'responseError': function (response) {
                var $state = $injector.get('$state');
                var Session = $injector.get('Session');

                if (response.status === 401) {
                    Session.destroy();
                    $state.go('login');
                }
                return response;
            }
        }
    }

    interceptor.$inject = ['$injector'];

    $httpProvider.interceptors.push(interceptor);

}
Interceptors.$inject = ['$httpProvider'];

export default Interceptors;