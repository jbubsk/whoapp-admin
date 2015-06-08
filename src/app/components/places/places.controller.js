"use strict";

import socket from '../../common/socket';

class PlacesController {
    constructor($scope, $injector) {
        this.$scope = $scope;
        this.service = $injector.get('YandexService');
        this.placesService = $injector.get('PlacesService');
        this.logger = $injector.get('$log');

        this.model = {
            name: '',
            city: '',
            cityId: '',
            address: '',
            latitude: '',
            longitude: '',
            suggestedAddress: ''
        };
        this.error = '';
        this.cityEditorDisabled = false;
        this.showSearchResults = false;
        this.showPlacesResults = false;
        this.places = [];
        this.getPlaces();
    }

    switchCityEditor() {
        this.cityEditorDisabled = false;
    }

    search() {
        var _this = this, model = _this.model;

        if (model.cityId) {
            _this.service.getAddressWithCoordiantes(model.city + ', ' + model.address).then(
                function (result) {
                    _this.$scope.$apply(function () {
                        model.latitude = result.coordinates[0];
                        model.longitude = result.coordinates[1];
                        model.suggestedAddress = result.address;
                        _this.showSearchResults = true;
                    });
                },
                function (err) {
                    _this.logger.debug({message: 'Ошибка', error: err});
                }
            );
        } else {
            _this.error = "Выберите, пожалуйста, город";
        }
    }

    isModelValid() {
        var _this = this, model = _this.model;

        if (model.name.trim().length === 0) {
            _this.error = "Заполните, пожалуйста, название";
        } else if (model.address.trim().length === 0) {
            _this.error = "Заполните, пожалуйста, адрес";
        }

        return _this.error.length === 0;
    }

    add() {
        var _this = this,
            model = {
                name: _this.model.name,
                city_id: _this.model.cityId,
                address: _this.model.suggestedAddress,
                name_ru: _this.model.city
            };

        if (_this.isModelValid()) {
            _this.placesService.addPlace(model)
                .then(function (data) {
                    model.id = data.result.id;
                    _this.places.unshift(model);

                    _this._resetState();
                });
        }
    }

    getPlaces() {
        var _this = this;
        this.placesService.getPlaces().then(function (data) {
            _this.places = data.result;
            _this._resetState();
        });

    }

    deletePlace(placeId) {
        var _this = this;
        _this.placesService.deletePlace(placeId)
            .then(function () {
                angular.forEach(_this.places, function (value, key) {
                    if (value.id === placeId) {
                        _this.places.splice(key, 1);
                    }
                });
            });

    }
    _resetState(){
        var _this = this;

        angular.forEach(_this.model, function (value, key) {
            _this.model[key] = '';
        });
        _this.cityEditorDisabled = false;
        _this.showSearchResults = false;
        _this.showPlacesResults = true;
    }
}
PlacesController.$inject = ['$scope', '$injector'];

export default PlacesController;