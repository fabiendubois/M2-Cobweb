'use strict'

const applications_repository = require('../repositories/applications.repository');
const technologies_service = require('../services/technologies.service');
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
 * @param {Number} id_technologies Technology Id
 */
exports.add = async function (name, id_technologies) {
    try {
        if (_.isEmpty(name)) {
            throw new exception.httpException('name empty or null', 400);
        }

        if (isNaN(id_technologies)) {
            throw new exception.httpException('id is not number', 400);
        }

        if (!_.isString(name)) {
            throw new exception.httpException('name is not string', 400);
        }

        /* Est-ce qu'une technologie existe avec cet id_technologies ? */
        let technologie = technologies_service.findById(id_technologies)
        if (technologie[0] === null) {
            throw new exception.httpException('This technology with this id not exists.', 400);
        }

        return await applications_repository.add(name, id_technologies);
    } catch (error) {
        log.error('Service', 'Technologies', 'add', error);
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