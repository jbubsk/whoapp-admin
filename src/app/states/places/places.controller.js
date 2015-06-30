'use strict';

import ErrorHandler from '../../core/error.handler';

class PlacesController extends ErrorHandler {
    constructor($scope, $injector) {
        super();
        this.$scope = $scope;
        this.service = $injector.get('YandexService');
        this.placesService = $injector.get('PlacesService');
        this.logger = $injector.get('$log');
        this.images = $injector.get('IMAGES');
        this.state = $injector.get('$state');

        this.model = {
            name: '',
            city: '',
            cityId: '',
            address: '',
            latitude: '',
            longitude: '',
            suggestedAddress: ''
        };
        this.cityEditorDisabled = false;
        this.showSearchResults = false;
        this.listLoader = true;
        this.addPlaceLoader = false;
        this.collection = [];
        this._getPlaces();
    }

    search() {
        var model = this.model;

        if (model.cityId) {
            this.service.getAddressWithCoordinates(model.city + ', ' + model.address).then(
                    result => {
                    this.$scope.$apply(() => {
                        model.latitude = result.coordinates[0];
                        model.longitude = result.coordinates[1];
                        model.suggestedAddress = result.address;
                        this.showSearchResults = true;
                    });
                },
                    err => {
                    this.logger.debug({
                        message: 'Ошибка',
                        error: err
                    });
                }
            );
        } else {
            this.handleError('Выберите, пожалуйста, город');
        }
    }

    add() {
        var model = {
            name: this.model.name,
            city: this.model.city,
            cityId: this.model.cityId,
            address: this.model.suggestedAddress,
            latitude: this.model.latitude.toFixed(7),
            longitude: this.model.longitude.toFixed(7)
        };

        if (this._isModelValid()) {
            this.addPlaceLoader = true;
            this.placesService.addPlace(model)
                .then(data => {
                    model.id = data.result.id;
                    this.collection.unshift(model);
                    this._checkEmpty();
                    this.addPlaceLoader = false;
                    this._resetState();
                }, () => {
                    this.addPlaceLoader = false;
                });
        }
    }

    transition(item) {
        this.state.go('places.details', {
            id: item.id
        });
    }

    _isModelValid() {
        var model = this.model;

        if (model.name.trim().length === 0) {
            this.handleError('Заполните, пожалуйста, название');
        } else if (model.address.trim().length === 0) {
            this.handleError('Заполните, пожалуйста, адрес');
        }

        return this.errorMessage.length === 0;
    }

    _getPlaces() {
        this.placesService.getPlaces().then(
            (data) => {
                this.collection = data.result;
                this._checkEmpty();
                this._resetState();
            },
            (errorCode) => {
                this.listLoader = false;
                this.handleError(errorCode);
            });
    }

    _resetState() {
        angular.forEach(this.model, (value, key) => {
            this.model[key] = '';
        });
        this.cityEditorDisabled = false;
        this.showSearchResults = false;
        this.listLoader = false;
    }

    _checkEmpty() {
        this.emptyList = this.collection.length === 0;
    }
}
PlacesController.$inject = ['$scope', '$injector'];

export default PlacesController;
