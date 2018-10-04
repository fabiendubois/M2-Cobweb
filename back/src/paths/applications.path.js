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
        log.error('Path', 'Applications', 'GET', '/applications', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

/**
 * @api {get} /applications/:id Applications FindById
 * @apiVersion 0.0.1
 * @apiName FindById
 * @apiGroup Applications
 * @apiPermission Bearer Token
 * 
 * @apiDescription Find an applications by id.
 * 
 * @apiParam (Params) {Number} id Application id.
 * 
 * @apiSuccess (Succes 200) {json} applications Applications.
 * 
 * @apiError (Error 403) {String} Auth Forbidden Access.
 */
router.get('/applications/:id', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.params.id)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let id = req.params.id;
        let headerAuth = req.headers['authorization'];

        return_data = await applications_controller.findById(headerAuth, id);
        return_code = 200;
    } catch (error) {
        log.error('Path', 'Applications', 'GET', '/applications/:id', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

/**
 * @api {post} /applications Applications Add
 * @apiVersion 0.0.1
 * @apiName Add
 * @apiGroup Applications
 * @apiPermission Bearer Token. Need to be admin.
 *
 * @apiDescription Add an application.
 * 
 * @apiParam (Params) {String} name Application Name.
 * @apiParam (Params) {Number} id_technologies Technology Id.
 * 
 * @apiSuccess (Succes 201) {Integer} id Application Id.
 * @apiSuccess (Succes 201) {String} name Application Name.
 * @apiSuccess (Succes 201) {String} id_technologies Technology Id.

 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 Name empty or null.
 * @apiError (Error 400) {String} 2 Name is not string.
 * @apiError (Error 400) {String} 2 id_technologies is not number.
 * @apiError (Error 400) {String} 3 This technology with this id not exists.

 * @apiError (Error 403) {String} Auth Forbidden Access.
 * 
 */
router.post('/applications', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.body.name) || _.isUndefined(req.body.id_technologies)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let name = req.body.name;
        let id_technologies = req.body.id_technologies;

        let headerAuth = req.headers['authorization'];

        return_data = await applications_controller.add(headerAuth, name, id_technologies);
        return_code = 201;
    } catch (error) {
        log.error('Path', 'Applications', 'POST', '/applications', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

/**
 * @api {delete} /applications/:id Applications Delete
 * @apiVersion 0.0.1
 * @apiName Delete
 * @apiGroup Applications
 * @apiPermission Bearer Token. Need to be admin.
 *
 * @apiDescription Delete a technology by id.
 * 
 * @apiParam (Params) {String} id Id application.
 * 
 * @apiSuccess (Succes 204) {String} Accepted
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 Id is not a number.
 * 
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * 
 */
router.delete('/applications/:id', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.params.id)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let id = req.params.id;
        let headerAuth = req.headers['authorization'];

        log.debug('params : ', id);
        return_data = await applications_controller.deleteById(headerAuth, id);
        return_code = 204;
    } catch (error) {
        log.error('Path', 'Applications', 'DELETE', '/applications/:id', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});


module.exports = router;