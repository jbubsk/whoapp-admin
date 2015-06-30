'use strict';

import CoreService from './core.service';

class PlacesService extends CoreService {

    constructor($resource, $q) {
        super($q, $resource);
        this.setUp('/api/places');
    }

    getPlaces() {
        return this.getResource().get().$promise;
    }

    getPlace(id) {
        return this.getResource().get({id:id}).$promise.then(result => {
                return result.result[0];
            });
    }

    addPlace(model) {
        return this.getResource().post(model).$promise;
    }

    remove(id) {
        return this.getResource().delete({id:id}).$promise;
    }

    updatePlace(model) {
        return this.getResource().update(model).$promise;
    }
}

PlacesService.$inject = ['$resource', '$q'];

export default PlacesService;