'use strict'

const technologies_repository = require('../repositories/technologies.repository');
const exception = require('../exceptions/http.exception');

const _ = require('lodash');
const bcrypt = require('bcrypt');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Service 
 * Find all technologies.
 */
exports.findAll = async function () {
    try {
        return await technologies_repository.findAll();
    } catch (error) {
        log.error('Service', 'Technologies', 'findAll', error);
        throw error;
    }
}

/**
 * Service 
 * Find technology by id.
 * @param {Number} id Technology id
 */
exports.findById = async function (id) {
    try {
        return await technologies_repository.findById(id);
    } catch (error) {
        log.error('Service', 'Technologies', 'findById', error);
        throw error;
    }
}

/**
 * Service 
 * Add a technology.
 * @param {String} name Technology Name
 */
exports.add = async function (name) {
    try {
        if (_.isEmpty(name)) {
            throw new exception.httpException('name empty or null', 400);
        }

        if (!_.isString(name)) {
            throw new exception.httpException('name is not string', 400);
        }

        /* Est-ce qu'une technologie existe déjà avec ce nom ? */
        let technologie = this.findById(name)
        if (technologie[0] != null) {
            throw new exception.httpException('This technology with this name already exists.', 400);
        }

        return await technologies_repository.add(name);
    } catch (error) {
        log.error('Service', 'Technologies', 'add', error);
        throw error;
    }
}

/**
 * Service 
 * Delete a technology by id.
 * @param {Number} id Id Technology
 */
exports.deleteById = async function (id) {
    try {
        if (_.isEmpty(id)) {
            throw new exception.httpException('id empty or null', 400);
        }

        if (!_.isNaN(id)) {
            throw new exception.httpException('id is not nubmer', 400);
        }

        return await technologies_repository.deleteById(id);
    } catch (error) {
        log.error('Service', 'Technologies', 'deleteById', error);
        throw error;
    }
}