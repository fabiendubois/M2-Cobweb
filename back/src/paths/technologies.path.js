'use strict'

const technologies_controller = require('../controllers/technologies.controller');
const exception = require('../exceptions/http.exception');

const express = require('express');
const router = express.Router();
const _ = require('lodash');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * @api {get} /technologies Technologies FindAll
 * @apiVersion 0.0.1
 * @apiName FindAll
 * @apiGroup Technologies
 * @apiPermission Bearer Token.
 * 
 * @apiDescription Find all technologies.
 * @apiExample {curl} Example usage:
 *     curl --request GET --url http://api.cobweb.fdu.ovh/api/v1/technologies --header 'Authorization: Bearer <YOUR TOKEN>'
 *
 * @apiSuccess (Succes 200) {JSON} technologies Technologies.
 * 
 * @apiSuccessExample {JSON} Success-Response-Example:
 * HTTP/1.1 200 OK
 *  [{
 *      "id": 1,
 *      "name": "Java"
 *  },
 *  {
 *      "id": 2,
 *      "name": "Php"
 *  }]
 * 
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error. 
 */
router.get('/technologies', async function (req, res) {
    try {
        var return_code;
        var return_data;

        let headerAuth = req.headers['authorization'];
        return_data = await technologies_controller.findAll(headerAuth);
        return_code = 200;
    } catch (error) {
        log.error('Path', 'Technologies', 'GET', '/technologies', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

/**
 * @api {get} /technologies/:id Technologies Find By Id
 * @apiVersion 0.0.1
 * @apiName FindById
 * @apiGroup Technologies
 * @apiPermission Bearer Token. 
 * 
 * @apiDescription Find a technology by id.
 * @apiExample {curl} Example usage:
 *     curl --request GET --url http://api.cobweb.fdu.ovh/api/v1/technologies/1 --header 'Authorization: Bearer <YOUR TOKEN>'
 *
 * @apiParam (Params) {Number} id Technology id.
 * 
 * @apiSuccess (Succes 200) {JSON} technologies Technologies.
 *
 * @apiSuccessExample {JSON} Success-Response-Example:
 * HTTP/1.1 200 OK
 *  [{
 *      "id": 1,
 *      "name": "Java"
 *  }]
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 This param : id, is not a number.
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error.
 */
router.get('/technologies/:id', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.params.id)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let id = req.params.id;
        let headerAuth = req.headers['authorization'];

        return_data = await technologies_controller.findById(headerAuth, id);
        return_code = 200;
    } catch (error) {
        log.error('Path', 'Technologies', 'GET', '/technologies/:id', error);
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
 * @apiPermission Bearer Token. Need to be an admin.
 *
 * @apiDescription Add a technology.
 * 
 * @apiParam (Body) {String} name Technology Name.
 * 
 * @apiSuccess (Succes 201) {JSON} Technology Technology.
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 This param : name, is empty or null.
 * @apiError (Error 400) {String} 2 This param : name, is not a string.
 * @apiError (Error 400) {String} 3 This technology with this name already exists.
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error.
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
        log.error('Path', 'Technologies', 'POST', '/technologies', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

/**
 * @api {delete} /technologies/:id Technologies Delete By Id
 * @apiVersion 0.0.1
 * @apiName Delete
 * @apiGroup Technologies
 * @apiPermission Bearer Token. Need to be an admin.
 *
 * @apiExample {curl} Example usage:
 *     curl --request DELETE --url http://api.cobweb.fdu.ovh/api/v1/technologies/1 --header 'Authorization: Bearer <YOUR TOKEN>'
 * 
 * @apiDescription Delete a technology by id.
 * 
 * @apiParam (Params) {String} id Technology id.
 * 
 * @apiSuccess (Succes 204) {String} Accepted
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 This param : id, is not a number.
 * @apiError (Error 400) {String} 2 This resource cannot be deleted. It is already in use.
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error.
 */
router.delete('/technologies/:id', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.params.id)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let id = req.params.id;
        let headerAuth = req.headers['authorization'];

        return_data = await technologies_controller.deleteById(headerAuth, id);
        return_code = 204;
    } catch (error) {
        log.error('Path', 'Technologies', 'DELETE', '/technologies/:id', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

/**
 * @api {put} /technologies/:id Technologies Update By Id
 * @apiVersion 0.0.1
 * @apiName Update
 * @apiGroup Technologies
 * @apiPermission Bearer Token. Need to be an admin.
 *
 * @apiDescription Update a technology by id.
 * 
 * @apiParam (Params) {String} id Technology id.
 * @apiParam (Body) {String} name Technology name.
 * 
 * @apiSuccess (Succes 204) {String} Accepted
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 This param : id, is not a number.
 * @apiError (Error 400) {String} 1 This param : name, is empty or null.
 * @apiError (Error 400) {String} 2 This param : name, is not a string.
 * @apiError (Error 400) {String} 3 This technology with this name already exists.
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error.
 */
router.put('/technologies/:id', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.params.id) || _.isUndefined(req.body.name)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let name = req.body.name;
        let id = req.params.id;
        let headerAuth = req.headers['authorization'];

        return_data = await technologies_controller.updateById(headerAuth, name, id);
        return_code = 204;
    } catch (error) {
        log.error('Path', 'Technologies', 'PUT', '/technologies/:id', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});


module.exports = router;