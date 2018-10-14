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
 * @api {get} /flows Flows FindAll
 * @apiVersion 0.0.1
 * @apiName FindAll
 * @apiGroup Flows
 * @apiPermission Bearer Token
 * 
 * @apiDescription Find all flows.
 * 
 * @apiSuccess (Succes 200) {json} flows Flows.
 * 
 * @apiError (Error 403) {String} Auth Forbidden Access.
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
 * @api {get} /flows/:id Flows FindById
 * @apiVersion 0.0.1
 * @apiName FindById
 * @apiGroup Flows
 * @apiPermission Bearer Token
 * 
 * @apiDescription Find a flow by id.
 * 
 * @apiParam (Params) {Number} id Application id.
 * 
 * @apiSuccess (Succes 200) {json} flows Flows.
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 Id is not a number.
 * 
 * @apiError (Error 403) {String} Auth Forbidden Access.
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

/**
 * @api {post} /flows Flows Add
 * @apiVersion 0.0.1
 * @apiName Add
 * @apiGroup Flows
 * @apiPermission Bearer Token. Need to be admin.
 *
 * @apiDescription Add a flows.
 * 
 * @apiParam (Params) {String} name Flows Name.
 * @apiParam (Params) {Number} id_technologies Technology Id.
 * 
 * @apiSuccess (Succes 201) {Integer} id Application Id.
 * @apiSuccess (Succes 201) {String} name Application Name.
 * @apiSuccess (Succes 201) {String} id_technologies Technology Id.
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 Name empty or null.
 * @apiError (Error 400) {String} 2 Name is not string.
 * @apiError (Error 400) {String} 3 Description empty or null.
 * @apiError (Error 400) {String} 4 Description is not string.
 * @apiError (Error 400) {String} 5 id_applications_source is not number.
 * @apiError (Error 400) {String} 6 id_applications_target is not number.
 * @apiError (Error 400) {String} 6 id_users is not number.

 * @apiError (Error 400) {String} 6 This technology with this id not exists.

 * @apiError (Error 403) {String} Auth Forbidden Access.
 * 
 */
router.post('/flows', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.body.name) || _.isUndefined(req.body.description)
            || _.isUndefined(req.body.id_applications_source) || _.isUndefined(req.body.id_applications_target)
            || _.isUndefined(req.body.id_users)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let name = req.body.name;
        let description = req.body.description;
        let id_applications_source = req.body.id_applications_source;
        let id_applications_target = req.body.id_applications_target;
        let id_users = req.body.id_users;

        let headerAuth = req.headers['authorization'];

        return_data = await flows_controller.add(headerAuth, name, description, id_applications_source, id_applications_target, id_users);
        return_code = 201;
    } catch (error) {
        log.error('Path', 'Flows', 'POST', '/flows', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

module.exports = router;