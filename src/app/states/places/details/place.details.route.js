'use strict';

import template from './place.details.html!text';

function placeDetailsRoute($stateProvider) {
    $stateProvider
        .state('places.details', {
            url: '/:id',
            template: template,
            auth: true,
            resolve: {
                place: function (PlacesService, $stateParams) {
                    return PlacesService.getPlace($stateParams.id)
                        .then(function (result) {
                            return result.result[0];
                        });
                },
                interests: function (InterestsService) {
                    return InterestsService.getInterests().then(data => {
                        return data;
                    });
                }
            },
            controller: 'PlaceDetailsController',
            controllerAs: 'placeDetails'
        });
}
placeDetailsRoute.$inject = ['$stateProvider'];

export default placeDetailsRoute;