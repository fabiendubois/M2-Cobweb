'use strict'

const applications_technologies_repository = require('../repositories/applications_technologies.repository');
const applications_repository = require('../repositories/applications.repository');
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
 * Find all applications_technologies.
 */
exports.findAll = async function () {
    try {
        return await applications_technologies_repository.findAll();
    } catch (error) {
        log.error('Service', 'Applications_technologies', 'findAll', error);
        throw error;
    }
}

/**
 * Service 
 * Find an applications_technologies by id.
 * @param {Number} id applications_technologies id
 */
exports.findById = async function (id) {
    try {
        if (isNaN(id)) {
            throw new exception.httpException('id is not number', 400);
        }
        return await applications_technologies_repository.findById(id);
    } catch (error) {
        log.error('Service', 'Applications_technologies', 'findById', error);
        throw error;
    }
}

/**
 * Service 
 * Find all applications_technologies by id_technologies.
 * @param {Number} id_technologies applications_technologies id_technologies
 */
exports.findByIdTechnologies =  async function (id_technologies) {
    try {
        if (_.isEmpty(id_applications)) {
            throw new exception.httpException('id empty or null', 400);
        }

        if (_.isNaN(id_technologies)) {
            throw new exception.httpException('id_technologies is not number', 400);
        }
        return await applications_technologies_repository.findByIdTechnologies(id_technologies);
    } catch (error) {
        log.error('Service', 'Applications_technologies', 'findByIdTechnologies', error);
        throw error;
    }
}

/**
 * Service 
 * Find all applications_technologies by id_applications.
 * @param {Number} id Application id
 */
exports.findByIdApplications = async function (id_applications) {
    try {
        if (_.isEmpty(id_applications)) {
            throw new exception.httpException('id empty or null', 400);
        }

        if (_.isNaN(id_applications)) {
            throw new exception.httpException('id is not number', 400);
        }
        
        return await applications_technologies_repository.findByIdApplications(id_applications);
    } catch (error) {
        log.error('Service', 'Applications_technologies', 'findByIdApplications', error);
        throw error;
    }
}

/**
 * Service 
 * Add an applications_technologies
 * @param {Number} id_application applications_technologies id_application
 * @param {Number} id_technologies applications_technologies id_technologies
 */
exports.add = async function (id_application, id_technologies) {
    try {
        if (isNaN(id_application)) {
            throw new exception.httpException('id_application is not number', 400);
        }

        if (isNaN(id_technologies)) {
            throw new exception.httpException('id_technologies is not number', 400);
        }

        let application = applications_repository.findById(id_application);
        if (application[0] === null) {
            throw new exception.httpException('id_application not exists', 400);
        }

        let technologie = technologies_repository.findById(id_technologies);
        if (technologie[0] === null) {
            throw new exception.httpException('id_technologies not exists', 400);
        }

        return await applications_technologies_repository.add(id_application, id_technologies);
    } catch (error) {
        log.error('Service', 'Applications_technologies', 'add', error);
        throw error;
    }
}

/**
 * Service 
 * Delete an applications_technologies  by id.
 * @param {Number} id applications_technologies id
 */
exports.deleteById = async function (id) {
    try {
        if (isNaN(id)) {
            throw new exception.httpException('id is not number', 400);
        }

        let applications_technologies = this.findById(id);
        if (applications_technologies[0] === null) {
            throw new exception.httpException('applications_technologies not exists', 400);
        }

        return await applications_technologies_repository.deleteById(id);
    } catch (error) {
        log.error('Service', 'Applications_technologies', 'deleteById', error);
        throw error;
    }
}