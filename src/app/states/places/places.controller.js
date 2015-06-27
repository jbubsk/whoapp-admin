'use strict';

class PlacesController {
    constructor($scope, $injector) {
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
        this.error = '';
        this.cityEditorDisabled = false;
        this.showSearchResults = false;
        this.listLoader = true;
        this.addPlaceLoader = false;
        this.collection = [];
        this._getPlaces();
    }

    search() {
        var _this = this, model = _this.model;

        if (model.cityId) {
            _this.service.getAddressWithCoordinates(model.city + ', ' + model.address).then(
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
            _this.error = 'Выберите, пожалуйста, город';
        }
    }

    add() {
        var _this = this,
            model = {
                name: _this.model.name,
                city: _this.model.city,
                cityId: _this.model.cityId,
                address: _this.model.suggestedAddress,
                latitude: _this.model.latitude.toFixed(7),
                longitude: _this.model.longitude.toFixed(7)
            };

        if (_this._isModelValid()) {
            _this.addPlaceLoader = true;
            _this.placesService.addPlace(model)
                .then(function (data) {
                    model.id = data.result.id;
                    _this.collection.unshift(model);
                    _this._checkEmpty();
                    _this.addPlaceLoader = false;
                    _this._resetState();
                }, function () {
                    _this.addPlaceLoader = false;
                });
        }
    }

    transition(item) {
        this.state.go('places.details', {id: item.id});
        this.logger.debug('transition to place.details');
    }

    _isModelValid() {
        var _this = this, model = _this.model;

        if (model.name.trim().length === 0) {
            _this.error = 'Заполните, пожалуйста, название';
        } else if (model.address.trim().length === 0) {
            _this.error = 'Заполните, пожалуйста, адрес';
        }

        return _this.error.length === 0;
    }

    _getPlaces() {
        var _this = this;
        this.placesService.getPlaces().then(function (data) {
            _this.collection = data.result;
            _this._checkEmpty();
            _this._resetState();
        });
    }

    _resetState() {
        var _this = this;

        angular.forEach(_this.model, function (value, key) {
            _this.model[key] = '';
        });
        _this.cityEditorDisabled = false;
        _this.showSearchResults = false;
        _this.listLoader = false;
    }

    _checkEmpty() {
        this.emptyList = this.collection.length === 0;
    }
}
PlacesController.$inject = ['$scope', '$injector'];

export default PlacesController;