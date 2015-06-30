'use strict';

class PlaceDetailsController {
	constructor($injector, place, interests) {
		this.injector = $injector;
		this.place = place;
		this.interests = interests;
		this.styles = {
			left: window.document.body.clientWidth / 2 - 350
		};
		$injector.get('$timeout')(() => {
			this.show = true;
		}, 100);
		this._unselectInterests();

		if (this.place.interestsIds) {
			var placeInterests = this.place.interestsIds.split(',');
			this.interests.forEach(item => {
				if (this.place.interestsIds) {
					placeInterests.every(id => {
						if (item.id === parseInt(id, 10)) {
							item.selected = true;
							return false;
						}
						return true;
					});
				}
			});
		}
	}

	close() {
		this.injector.get('$state').go('places');
	}

	save() {
		var service = this.injector.get('PlacesService'),
			interestsIds = [];
		this.interests.forEach(item => {
			if (item.selected) {
				interestsIds.push(item.id);
			}
		});
		this.place.interestsIds = interestsIds;
		this.injector.get('$log').debug(interestsIds);
		service.updatePlace(this.place).then(() => {
			this.injector.get('$state').go('places');
		});
	}

	_unselectInterests() {
		this.interests.forEach(item => {
			item.selected = false;
		});
	}
}
PlaceDetailsController.$inject = ['$injector', 'place', 'interests'];

export default PlaceDetailsController;
