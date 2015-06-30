'use strict';

import config from '../config';

class PlacesService {

    constructor($resource, $q) {
        this.resource = $resource;
        this.$q = $q;
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
        ).get().$promise.then(result => {
                return result.result[0];
            });
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
            config.serviceHost + '/api/places', null,
            {
                'update': {
                    method: 'PUT', withCredentials: true
                }
            }
        ).update(model).$promise;
    }
}

PlacesService.$inject = ['$resource', '$q'];

export default PlacesService;