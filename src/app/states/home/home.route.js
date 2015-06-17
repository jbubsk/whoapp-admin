'use strict';

import template from './home.html!text';

function homeRoute($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            template: template,
            auth: true
        });
}
homeRoute.$inject = ['$stateProvider'];

export default homeRoute;