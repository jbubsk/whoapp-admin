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
                    result => {
                    _this.$scope.$apply(() => {
                        model.latitude = result.coordinates[0];
                        model.longitude = result.coordinates[1];
                        model.suggestedAddress = result.address;
                        _this.showSearchResults = true;
                    });
                },
                    err => {
                    _this.logger.debug({message: 'Ошибка', error: err});
                }
            );
        } else {
            _this.error = 'Выберите, пожалуйста, город';
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

    transition(item, event) {
        this.state.go('places.details', {id: item.id});
    }

    _isModelValid() {
        var model = this.model;

        if (model.name.trim().length === 0) {
            this.error = 'Заполните, пожалуйста, название';
        } else if (model.address.trim().length === 0) {
            this.error = 'Заполните, пожалуйста, адрес';
        }

        return this.error.length === 0;
    }

    _getPlaces() {
        this.placesService.getPlaces().then(data => {
            this.collection = data.result;
            this._checkEmpty();
            this._resetState();
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