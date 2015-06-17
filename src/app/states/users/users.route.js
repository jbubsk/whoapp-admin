'use strict';

import template from './users.html!text';

function usersRoute($stateProvider) {
    $stateProvider
        .state('users', {
            url: '/users',
            template: template,
            auth: true
        });
}
usersRoute.$inject = ['$stateProvider'];

export default usersRoute;