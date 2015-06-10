"use strict";

class YandexSearch {
    getAddressWithCoordinates(objectName) {
        // options can be {kind:'house'} - by default
        return ymaps.geocode(objectName)
            .then(function (res) {
                var coordinates = res.geoObjects.get(0).geometry.getCoordinates();
                var suggestedAddress = res.geoObjects.get(0).properties.get('name');

                return {coordinates: coordinates, address: suggestedAddress};
            })
    }
}

export default YandexSearch;