'use strict';

import config from '../config';

class PlacesService {

    constructor($resource) {
        this.resource = $resource;
    }

    getPlaces() {
        return this.resource(
            config.serviceHost + '/api/places', null,
            {
                'get': {
                    method: 'GET', withCredentials: true
                }
            }
        ).get().$promise;
    }

    getPlace(id) {
        return this.resource(
            config.serviceHost + '/api/places/' + id, null,
            {
                'get': {
                    method: 'GET', withCredentials: true
                }
            }
        ).get().$promise;
    }

    addPlace(model) {
        return this.resource(
            config.serviceHost + '/api/places', null,
            {
                'post': {
                    method: 'POST', withCredentials: true
                }
            }
        ).post(model).$promise;
    }

    deleteItem(id) {
        return this.resource(
            config.serviceHost + '/api/places/:id',
            {id: id},
            {
                'delete': {
                    method: 'DELETE', withCredentials: true
                }
            }
        ).delete().$promise;
    }

    updatePlace(model) {
        return this.resource(
            config.serviceHost + '/api/places',
            {
                'update': {
                    method: 'PUT', withCredentials: true
                }
            }
        ).update(model).$promise;
    }
}

PlacesService.$inject = ['$resource'];

export default PlacesService;