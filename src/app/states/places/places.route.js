'use strict';

import template from './places.html!text';

function placesRoute($stateProvider) {
    $stateProvider
        .state('places', {
            url: '/places',
            template: template,
            auth: true
        });
}
placesRoute.$inject = ['$stateProvider'];

export default placesRoute;