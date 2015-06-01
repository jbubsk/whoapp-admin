'use strict';

var session = {},
	cookieAuthStatus = 'auth_status',
	cookieUserName = 'username';

class Session {

	constructor() {

	}

	create(username, userRole) {
		session.username = username;
		session.authenticated = true;
		setCookie(cookieAuthStatus, '1');
		setCookie(cookieUserName, username);
	}
	destroy() {
		session.username = null;
		session.authenticated = false;
		deleteCookie(cookieAuthStatus);
		deleteCookie(cookieUserName);
	}
	initialize() {
		var cookie = document.cookie;

		if (cookie.length > 0) {
			session.username = getCookie(cookieUserName);
			session.authenticated = !!getCookie(cookieAuthStatus);
		}
	}
	isAuthenticated() {
		return !!session.authenticated;
	}
	getUsername() {
		return session.username;
	}
};

function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
	options = options || {};

	var expires = options.expires;

	if (typeof expires == 'number' && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}

	value = encodeURIComponent(value);

	if (!value) {

		return;
	}
	var updatedCookie = name + "=" + value;

	for (var propName in options) {
		updatedCookie += "; " + propName;
		var propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
	}

	document.cookie = updatedCookie;
}

function deleteCookie(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT';
}

export default Session;
