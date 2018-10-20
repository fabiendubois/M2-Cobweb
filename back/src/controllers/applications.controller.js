'use strict'

const applications_service = require('../services/applications.service');
const user_controller = require('../controllers/users.controller');

const exception = require('../exceptions/http.exception');
const jwt = require('../tools/jwt.tool');

const _ = require('lodash');
const bcrypt = require('bcrypt');

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
        var users_id = jwt.getUserId(headerAuth);

        /* Si l'utilisateur n'existe pas */
        if (_.isUndefined(users_id) || users_id < 0) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        /* Est-ce que l'utilisateur est un admin */
        let isAdmin = await user_controller.isAdmin(users_id);
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
        let isAdmin = await user_controller.isAdmin(users_id);
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
        let isAdmin = await user_controller.isAdmin(users_id);
        if (!isAdmin || isAdmin === null) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        return await applications_service.updateById(name, description, team, id);
    } catch (error) {
        log.error('Controller', 'Applications', 'updateById', error);
        throw error;
    }
}