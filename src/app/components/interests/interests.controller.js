"use strict";

class InterestsController {
    constructor(InterestsService, $log) {
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
            1062: "Данный интерес уже существует"
        }
    }

    getInterests() {
        var _this = this;

        _this.service.getInterests().then(
            function (data) {
                _this.collection = data.result;
                _this.listLoader = false;
                _this._checkEmpty();
                _this.logger.debug(_this.collection);
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
InterestsController.$inject = ['InterestsService', '$log'];

export default InterestsController;