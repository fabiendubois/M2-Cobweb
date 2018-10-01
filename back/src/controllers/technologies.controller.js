'use strict'

const technologies_service = require('../services/technologies.service');
const user_controller = require('./users.controller');
const users_service = require('../services/users.service');

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
 * Find all technologies.
 * @param {String} headerAuth header authentification
 */
exports.findAll = async function (headerAuth) {
    try {
        var users_id = jwt.getUserId(headerAuth);

        if (_.isUndefined(users_id) || users_id < 0) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        return await technologies_service.findAll();
    } catch (error) {
        log.error(error);
        throw error;
    }
}

/**
 * Controller 
 * Add a technology.
 * @param {String} headerAuth header authentification
 * @param {String} name Technology name
 */
exports.add = async function (headerAuth, name) {
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

        return await technologies_service.add(name);
    } catch (error) {
        log.error(error);
        throw error;
    }
}

/**
 * Controller
 * Delete a technology by id.
 * @param {String} headerAuth header authentification
 * @param {Number} id Technology id
 */
exports.deleteById = async function (headerAuth, id) {
    try {
        var users_id = jwt.getUserId(headerAuth);

        if (_.isUndefined(users_id) || users_id < 0) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        /* Est-ce que l'utilisateur est un admin */
        let isAdmin = await user_controller.isAdmin(users_id);
        if (!isAdmin || isAdmin === null) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        return await technologies_service.deleteById(id);
    } catch (error) {
        log.error(error);
        throw error;
    }
}