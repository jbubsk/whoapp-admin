'use strict';

import config from '../config';

export default
class CoreService {
    constructor($q, $resource) {
        this.$q = $q;
        this.$resource = $resource;
    }

    setUp(url) {
        this.$resource = this.$resource(config.serviceHost + url + '/:id',
            {id: '@id'},
            {
                'get': this._getMethodImplementation('GET'),
                'post': this._getMethodImplementation('POST'),
                'delete': this._getMethodImplementation('DELETE'),
                'update': this._getMethodImplementation('PUT')
            }
        );
    }

    getResource() {
        return this.$resource;
    }

    _getMethodImplementation(methodName) {
        return {
            method: methodName
        };
    }
}