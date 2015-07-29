"use strict";

var winston = require('winston'),
    moment = require('moment');

var logger = new (winston.Logger)({
    levels: {
        trace: 0,
        input: 1,
        verbose: 2,
        prompt: 3,
        debug: 4,
        info: 5,
        data: 6,
        jwt: 7,
        warn: 8,
        error: 9
    },
    colors: {
        trace: 'magenta',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        debug: 'blue',
        info: 'green',
        data: 'grey',
        jwt: 'cyan',
        warn: 'yellow',
        error: 'red'
    },
    transports: [
        new (winston.transports.Console)({
            level: 'trace',
            prettyPrint: true,
            colorize: true,
            silent: false,
            timestamp: function () {
                return moment().format('DD-MM-YYYY hh:mm:ss:SSS');
            },
            formatter: function (options) {
                return options.timestamp() + ' ' + options.level.toUpperCase() + ' ' + (undefined !== options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '' );
            }
        })
    ]
});

//logger.add(winston.transports.Console, {
//    level: 'trace',
//    prettyPrint: true,
//    colorize: true,
//    silent: false,
//    timestamp: true,
//    formatter: function (options) {
//        return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
//            (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
//    }
//});

//todo add file for logs
//logger.add(winston.transports.File, {
//    prettyPrint: false,
//    level: 'info',
//    silent: false,
//    colorize: true,
//    timestamp: true,
//    filename: './some_file.log',
//    maxsize: 40000,
//    maxFiles: 10,
//    json: false
//});

module.exports = logger;