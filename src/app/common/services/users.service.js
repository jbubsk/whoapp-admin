"use strict";

import config from '../config';

class UsersService {
    constructor($resource, $q) {
        this.resource = $resource;
        this.$q = $q;
        this.serviceUrl = config.serviceHost + '/api/users';
    }

    getUsers() {
        return this.resource(this.serviceUrl, null, {
            'get': {method: 'GET', withCredentials: true}
        }).get().$promise;
    }

    deleteItem(id) {
        return this.resource(this.serviceUrl + '/:id', {id: id}, {
            'delete': {method: 'DELETE', withCredentials: true}
        }).delete().$promise;
    }

    addItem(model) {
        var deferred = this.$q.defer();

        this.resource(this.serviceUrl, null, {
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
UsersService.$inject = ['$resource', '$q'];

export default UsersService;