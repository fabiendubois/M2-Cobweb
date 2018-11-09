'use strict'

const applications_repository = require('../repositories/applications.repository');
const exception = require('../exceptions/http.exception');

const _ = require('lodash');

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
            throw new exception.httpException('This param : id, is not a number.', 400);
        }
        return await applications_repository.findById(id);
    } catch (error) {
        log.error('Service', 'Applications', 'findById', error);
        throw error;
    }
}

/**
 * Service
 * Find an application by name
 * @param {String} name Application name
 */
exports.findByName = async function (name) {
    try {
        if (_.isEmpty(name)) {
            throw new exception.httpException('This param : name, is empty or null.', 400);
        }

        if (!_.isString(name)) {
            throw new exception.httpException('This param : name, is not a string.', 400);
        }

        return await applications_repository.findByName(name);
    } catch (error) {
        log.error('Service', 'Applications', 'findByName', error);
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
            throw new exception.httpException('This param : name, is empty or null.', 400);
        }

        if (!_.isString(name)) {
            throw new exception.httpException('This param : name, is not a string.', 400);
        }

        let application = await this.findByName(name);
        if(!_.isEmpty(application[0])) {
            throw new exception.httpException('This application with this name already exists.', 400);
        }

        if (description !== null) {
            if (_.isEmpty(description)) {
                throw new exception.httpException('This param : description, is empty.', 400);
            }
            if (!_.isString(description)) {
                throw new exception.httpException('This param : description, is not a string.', 400);
            }
        } else {
            description = null;
        }

        if (team !== null) {
            if (_.isEmpty(team)) {
                throw new exception.httpException('This param : name, is empty.', 400);
            }
            if (!_.isString(team)) {
                throw new exception.httpException('This param : team, is not a string.', 400);
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
        if (isNaN(id)) {
            throw new exception.httpException('This param : id, is not a number.', 400);
        }

        /* Est-ce que cette application est utilisée ? */
        let applications_source = await flows_service.findByIdApplicationsSource(id);
        let applications_target = await flows_service.findByIdApplicationsTarget(id);
        if(!_.isEmpty(applications_source[0]) || !_.isEmpty(applications_target[0])) {
            throw new exception.httpException('This resource cannot be deleted. It is already in use.', 400);
        }

        return await applications_repository.deleteById(id);
    } catch (error) {
        log.error('Service', 'Applications', 'deleteById', error);
        throw error;
    }
}

/**
 * Service
 * Update an application by id.
 * Impossible de mettre à jour une application qui a le même nom qu'une autre.
 * @param {String} headerAuth header authentification
 * @param {String} name Application name
 * @param {String} description Application description
 * @param {String} team Application team
 * @param {Number} id Application id
 */
exports.updateById = async function (name, description, team, id) {
    try {
        if (isNaN(id)) {
            throw new exception.httpException('This param : id, is not a number.', 400);
        }

        if (_.isEmpty(name)) {
            throw new exception.httpException('This param : name, is empty or null.', 400);
        }

        if (!_.isString(name)) {
            throw new exception.httpException('This param : name, is not a string.', 400);
        }

        let application_findById = await this.findById(id);
        if(_.isEmpty(application_findById[0])) {
            throw new exception.httpException('This application with this id not exists.', 400);
        }


        /* Est-ce qu'une application avec ce nom existe déjà ? */
        let application_findByName = await this.findByName(name);
        if(!_.isEmpty(application_findByName[0]) && name !== application_findById[0].name ) {
            throw new exception.httpException('This application with this name already exists.', 400);
        }

        if (description !== null) {
            if (_.isEmpty(description)) {
                throw new exception.httpException('This param : description, is empty.', 400);
            }
            if (!_.isString(description)) {
                throw new exception.httpException('This param : description, is not a string.', 400);
            }
        } else {
            description = null;
        }

        if (team !== null) {
            if (_.isEmpty(team)) {
                throw new exception.httpException('This param : name, is empty.', 400);
            }
            if (!_.isString(team)) {
                throw new exception.httpException('This param : team, is not a string.', 400);
            }
        } else {
            team = null;
        }

        return await applications_repository.updateById(name, description, team, id);
    } catch (error) {
        log.error('Service', 'Applications', 'updateById', error);
        throw error;
    }
}