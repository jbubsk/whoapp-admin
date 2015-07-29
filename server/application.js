"use strict";

var express = require('express'),
    app = express(),
    html5static = require('./html5static'),
    http = require('http'),
    server = http.createServer(app),
    logger = require('./logger-winston'),
    config = require('./config'),
    accessLogger = require('./access.logger');

app.use(html5static(config.STATIC_PATH));

app.use(accessLogger());

module.exports = {
    start: function (config) {
        server.listen(config.port, config.ip_address);
        logger.info('HTTP Server is started on ' + config.ip_address + ' listening ' + config.port
        );
    }
};