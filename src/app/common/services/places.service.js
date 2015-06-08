"use strict";

import config from '../config';

class PlacesService {

    constructor($resource) {
        this.resource = $resource;
    }

    getPlaces() {
        return this.resource(config.apiUrl + '/api/places', null, {
            'get': {method: 'GET', withCredentials: true}
        }).get().$promise;
    }

    addPlace(model) {
        return this.resource(config.apiUrl + '/api/places', null, {
            'post': {method: 'POST', withCredentials: true}
        }).post(model).$promise;
    }

    deletePlace(placeId) {
        return this.resource(config.apiUrl + '/api/places/:id', {id: placeId}, {
            'delete': {method: 'DELETE', withCredentials: true}
        }).delete().$promise;
    }
}

PlacesService.$inject = ['$resource'];

export default PlacesService;