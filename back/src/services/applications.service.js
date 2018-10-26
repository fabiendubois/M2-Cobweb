'use strict'

const applications_repository = require('../repositories/applications.repository');
const applications_technologies_repository = require('../repositories/applications_technologies.repository');
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
 * Find an application by name
 * @param {String} name Application name
 */
exports.findByName = async function (name) {
    try {
        if (_.isEmpty(name)) {
            throw new exception.httpException('name empty or null', 400);
        }

        if (!_.isString(name)) {
            throw new exception.httpException('name is not string', 400);
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
 * Impossible d'ajouter une application qui a le même nom qu'une autre.
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

        let application = await this.findByName(name);
        if(!_.isEmpty(application[0])) {
            throw new exception.httpException('This application with this name already exists.', 400);
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

        /* Est-ce que cette application est utilisée ? */
        let applications_source = await flows_service.findByIdApplicationsSource(id);
        let applications_target = await flows_service.findByIdApplicationsTarget(id);
        if(applications_source[0] !== null || applications_target[0] !== null) {
            throw new exception.httpException('This resource cannot be deleted. It is already in use.', 400);
        }


        return await applications_repository.updateById(name, description, team, id);
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

        let application = await this.findByName(name);
        if(application[0] !== null) {
            throw new exception.httpException('This application with this name already exists.', 400);
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

        return await applications_repository.updateById(name, description, team, id);

    } catch (error) {
        log.error('Service', 'Applications', 'updateById', error);
        throw error;
    }
}