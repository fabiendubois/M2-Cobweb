'use strict'

const express = require('express');
const router = express.Router();
const _ = require('lodash');

const exception = require('../exceptions/http.exception');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * @api {get} /ping Ping
 * @apiVersion 0.0.1
 * @apiName Ping
 * @apiGroup General
 *
 * @apiSuccess {String} ping Pong.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "ping":"pong",
 *     }
 * @apiSampleRequest http://127.0.0.1:8080/api/v1/ping
 */
router.get('/ping', async function (req, res) {
    try {
        var return_code;
        var return_data;

        return_data = '{ "ping": "pong"}';
        return_code = 200;
    } catch (error) {
        log.error(error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

module.exports = router;