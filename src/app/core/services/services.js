'use strict';

import AuthService from './authentication.service';
import YandexService from './yandex.service';
import CityService from './cities.service';
import PlacesService from './places.service';
import InterestsService from './interests.service';
import UsersService from './users.service';

export default angular.module('services', [])
	.service('AuthService', AuthService)
	.service('CityService', CityService)
	.service('YandexService', YandexService)
	.service('InterestsService', InterestsService)
	.service('PlacesService', PlacesService)
	.service('UsersService', UsersService);