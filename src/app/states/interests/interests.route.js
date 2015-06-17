'use strict';

import template from './interests.html!text';

function interestsRoute($stateProvider) {
    $stateProvider
        .state('interests', {
            url: '/interests',
            template: template,
            auth: true
        });
}
interestsRoute.$inject = ['$stateProvider'];

export default interestsRoute;