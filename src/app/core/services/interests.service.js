'use strict';

import config from '../config';

class InterestsService {
    constructor($resource, $q) {
        this.resource = $resource;
        this.$q = $q;
        this.cache = [];
    }

    get(params) {
        return this.$q((resolve, reject) => {
            if (this.cache.length > 0 && (!params || (params && params.cache !== false))) {
                return resolve(this.cache);
            }

            this.resource(config.serviceHost + '/api/interests', null, {
                'get': {method: 'GET', withCredentials: true}
            }).get().$promise.then(
                (result) => {
                    this.cache = result.result;
                    resolve(this.cache);
                },
                (err) => {
                    if (err.data && err.data.code) {
                        reject(err.data.code);
                    }
                });
        });
    }

    remove(id) {
        var deferred = this.$q.defer();

        this.resource(config.serviceHost + '/api/interests/:id', {id: id}, {
            'delete': {method: 'DELETE', withCredentials: true}
        }).delete().$promise.then(
            () => {
                deferred.resolve();
            },
            (err) => {
                if (err.data && err.data.code) {
                    deferred.reject(err.data.code);
                }
            }
        );

        return deferred.promise;
    }

    add(model) {
        var deferred = this.$q.defer();

        this.resource(config.serviceHost + '/api/interests', null, {
            'post': {method: 'POST', withCredentials: true}
        }).post(model).$promise.then(
            (data) => {
                deferred.resolve(data);
            },
            (err) => {
                if (err.data && err.data.code) {
                    deferred.reject(err.data.code);
                }
            }
        );

        return deferred.promise;
    }

    update(model) {
        var deferred = this.$q.defer();

        this.resource(config.serviceHost + '/api/interests', null, {
            'update': {method: 'PUT', withCredentials: true}
        }).update(model).$promise.then(
            (data) => {
                deferred.resolve(data.result);
            },
            (err) => {
                if (err.data && err.data.code) {
                    deferred.reject(err.data.code);
                }
            }
        );

        return deferred.promise;
    }
}
InterestsService.$inject = ['$resource', '$q'];

export default InterestsService;