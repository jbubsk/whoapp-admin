'use strict';

import Session from './session';

class AuthService {

	constructor($resource) {

	}

	login(model, successCallback, errorCallback) {
		ajax.send({
			url: '/login',
			method: 'post',
			data: model,
			publicApi: true,
			success: function (data) {
				Session.create(data.username, data.userRole);
				successCallback();
			},
			error: function (error) {
				console.error("Response text: " + error.responseText + "Status: " + error.status + "\nStatus text: " + error.statusText);
				if (errorCallback) {
					errorCallback();
				}
			}
		});
	}

	logout(successCallback, errorCallback) {
		ajax.send({
			url: '/logout',
			publicApi: true,
			success: function () {
				Session.destroy();
				if (successCallback) {
					successCallback();
				}
			},
			error: function (error) {
				console.error("Response text: " + error.responseText + "Status: " + error.status + "\nStatus text: " + error.statusText);
			}
		});
	}

	register(model, successCallback, errorCallback) {
		ajax.send({
			url: '/signup',
			method: 'post',
			data: model,
			publicApi: true,
			success: function () {
				Session.destroy();
				if (successCallback) {
					successCallback();
				}
			},
			error: function (error) {
				console.error("Response text: " + error.responseText + "Status: " + error.status + "\nStatus text: " + error.statusText);
			}
		});
	}
}

AuthService.$inject = ['$resource'];

export default AuthService;
