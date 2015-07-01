'use strict';

import CoreService from './core.service';

class UsersService extends CoreService {
    constructor($resource, $q) {
        super($q, $resource);
        this.setUp('/api/users');
    }

    getUsers() {
        return this.getResource().get().$promise;
    }

    remove(id) {
        return this.getResource().delete({id:id}).$promise;
    }

    addItem(model) {
        return this.getResource().post(model).$promise;
    }
}
UsersService.$inject = ['$resource', '$q'];

export default UsersService;