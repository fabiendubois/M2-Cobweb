'use strict'

const applications_service = require('../services/applications.service');
const applications_technologies_service = require('../services/applications_technologies.service');

const users_service = require('../services/users.service');

const exception = require('../exceptions/http.exception');
const jwt = require('../tools/jwt.tool');

const _ = require('lodash');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Controller 
 * Find all applications.
 * @param {String} headerAuth header authentification
 */
exports.findAll = async function (headerAuth) {
    try {
        var users_id = jwt.getUserId(headerAuth);

        if (_.isUndefined(users_id) || users_id < 0) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        return await applications_service.findAll();
    } catch (error) {
        log.error('Controller', 'Applications', 'findAll', error);
        throw error;
    }
}

/**
 * Controller 
 * Find all technologies for an applications.
 * @param {String} headerAuth header authentification
 * @param {Number} id_applications Application id
 */
exports.findAllTechnologies = async function (headerAuth, id_applications) {
    try {
        var users_id = jwt.getUserId(headerAuth);

        if (_.isUndefined(users_id) || users_id < 0) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        return await applications_technologies_service.findByIdApplications(id_applications);
    } catch (error) {
        log.error('Controller', 'Applications', 'findAll', error);
        throw error;
    }
}

/**
 * Controller 
 * Find an applications by id
 * @param {String} headerAuth header authentification
 * @param {Number} id Application id
 */
exports.findById = async function (headerAuth, id) {
    try {
        var users_id = jwt.getUserId(headerAuth);

        if (_.isUndefined(users_id) || users_id < 0) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        return await applications_service.findById(id);
    } catch (error) {
        log.error('Controller', 'Applications', 'findById', error);
        throw error;
    }
}

/**
 * Controller 
 * Add an application.
 * @param {String} headerAuth header authentification
 * @param {String} name Application name
 * @param {String} description Application description
 * @param {String} team Application team
 */
exports.add = async function (headerAuth, name, description, team) {
    try {
        let users_id = jwt.getUserId(headerAuth);

        /* Si l'utilisateur n'existe pas */
        if (_.isUndefined(users_id) || users_id < 0) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        /* Est-ce que l'utilisateur est un admin */
        let isAdmin = await users_service.isAdmin(users_id);
        if (!isAdmin || isAdmin === null) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        return await applications_service.add(name, description, team);
    } catch (error) {
        log.error('Controller', 'Applications', 'add', error);
        throw error;
    }
}

/**
 * Controller
 * Add a technology to this application
 * @param {String} headerAuth header authentification
 * @param {Number} id_applications Application id
 * @param {Number} id_technologies Technology id
 */
exports.addTechnology = async function (headerAuth, id_applications, id_technologies){
    try {
        var users_id = jwt.getUserId(headerAuth);

        /* Si l'utilisateur n'existe pas */
        if (_.isUndefined(users_id) || users_id < 0) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        /* Est-ce que l'utilisateur est un admin */
        let isAdmin = await users_service.isAdmin(users_id);
        if (!isAdmin || isAdmin === null) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        return await applications_technologies_service.add(id_applications, id_technologies);
    } catch (error) {
        log.error('Controller', 'Applications', 'addTechnologies', error);
        throw error;
    }
}

/**
 * Controller 
 * Delete an application by id.
 * @param {String} headerAuth header authentification
 * @param {Number} id Application id
 */
exports.deleteById = async function (headerAuth, id) {
    try {
        var users_id = jwt.getUserId(headerAuth);

        /* Si l'utilisateur n'existe pas */
        if (_.isUndefined(users_id) || users_id < 0) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        /* Est-ce que l'utilisateur est un admin */
        let isAdmin = await users_service.isAdmin(users_id);
        if (!isAdmin || isAdmin === null) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        return await applications_service.deleteById(id);
    } catch (error) {
        log.error('Controller', 'Applications', 'deleteById', error);
        throw error;
    }
}

/**
 * Controller
 * Delete a technology from this application
 * @param {String} headerAuth header authentification
 * @param {Number} id_applications Application id
 * @param {Number} id_technologies Technology id 
 */
exports.deleteTechnology = async function (headerAuth, id_applications, id_technologies){
    try {
        var users_id = jwt.getUserId(headerAuth);

        /* Si l'utilisateur n'existe pas */
        if (_.isUndefined(users_id) || users_id < 0) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        /* Est-ce que l'utilisateur est un admin */
        let isAdmin = await users_service.isAdmin(users_id);
        if (!isAdmin || isAdmin === null) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        return await applications_technologies_service.delete(id_applications, id_technologies);
    } catch (error) {
        log.error('Controller', 'Applications', 'deleteTechnology', error);
        throw error;
    }
}

/**
 * Controller
 * Update an application by id.
 * @param {String} headerAuth header authentification
 * @param {String} name Application name
 * @param {String} description Application description
 * @param {String} team Application team
 * @param {Number} id Application id
 */
exports.updateById = async function(headerAuth, name, description, team, id) {
    try {
        var users_id = jwt.getUserId(headerAuth);

        /* Si l'utilisateur n'existe pas */
        if (_.isUndefined(users_id) || users_id < 0) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        /* Est-ce que l'utilisateur est un admin */
        let isAdmin = await users_service.isAdmin(users_id);
        if (!isAdmin || isAdmin === null) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        return await applications_service.updateById(name, description, team, id);
    } catch (error) {
        log.error('Controller', 'Applications', 'updateById', error);
        throw error;
    }
}