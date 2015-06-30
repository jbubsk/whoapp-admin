'use strict';

import ErrorHandler from '../../core/error.handler';

class InterestsController extends ErrorHandler {
    constructor($scope, InterestsService, $log) {
        super();
        this.scope = $scope;
        this.service = InterestsService;
        this.logger = $log;
        this.model = {
            name: ''
        };
        this.collection = [];
        this.listLoader = true;
        this.getInterests();

    }

    getInterests() {
        this.service.get().then(
            (data) => {
                this.collection = data;
                this.listLoader = false;
                this._checkEmpty();
                this.logger.debug(this.collection);
            },
            (errorCode) => {
                this.listLoader = false;
                this.handleError(errorCode);
            });
    }

    add() {
        this.errorMessage = '';
        this.service.add(this.model).then(
                data => {
                var addedItem = {
                    id: data.result.id,
                    name: this.model.name
                };
                this.collection.unshift(addedItem);
            },
                errCode => {
                this.handleError(errCode);
            }
        );
    }

    _checkEmpty() {
        this.emptyList = this.collection.length === 0;
    }
}
InterestsController.$inject = ['$scope', 'InterestsService', '$log'];

export default InterestsController;