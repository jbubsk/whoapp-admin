"use strict";

class UsersController {
    constructor(UsersService, $log) {
        this.service = UsersService;
        this.logger = $log;

        this.model = {
            username: '',
            password: '',
            email: ''
        };
        this.errorMessage = '';
        this.collection = [];
        this.listLoader = true;
        this.getUsers();

        this.errors = {
            1062: "Данное имя пользователя уже существует"
        }
    }

    getUsers() {
        var _this = this;

        _this.service.getUsers().then(
            function (data) {
                _this.collection = data.result;
                _this.listLoader = false;
                _this._checkEmpty();
                _this.logger.debug(_this.collection);
            },
            function (error) {
                _this.listLoader = false;
                _this.logger.debug(error);
            });
    }

    add() {
        var _this = this;

        _this.errorMessage = '';
        _this.service.addItem(_this.model).then(
            function (data) {
                var addedItem = {
                    id: data.result.id,
                    username: _this.model.username,
                    status: data.result.status,
                    last_date_activity: data.result.last_date_activity
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
UsersController.$inject = ['UsersService', '$log'];

export default UsersController;