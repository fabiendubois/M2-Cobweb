'use strict'

const express = require('express');
const router = express.Router();
const _ = require('lodash');

const flows_technologies_controller = require('../controllers/flows_technologies.controller');
const exception = require('../exceptions/http.exception');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * @api {get} /flows_technologies Flows_technologies FindAll
 * @apiVersion 0.0.1
 * @apiName FindAll
 * @apiGroup Flows_technologies
 * @apiPermission Bearer Token
 * 
 * @apiDescription Find all flows_technologies.
 * 
 * @apiSuccess (Succes 200) {json} flows_technologies Flows_technologies.
 * 
 * @apiError (Error 403) {String} Auth Forbidden Access.
 */
router.get('/flows_technologies', async function (req, res) {
    try {
        var return_code;
        var return_data;

        let headerAuth = req.headers['authorization'];
        return_data = await flows_technologies_controller.findAll(headerAuth);
        return_code = 200;
    } catch (error) {
        log.error('Path', 'Flows_technologies', 'GET', '/flows_technologies', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

module.exports = router;
