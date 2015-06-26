'use strict';

class InterestsController {
    constructor($scope, InterestsService, $log) {
        this.scope = $scope;
        this.service = InterestsService;
        this.logger = $log;
        this.model = {
            name: ''
        };
        this.errorMessage = '';
        this.collection = [];
        this.listLoader = true;
        this.getInterests();

        this.errors = {
            1062: 'Данный интерес уже существует'
        };
    }

    getInterests() {
        this.service.getInterests().then(data => {
            this.collection = data;
            this.scope.$apply(() => {
                this.listLoader = false;
            });
            this._checkEmpty();
            this.logger.debug(this.collection);
        });
    }

    add() {
        var _this = this;

        _this.errorMessage = '';
        _this.service.addItem(_this.model).then(
            function (data) {
                var addedItem = {
                    id: data.result.id,
                    name: _this.model.name
                };
                _this.collection.unshift(addedItem);
            },
            function (errCode) {
                _this.errorMessage = _this.errors[errCode];
            }
        );
    }

    _checkEmpty() {
        this.emptyList = this.collection.length === 0;
    }
}
InterestsController.$inject = ['$scope', 'InterestsService', '$log'];

export default InterestsController;