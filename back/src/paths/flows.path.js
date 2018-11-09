'use strict'

const flows_controller = require('../controllers/flows.controller');
const exception = require('../exceptions/http.exception');

const express = require('express');
const router = express.Router();
const _ = require('lodash');

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
 * @apiError (Error 400) {String} 1 This param : id, is not a number.
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

/**
 * @api {post} /flows Flows Add
 * @apiVersion 0.0.1
 * @apiName Add
 * @apiGroup Flows
 * @apiPermission Bearer Token. Need to be an admin.
 *
 * @apiDescription Add a flow.
 * 
 * @apiParam (Body) {String} name Technology Name.
 * @apiParam (Body) {String} description Flows Description.
 * @apiParam (Body) {Number} id_applications_source Technology id_applications_source.
 * @apiParam (Body) {Number} id_applications_target Technology id_applications_target.
 * 
 * @apiSuccess (Succes 201) {JSON} Technology Technology.
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 This param : name, is empty or null.
 * @apiError (Error 400) {String} 2 This param : name, is not a string.
 * @apiError (Error 400) {String} 3 This param : description, is empty or null.
 * @apiError (Error 400) {String} 4 This param : description, is not a string.
 * @apiError (Error 400) {String} 5 This param : id_applications_source, is not number.
 * @apiError (Error 400) {String} 6 This param : id_applications_target, is not number.
 * @apiError (Error 400) {String} 7 id_applications_source not exists.
 * @apiError (Error 400) {String} 8 id_applications_target not exists.
 * @apiError (Error 400) {String} 9 A flow with this name already exists.
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error.
 */
router.post('/flows', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.body.name) || _.isUndefined(req.body.description) || _.isUndefined(req.body.id_applications_source) ||_.isUndefined(req.body.id_applications_target)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let name = req.body.name;
        let description = req.body.description;
        let id_applications_source = req.body.id_applications_source;
        let id_applications_target = req.body.id_applications_target;
        let headerAuth = req.headers['authorization'];

        return_data = await flows_controller.add(headerAuth, name, description, id_applications_source, id_applications_target);
        return_code = 201;
    } catch (error) {
        log.error('Path', 'Flows', 'POST', '/flows', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

/**
 * @api {delete} /flows/:id Flows Delete By Id
 * @apiVersion 0.0.1
 * @apiName Delete
 * @apiGroup Flows
 * @apiPermission Bearer Token. Need to be an admin.
 *
 * @apiExample {curl} Example usage:
 *     curl --request DELETE --url http://127.0.0.1:8080/api/v1/flows/1 --header 'Authorization: Bearer <YOUR TOKEN>'
 * 
 * @apiDescription Delete a flows by id.
 * 
 * @apiParam (Params) {String} id Flow id.
 * 
 * @apiSuccess (Succes 204) {String} Accepted
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 This param : id, is not a number.
 * @apiError (Error 400) {String} 2 Flow not exist.
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error.
 */
router.delete('/flows/:id', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.params.id)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let id = req.params.id;
        let headerAuth = req.headers['authorization'];

        return_data = await flows_controller.deleteById(headerAuth, id);
        return_code = 204;
    } catch (error) {
        log.error('Path', 'Flows', 'DELETE', '/flows/:id', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

/**
 * @api {put} /flows/:id Flows Update By Id
 * @apiVersion 0.0.1
 * @apiName Update
 * @apiGroup Flows
 * @apiPermission Bearer Token. Need to be an admin.
 *
 * @apiDescription Update a flow by id.
 * 
 * @apiParam (Body) {String} name Technology Name.
 * @apiParam (Body) {String} description Flows Description.
 * @apiParam (Body) {Number} id_applications_source Technology id_applications_source.
 * @apiParam (Body) {Number} id_applications_target Technology id_applications_target.
 * 
 * @apiSuccess (Succes 204) {String} Accepted
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 This param : name, is empty or null.
 * @apiError (Error 400) {String} 2 This param : name, is not a string.
 * @apiError (Error 400) {String} 3 This param : description, is empty or null.
 * @apiError (Error 400) {String} 4 This param : description, is not a string.
 * @apiError (Error 400) {String} 5 This param : id_applications_source, is not number.
 * @apiError (Error 400) {String} 6 This param : id_applications_target, is not number.
 * @apiError (Error 400) {String} 7 This param : id, is not number.
 * @apiError (Error 400) {String} 8 id_applications_source not exists.
 * @apiError (Error 400) {String} 9 id_applications_target not exists.
 * @apiError (Error 400) {String} 10 A flow whith this id not exists.
 * @apiError (Error 400) {String} 11 A flow with this name already exists.
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error.
 */
router.put('/flows/:id', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.params.id) || _.isUndefined(req.body.name)  || _.isUndefined(req.body.description) || _.isUndefined(req.body.id_applications_source) ||_.isUndefined(req.body.id_applications_target)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let id = req.params.id;
        let name = req.body.name;
        let description = req.body.description;
        let id_applications_source = req.body.id_applications_source;
        let id_applications_target = req.body.id_applications_target;
        let headerAuth = req.headers['authorization'];

        return_data = await flows_controller.updateById(headerAuth, name, description, id_applications_source, id_applications_target, id);
        return_code = 204;
    } catch (error) {
        log.error('Path', 'Flows', 'PUT', '/flows/:id', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

// GET /flows/:id/technologies/
// GET /flows/:id/technologies/:id
// POST /flows/:id/technologies/:id
// DELETE /flows/:id/technologies/:id

module.exports = router;