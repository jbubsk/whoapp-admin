'use strict';

import template from './login.html!text';

function loginRoute($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            template: template
        });
}
loginRoute.$inject = ['$stateProvider'];

export default loginRoute;