'use strict'

const flows_service = require('../services/flows.service');
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
 * Find a flow.
 * @param {String} headerAuth header authentification
 */
exports.findAll = async function (headerAuth) {
    try {
        var users_id = jwt.getUserId(headerAuth);

        if (_.isUndefined(users_id) || users_id < 0) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        return await flows_service.findAll();
    } catch (error) {
        log.error('Controller', 'Flows', 'findAll', error);
        throw error;
    }
}

/**
 * Controller 
 * Find a flow by id
 * @param {String} headerAuth header authentification
 * @param {Number} id Flow id
 */
exports.findById = async function (headerAuth, id) {
    try {
        var users_id = jwt.getUserId(headerAuth);

        if (_.isUndefined(users_id) || users_id < 0) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        return await flows_service.findById(id);
    } catch (error) {
        log.error('Controller', 'Flows', 'findById', error);
        throw error;
    }
}

/**
 * Controller 
 * Add a flow.
 * @param {String} headerAuth header authentification
 * @param {String} name Flow name
 * @param {String} description Flow description
 * @param {Number} id_applications_source Flows id_applications_source
 * @param {Number} id_applications_target Flows id_applications_target
 * @param {Number} id_users Flows id_users
 */
exports.add = async function (headerAuth, name, description, id_applications_source, id_applications_target, id_users) {
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

        return await flows_service.add(name, description, id_applications_source, id_applications_target, id_users);
    } catch (error) {
        log.error('Controller', 'Flows', 'add', error);
        throw error;
    }
}

/**
 * Controller 
 * Delete a flow by id.
 * @param {String} headerAuth header authentification
 * @param {Number} id Flow id
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

        return await flows_service.deleteById(id);
    } catch (error) {
        log.error('Controller', 'Flows', 'deleteById', error);
        throw error;
    }
}