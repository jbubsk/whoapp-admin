'use strict';

import config from '../config';

class InterestsService {
    constructor($resource, $q) {
        this.resource = $resource;
        this.$q = $q;
        this.cache = [];
    }

    getInterests(params) {
        return new Promise((resolve) => {
            if (this.cache.length > 0 && (!params || (params && params.cache !== false))) {
                resolve(this.cache);
            } else {
                this.resource(config.serviceHost + '/api/interests', null, {
                    'get': {method: 'GET', withCredentials: true}
                }).get().$promise.then(result => {
                        this.cache = result.result;
                        resolve(this.cache);
                    });
            }
        });
    }

    deleteItem(id) {
        return this.resource(config.serviceHost + '/api/interests/:id', {id: id}, {
            'delete': {method: 'DELETE', withCredentials: true}
        }).delete().$promise;
    }

    addItem(model) {
        var deferred = this.$q.defer();

        this.resource(config.serviceHost + '/api/interests', null, {
            'post': {method: 'POST', withCredentials: true}
        }).post(model).$promise.then(
            function (data) {
                deferred.resolve(data);
            },
            function (err) {
                if (err.data && err.data.errorCode) {
                    deferred.reject(err.data.errorCode);
                }
            }
        );

        return deferred.promise;
    }
}
InterestsService.$inject = ['$resource', '$q'];

export default InterestsService;