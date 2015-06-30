'use strict';

import CoreService from './core.service';

class InterestsService extends CoreService {
    constructor($resource, $q) {
        super($q, $resource);
        this.setUp('/api/interests');
        this.cache = [];
    }

    get(params) {
        return this.$q((resolve, reject) => {
            if (this.cache.length > 0 && (!params || (params && params.cache !== false))) {
                return resolve(this.cache);
            }

            this.getResource().get().$promise.then(
                (result) => {
                    this.cache = result.result;
                    resolve(this.cache);
                },
                (err) => {
                    reject(err);
                });
        });
    }

    remove(id) {
        return this.getResource().delete({id: id}).$promise;
    }

    add(model) {
        return this.getResource().post(model).$promise;
    }

    update(model) {
        return this.getResource().update(model).$promise;
    }
}
InterestsService.$inject = ['$resource', '$q'];

export default InterestsService;