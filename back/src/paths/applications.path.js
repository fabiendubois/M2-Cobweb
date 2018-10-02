'use strict'

const express = require('express');
const router = express.Router();
const _ = require('lodash');

const applications_controller = require('../controllers/applications.controller');
const exception = require('../exceptions/http.exception');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * @api {get} /applications Applications FindAll
 * @apiVersion 0.0.1
 * @apiName FindAll
 * @apiGroup Applications
 * @apiPermission Bearer Token
 * 
 * @apiDescription Find all applications.
 * 
 * @apiSuccess (Succes 200) {json} applications Applications.
 * 
 * @apiError (Error 403) {String} Auth Forbidden Access.
 */
router.get('/applications', async function (req, res) {
    try {
        var return_code;
        var return_data;

        let headerAuth = req.headers['authorization'];
        return_data = await applications_controller.findAll(headerAuth);
        return_code = 200;
    } catch (error) {
        log.error('Path', 'Applications', 'GET', '/technologies', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});


module.exports = router;