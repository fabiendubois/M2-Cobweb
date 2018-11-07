'use strict'

const technologies_repository = require('../repositories/technologies.repository');
const flows_technologies_service = require('./flows_technologies.service');
const applications_technologies_service = require('./applications_technologies.service');

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
 * Find a technology by id.
 * @param {Number} id Technology id
 */
exports.findById = async function (id) {
    try {
        if (isNaN(id)) {
            throw new exception.httpException('id is not number', 400);
        }
        return await technologies_repository.findById(id);
    } catch (error) {
        log.error('Service', 'Technologies', 'findById', error);
        throw error;
    }
}

/**
 * Service 
 * Find a technology by name.
 * @param {String} name Technology name
 */
exports.findByName = async function (name) {
    try {
        if (_.isEmpty(name)) {
            throw new exception.httpException('name empty or null', 400);
        }

        if (!_.isString(name)) {
            throw new exception.httpException('name is not string', 400);
        }
        return await technologies_repository.findByName(name);
    } catch (error) {
        log.error('Service', 'Technologies', 'findByName', error);
        throw error;
    }
}

/**
 * Service 
 * Add a technology.
 * @param {String} name Technology name
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
        let technologie_findByName = await this.findByName(name);
        if (!_.isEmpty(technologie_findByName[0])) {
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

        if (_.isNaN(id)) {
            throw new exception.httpException('id is not number', 400);
        }

        /* Est-ce que cette technologie est utilisée ? */
        let flows_technologies = await flows_technologies_service.findByIdTechnologies(id);
        let applications_technologies = await applications_technologies_service.findByIdTechnologies(id);
        if(flows_technologies[0] !== null || applications_technologies[0] !== null) {
            throw new exception.httpException('This resource cannot be deleted. It is already in use.', 400);
        }

        return await technologies_repository.deleteById(id);
    } catch (error) {
        log.error('Service', 'Technologies', 'deleteById', error);
        throw error;
    }
}

/**
 * Service 
 * Update a technology by id.
 * @param {String} name Technology name.
 * @param {Number} id Technology id.
 */
exports.updateById = async function (name, id) {
    try {
        if (_.isEmpty(id)) {
            throw new exception.httpException('id empty or null', 400);
        }

        if (_.isNaN(id)) {
            throw new exception.httpException('id is not number', 400);
        }

        if (_.isEmpty(name)) {
            throw new exception.httpException('name empty or null', 400);
        }

        if (!_.isString(name)) {
            throw new exception.httpException('name is not string', 400);
        }

        /* Est-ce que cette technologie existe bien avec cet id ? */
        let technologie_findById = await this.findById(id);
        if (technologie_findById[0] === null) {
            throw new exception.httpException('This technology with this id not exists.', 400);
        }

        /* Est-ce qu'une technologie existe déjà avec ce nom ? */
        let technologie_findByName = await this.findByName(name);
        if (!_.isEmpty(technologie_findByName[0]) && name !== technologie_findById[0].name) {
            throw new exception.httpException('This technology with this name already exists.', 400);
        }

        return await technologies_repository.updateById(name, id);
    } catch (error) {
        log.error('Service', 'Technologies', 'updateById', error);
        throw error;
    }
}