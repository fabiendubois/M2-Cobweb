'use strict'

const applications_repository = require('../repositories/applications.repository');
const exception = require('../exceptions/http.exception');

const _ = require('lodash');
const bcrypt = require('bcrypt');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Service 
 * Find all applications.
 */
exports.findAll = async function () {
    try {
        return await applications_repository.findAll();
    } catch (error) {
        log.error('Service', 'Applications', 'findAll', error);
        throw error;
    }
}

/**
 * Service 
 * Find an application by id.
 * @param {Number} id Application id
 */
exports.findById = async function (id) {
    try {
        if (isNaN(id)) {
            throw new exception.httpException('id is not number', 400);
        }
        return await applications_repository.findById(id);
    } catch (error) {
        log.error('Service', 'Applications', 'findById', error);
        throw error;
    }
}

/**
 * Service 
 * Add an application.
 * @param {String} name Application name
 * @param {String} description Application description
 * @param {String} team Application team
 */
exports.add = async function (name, description, team) {
    try {
        if (_.isEmpty(name)) {
            throw new exception.httpException('name empty or null', 400);
        }

        if (!_.isString(name)) {
            throw new exception.httpException('name is not string', 400);
        }

        if (description !== null) {
            if (_.isEmpty(description)) {
                throw new exception.httpException('description empty', 400);
            }
            if (!_.isString(description)) {
                throw new exception.httpException('description is not string', 400);
            }
        } else {
            description = null;
        }

        if (team !== null) {
            if (_.isEmpty(team)) {
                throw new exception.httpException('team empty', 400);
            }
            if (!_.isString(team)) {
                throw new exception.httpException('team is not string', 400);
            }
        } else {
            team = null;
        }

        return await applications_repository.add(name, description, team);
    } catch (error) {
        log.error('Service', 'Applications', 'add', error);
        throw error;
    }
}

/**
 * Service 
 * Delete an application by id.
 * @param {Number} id Application id
 */
exports.deleteById = async function (id) {
    try {
        if (_.isEmpty(id)) {
            throw new exception.httpException('id empty or null', 400);
        }

        if (_.isNaN(id)) {
            throw new exception.httpException('id is not number', 400);
        }

        return await applications_repository.deleteById(id);
    } catch (error) {
        log.error('Service', 'Applications', 'deleteById', error);
        throw error;
    }
}