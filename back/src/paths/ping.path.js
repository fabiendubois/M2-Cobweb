'use strict'

const express = require('express');
const router = express.Router();

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * @api {get} /ping Ping
 * @apiVersion 0.0.1
 * @apiName Ping
 * @apiGroup Tools
 *
 * @apiExample {curl} Example usage:
 *     curl --request GET --url http://api.cobweb.fdu.ovh/v1/ping
 *
 * @apiSuccess (Succes 200) {String} pong Pong.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "pong":"true",
 *     }
 */
router.get('/ping', async function (req, res) {
    let return_code;
    let return_data;
    try {
        return_data = '{"pong":"true"}';
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