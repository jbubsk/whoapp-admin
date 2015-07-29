'use strict';

var send = require('send'),
    express = require('express'),
    url = require('url'),
    config = require('./config'),
    logger = require('./logger-winston');

module.exports = function st(root, options) {
    options = options || {};
    var cutIndex = 0;

    return function (req, res, next) {

        var originalUrl = req.originalUrl;

        if (hasUrl('/api/') || hasUrl('/auth/')) {
            logger.debug(originalUrl);
            return next();
        }

        if (hasUrl('/styles/') ||
            hasUrl('/scripts/') ||
            hasUrl('/images/' ||
            hasUrl('/favicon'))) {

            if (hasUrl('/scripts')) {
                cutIndex = originalUrl.indexOf('/scripts');
            }
            if (hasUrl('/styles')) {
                cutIndex = originalUrl.indexOf('/styles');
            }
            req.originalUrl = originalUrl.substring(cutIndex);
            req.url = req.url.substring(cutIndex);

            return express.static(config.STATIC_PATH)(req, res, next);
        }

        return send(req, '/', {
            maxage: options.maxAge || 0,
            root: root,
            index: options.index || 'index.html'
        })
            .pipe(res);

        function hasUrl(partOfUrl) {
            return originalUrl.indexOf(partOfUrl) > -1;
        }
    };
};