'use strict'

const applications_technologies_repository = require('../repositories/applications_technologies.repository');
const applications_repository = require('../repositories/applications.repository');
const technologies_repository = require('../repositories/technologies.repository');

const exception = require('../exceptions/http.exception');

const _ = require('lodash');

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
exports.findByIdTechnologies = async function (id_technologies) {
    try {
        if (isNaN(id_technologies)) {
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
 * @param {Number} id_applications Application id
 */
exports.findByIdApplications = async function (id_applications) {
    try {
        if (isNaN(id_applications)) {
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
 * Find all applications_technologies by id_applications and id_technologies.
 * @param {Number} id_applications Application id
 * @param {Number} id_technologies Technology id
 */
exports.findByIdApplicationsAndIdTechnologies = async function (id_applications, id_technologies) {
    try {
        if (isNaN(id_applications)) {
            throw new exception.httpException('id_applications is not number', 400);
        }

        if (isNaN(id_technologies)) {
            throw new exception.httpException('id_technologies is not number', 400);
        }

        return await applications_technologies_repository.findByIdApplicationsAndIdTechnologies(id_applications, id_technologies);
    } catch (error) {
        log.error('Service', 'Applications_technologies', 'findByIdApplicationsAndIdTechnologies', error);
        throw error;
    }
}

/**
 * Service 
 * Add an applications_technologies
 * @param {Number} id_applications applications_technologies id_applications
 * @param {Number} id_technologies applications_technologies id_technologies
 */
exports.add = async function (id_applications, id_technologies) {
    try {
        if (isNaN(id_applications)) {
            throw new exception.httpException('id_applications is not number', 400);
        }

        if (isNaN(id_technologies)) {
            throw new exception.httpException('id_technologies is not number', 400);
        }

        let application = await applications_repository.findById(id_applications);
        if (_.isEmpty(application[0])) {
            throw new exception.httpException('id_applications not exists', 400);
        }

        let technologie = await technologies_repository.findById(id_technologies);
        if (_.isEmpty(technologie[0])) {
            throw new exception.httpException('id_technologies not exists', 400);
        }

        /* Est ce que cette technologie est déjà associée à cette application ? */
        let applications_technologies = await this.findByIdApplicationsAndIdTechnologies(id_applications, id_technologies);
        if (!_.isEmpty(applications_technologies[0])) {
            throw new exception.httpException('This technology is always bind with this application', 400);
        }

        return await applications_technologies_repository.add(id_applications, id_technologies);
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

/**
 * Service 
 * Delete an applications_technologies by id_applications and id_technologies.
 * @param {Number} id_applications applications_technologies id_applications
 * @param {Number} id_technologies applications_technologies id_technologies
 */
exports.deleteByIdApplicationsAndIdTechnologies = async function (id_applications, id_technologies) {
    try {
        if (isNaN(id_applications)) {
            throw new exception.httpException('id_applications is not number', 400);
        }

        if (isNaN(id_technologies)) {
            throw new exception.httpException('id_technologies is not number', 400);
        }

        return await applications_technologies_repository.deleteByIdApplicationsAndIdTechnologies(id_applications, id_technologies);
    } catch (error) {
        log.error('Service', 'Applications_technologies', 'deleteByIdApplicationsAndIdTechnologies', error);
        throw error;
    }
}

/**
 * Service 
 * Delete an applications_technologies by id_applications
 * @param {Number} id_applications applications_technologies id_applications
 */
exports.deleteByIdApplications = async function (id_applications) {
    try {
        if (isNaN(id_applications)) {
            throw new exception.httpException('id_applications is not number', 400);
        }

        return await applications_technologies_repository.deleteByIdApplications(id_applications);
    } catch (error) {
        log.error('Service', 'Applications_technologies', 'deleteByIdApplications', error);
        throw error;
    }
}