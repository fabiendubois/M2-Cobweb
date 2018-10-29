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
 * @api {get} /applications Applications Find All
 * @apiVersion 0.0.1
 * @apiName FindAll
 * @apiGroup Applications
 * @apiPermission Bearer Token.
 * 
 * @apiDescription Find all applications.
 * @apiExample {curl} Example usage:
 *     curl --request GET --url http://127.0.0.1:8080/api/v1/applications --header 'Authorization: Bearer <YOUR TOKEN>'
 *
 * @apiSuccess (Succes 200) {JSON} applications Applications.
 * 
 * @apiSuccessExample {JSON} Success-Response-Example:
 * HTTP/1.1 200 OK
 *  [{
 *      "id": 1,
 *      "name": "Application Cobweb",
 *      "description": "Applications flows graph",
 *      "team": "iii"
 *  },
 *  {
 *      "id": 2,
 *      "name": "Application Walrus",
 *      "description": "It's a mentimeterLike",
 *      "team": "iii"
 *  }]
 * 
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error. 
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
 * @api {get} /applications/:id Applications Find By Id
 * @apiVersion 0.0.1
 * @apiName FindById
 * @apiGroup Applications
 * @apiPermission Bearer Token. 
 * 
 * @apiDescription Find an applications by id.
 * @apiExample {curl} Example usage:
 *     curl --request GET --url http://127.0.0.1:8080/api/v1/applications/1 --header 'Authorization: Bearer <YOUR TOKEN>'
 *
 * @apiParam (Params) {Number} id Application id.
 * 
 * @apiSuccess (Succes 200) {JSON} applications Applications.
 *
 * @apiSuccessExample {JSON} Success-Response-Example:
 * HTTP/1.1 200 OK
 *  [{
 *      "id": 1,
 *      "name": "Application Cobweb",
 *      "description": "Applications flows graph",
 *      "team": "iii"
 *  }]
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 Id is not a number.
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error.
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
 * @api {get} /applications/:id/technologies Applications Find All Technologies
 * @apiVersion 0.0.1
 * @apiName findAllTechnologies
 * @apiGroup Applications
 * @apiPermission Bearer Token. 
 * 
 * @apiDescription Find all technologies for an application
 * @apiExample {curl} Example usage:
 *     curl --request GET --url http://127.0.0.1:8080/api/v1/applications/1/technologies/ --header 'Authorization: Bearer <YOUR TOKEN>'
 *
 * @apiParam (Params) {Number} id Application id.
 * 
 * @apiSuccess (Succes 200) {JSON} technologies Technologies.
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 Id is not a number.
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error.
 */
router.get('/applications/:id/technologies', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.params.id)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let id = req.params.id;
        let headerAuth = req.headers['authorization'];

        return_data = await applications_controller.findAllTechnologies(headerAuth, id);
        return_code = 200;
    } catch (error) {
        log.error('Path', 'Applications', 'GET', '/applications/:id/technologies', error);
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
 * @apiPermission Bearer Token. Need to be an admin.
 *
 * @apiDescription Add an application.
 * 
 * @apiParam (Body) {String} name Application name.
 * @apiParam (Body) {String} description Application description.
 * @apiParam (Body) {String} team Application team.
 * 
 * @apiSuccess (Succes 201) {JSON}  Technology Id.
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 Name empty or null.
 * @apiError (Error 400) {String} 2 Name is not string.
 * @apiError (Error 400) {String} 3 Description empty.
 * @apiError (Error 400) {String} 4 Team empty.
 * @apiError (Error 400) {String} 5 This application with this name already exists.
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error.
 */
router.post('/applications', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.body.name) || _.isUndefined(req.body.description) || _.isUndefined(req.body.team)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let name = req.body.name;
        let description = req.body.description;
        let team = req.body.team;
        let headerAuth = req.headers['authorization'];

        return_data = await applications_controller.add(headerAuth, name, description, team);
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
 * @api {post} /applications/:id/technologies Applications Add Technology
 * @apiVersion 0.0.1
 * @apiName AddTechnology
 * @apiGroup Applications
 * @apiPermission Bearer Token. Need to be an admin.
 *
 * @apiDescription Add an existing technology to an application.
 * 
 * @apiParam (Params) {Number} id Application id.
 * @apiParam (Body) {Number} id Technology id.
 * 
 * @apiSuccess (Succes 201) {JSON}  Technology Technology.
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).

 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error.
 */
router.post('/applications/:id/technologies', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.body.id)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let id_applications = req.params.id;
        let id_technologies = req.body.id;
        let headerAuth = req.headers['authorization'];

        return_data = await applications_controller.addTechnology(headerAuth, id_applications, id_technologies);
        return_code = 201;
    } catch (error) {
        log.error('Path', 'Applications', 'POST', '/applications/:id/technologies', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

/**
 * @api {delete} /applications/:id Applications Delete By Id
 * @apiVersion 0.0.1
 * @apiName Delete
 * @apiGroup Applications
 * @apiPermission Bearer Token. Need to be an admin.
 *
 * @apiExample {curl} Example usage:
 *     curl --request DELETE --url http://127.0.0.1:8080/api/v1/applications/1 --header 'Authorization: Bearer <YOUR TOKEN>'
 * 
 * @apiDescription Delete an application by id.
 * 
 * @apiParam (Params) {String} id Application id.
 * 
 * @apiSuccess (Succes 204) {String} Accepted
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 Id is not a number.
 * @apiError (Error 400) {String} 2 This resource cannot be deleted. It is already in use.
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error.
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

/**
 * @api {post} /applications/:id/technologies Applications Delete Technology
 * @apiVersion 0.0.1
 * @apiName DeleteTechnology
 * @apiGroup Applications
 * @apiPermission Bearer Token. Need to be an admin.
 *
 * @apiDescription Delete an existing technology to an application.
 * 
 * @apiParam (Params) {Number} id Application id.
 * @apiParam (Body) {Number} id Technology id.
 * 
 * @apiSuccess (Succes 201) {JSON}  Technology Technology.
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).

 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error.
 */
router.delete('/applications/:id_applications/technologies/:id_technologies', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.params.id_applications) || _.isUndefined(req.params.id_technologies)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let id_applications = req.params.id_applications;
        let id_technologies = req.params.id_technologies;
        let headerAuth = req.headers['authorization'];

        return_data = await applications_controller.deleteTechnology(headerAuth, id_applications, id_technologies);
        return_code = 204;
    } catch (error) {
        log.error('Path', 'Applications', 'DELETE', '/applications/:id', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }

});


/**
 * @api {put} /applications/:id Applications Update By Id
 * @apiVersion 0.0.1
 * @apiName Update
 * @apiGroup Applications
 * @apiPermission Bearer Token. Need to be an admin.
 *
 * @apiDescription Update an application by id.
 * 
 * @apiParam (Params) {String} id Application id.
 * @apiParam (Body) {String} name Application name.
 * @apiParam (Body) {String} deascription Application deascription.
 * @apiParam (Body) {String} team Application team.
 * 
 * @apiSuccess (Succes 204) {String} Accepted
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 Id is not a number.
 * @apiError (Error 400) {String} 1 Name empty or null.
 * @apiError (Error 400) {String} 2 Name is not string.
 * @apiError (Error 400) {String} 3 This technology with this name already exists.
 * @apiError (Error 403) {String} Auth Forbidden Access.
 * @apiError (Error 500) {String} Internal Database Error.
 */
router.put('/applications/:id', async function (req, res) {
    try {
        var return_code;
        var return_data;

        if (_.isUndefined(req.params.id) || _.isUndefined(req.body.name) 
            || _.isUndefined(req.body.description) || _.isUndefined(req.body.team)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let id = req.params.id;
        let name = req.body.name;
        let description = req.body.description;
        let team = req.body.team;
        let headerAuth = req.headers['authorization'];

        return_data = await applications_controller.updateById(headerAuth, name, description, team, id);
        return_code = 204;
    } catch (error) {
        log.error('Path', 'Applications', 'PUT', '/applications/:id', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});


module.exports = router;