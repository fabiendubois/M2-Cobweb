'use strict'

const express = require('express');
const router = express.Router();
const _ = require('lodash');

const technologies_controller = require('../controllers/technologies.controller');
const exception = require('../exceptions/http.exception');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * @api {get} /technologies Technologies FindAll
 * @apiVersion 0.0.1
 * @apiName FindAll
 * @apiGroup Technologies
 * @apiPermission Bearer Token
 * 
 * @apiDescription Find all technologies.
 * 
 * @apiSuccess (Succes 200) {json} technologies Technologies.
 * 
 * @apiError (Error 403) {String} Auth Forbidden Access.
 */
router.get('/technologies', async function (req, res) {
    try {
        var return_code;
        var return_data;

        let headerAuth = req.headers['authorization'];
        return_data = await technologies_controller.findAll(headerAuth);
        return_code = 200;
    } catch (error) {
        log.error(error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

/**
 * @api {post} /technologies Technologies Add
 * @apiVersion 0.0.1
 * @apiName Add
 * @apiGroup Technologies
 * @apiPermission Bearer Token
 *
 * @apiDescription Add a technology.
 * 
 * @apiParam (Params) {String} name Technology Name.
 * 
 * @apiSuccess (Succes 201) {Integer} id Technology Id.
 * @apiSuccess (Succes 201) {String} name Technology Name.
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 Name empty or null.
 * @apiError (Error 400) {String} 2 Name is not string.
 * @apiError (Error 400) {String} 3 This technology with this name already exists.

 * @apiError (Error 403) {String} Auth Forbidden Access.
 * 
 */
router.post('/technologies', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.body.name)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let name = req.body.name;
        let headerAuth = req.headers['authorization'];

        return_data = await technologies_controller.add(headerAuth, name);
        return_code = 201;
    } catch (error) {
        log.error(error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});


module.exports = router;