'use strict'

const express = require('express');
const router = express.Router();
const _ = require('lodash');

const flows_controller = require('../controllers/flows.controller');
const exception = require('../exceptions/http.exception');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * @api {get} /flows Flows Find All
 * @apiVersion 0.0.1
 * @apiName FindAll
 * @apiGroup Flows
 * @apiPermission Bearer Token.
 * 
 * @apiDescription Find all flows.
 * @apiExample {curl} Example usage:
 *     curl --request GET --url http://127.0.0.1:8080/api/v1/flows --header 'Authorization: Bearer <YOUR TOKEN>'
 *
 * @apiSuccess (Succes 200) {JSON} applications Applications.
 * 
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error. 
 */
router.get('/flows', async function (req, res) {
    try {
        var return_code;
        var return_data;

        let headerAuth = req.headers['authorization'];
        return_data = await flows_controller.findAll(headerAuth);
        return_code = 200;
    } catch (error) {
        log.error('Path', 'Flows', 'GET', '/flows', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

/**
 * @api {get} /flows/:id Flows Find By Id
 * @apiVersion 0.0.1
 * @apiName FindById
 * @apiGroup Flows
 * @apiPermission Bearer Token. 
 * 
 * @apiDescription Find a flow by id.
 * @apiExample {curl} Example usage:
 *     curl --request GET --url http://127.0.0.1:8080/api/v1/flows/1 --header 'Authorization: Bearer <YOUR TOKEN>'
 *
 * @apiParam (Params) {Number} id Flow id.
 * 
 * @apiSuccess (Succes 200) {JSON} flows Flows.
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 Id is not a number.
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error.
 */
router.get('/flows/:id', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.params.id)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let id = req.params.id;
        let headerAuth = req.headers['authorization'];

        return_data = await flows_controller.findById(headerAuth, id);
        return_code = 200;
    } catch (error) {
        log.error('Path', 'Flows', 'GET', '/flows/:id', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

// DELETE /flows/:id
// PUT /flows:id
// GET /flows/:id/technologies/
// GET /flows/:id/technologies/:id
// POST /flows/:id/technologies/:id
// DELETE /flows/:id/technologies/:id
