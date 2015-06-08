"use strict";

import config from '../config';

class CityService {
    constructor($injector) {
        this.resource = $injector.get('$resource');
        this.http = $injector.get('$http');
    }

    getCity(cityName) {
        return this.resource(config.apiUrl + '/api/cities', null, {
            get: {method: 'GET', withCredentials: true}
        }).get({name: cityName}).$promise;
    }
}
CityService.$inject = ['$injector'];

export default CityService;