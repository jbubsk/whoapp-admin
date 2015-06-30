'use strict';

import ErrorHandler from '../../core/error.handler';

class UsersController extends ErrorHandler {
    constructor(UsersService, $log) {
        super();
        this.service = UsersService;
        this.logger = $log;

        this.model = {
            username: '',
            password: '',
            email: ''
        };
        this.collection = [];
        this.listLoader = true;
        this.getUsers();

        this.errors[1062] = 'Данное имя пользователя уже существует';
    }

    getUsers() {
        this.service.getUsers().then(
            (data) => {
                this.collection = data.result;
                this.listLoader = false;
                this._checkEmpty();
                this.logger.debug(this.collection);
            },
            (errorCode) => {
                this.listLoader = false;
                this.logger.debug(errorCode);
                this.handleError(errorCode);
            });
    }

    add() {
        this.hideError();
        this.service.addItem(this.model).then(
            (data) => {
                var addedItem = {
                    id: data.result.id,
                    username: this.model.username,
                    status: data.result.status,
                    lastDateActivity: data.result.lastDateActivity
                };
                this.collection.unshift(addedItem);
            },
            (errorCode) => {
                this.handleError(errorCode);
            }
        );
    }

    _checkEmpty() {
        this.emptyList = this.collection.length === 0;
    }
}
UsersController.$inject = ['UsersService', '$log'];

export default UsersController;