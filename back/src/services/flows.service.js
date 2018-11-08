'use strict'

const flows_repository = require('../repositories/flows.repository');
const applications_recpository = require('../repositories/applications.repository');
const users_repository = require('../repositories/users.repository');

const exception = require('../exceptions/http.exception');

const _ = require('lodash');
const bcrypt = require('bcrypt');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Service 
 * Find all flows.
 */
exports.findAll = async function () {
    try {
        return await flows_repository.findAll();
    } catch (error) {
        log.error('Service', 'Flows', 'findAll', error);
        throw error;
    }
}

/**
 * Service 
 * Find a flow by id.
 * @param {Number} id Flow id
 */
exports.findById = async function (id) {
    try {
        if (isNaN(id)) {
            throw new exception.httpException('id is not number', 400);
        }
        return await flows_repository.findById(id);
    } catch (error) {
        log.error('Service', 'Flows', 'findById', error);
        throw error;
    }
}

/**
 * Service 
 * Find a flow by name.
 * @param {String} name Flow name
 */
exports.findByName = async function (name) {
    try {
        if (_.isEmpty(name)) {
            throw new exception.httpException('name empty or null', 400);
        }

        if (!_.isString(name)) {
            throw new exception.httpException('name is not string', 400);
        }

        return await flows_repository.findByName(name);
    } catch (error) {
        log.error('Service', 'Flows', 'findByName', error);
        throw error;
    }
}

/**
 * Service 
 * Add a flow.
 * @param {String} name Flow name
 * @param {String} description Flow description
 * @param {Number} id_applications_source Flows id_applications_source
 * @param {Number} id_applications_target Flows id_applications_target
 */
exports.add = async function (name, description, id_applications_source, id_applications_target) {
    try {
        if (_.isEmpty(name)) {
            throw new exception.httpException('name empty or null', 400);
        }

        if (!_.isString(name)) {
            throw new exception.httpException('name is not string', 400);
        }

        if (_.isEmpty(description)) {
            throw new exception.httpException('description empty or null', 400);
        }

        if (!_.isString(description)) {
            throw new exception.httpException('description is not string', 400);
        }

        if (isNaN(id_applications_source)) {
            throw new exception.httpException('id_applications_source is not number', 400);
        }

        if (isNaN(id_applications_target)) {
            throw new exception.httpException('id_applications_target is not number', 400);
        }

        /* Est-ce que l'application source existe ? */
        let applications_source = await applications_recpository.findById(id_applications_source);
        if (_.isEmpty(applications_source[0])) {
            throw new exception.httpException('id_applications_source not exists', 400);
        }

        /* Est-ce que l'application target existe ? */
        let applications_target = await applications_recpository.findById(id_applications_target);
        if (_.isEmpty(applications_target[0])) {
            throw new exception.httpException('id_applications_target not exists', 400);
        }

        /* Est-ce qu'un flow avec ce nom existe déjà ? */
        let flow = await this.findByName(name);
        if (!_.isEmpty(flow[0])) {
            throw new exception.httpException('A flow with this name exists', 400);
        }

        return await flows_repository.add(name, description, id_applications_source, id_applications_target);
    } catch (error) {
        log.error('Service', 'Flows', 'add', error);
        throw error;
    }
}

/**
 * Service 
 * Delete a flow by id.
 * @param {Number} id Flow id
 */
exports.deleteById = async function (id) {
    try {
        if (isNaN(id)) {
            throw new exception.httpException('id is not number', 400);
        }

        let flow = await this.findById(id);
        if (_.isEmpty(flow[0])) {
            throw new exception.httpException('flow not exists', 400);
        }

        return await flows_repository.deleteById(id);
    } catch (error) {
        log.error('Service', 'Flows', 'deleteById', error);
        throw error;
    }
}

/**
 * Service 
 * Update a flow by id.
 * @param {String} name Flow name
 * @param {String} description Flow description
 * @param {Number} id_applications_source Flows id_applications_source
 * @param {Number} id_applications_target Flows id_applications_target
 * @param {Number} id Flow id
 */
exports.updateById = async function (name, description, id_applications_source, id_applications_target, id) {
    try {
        if (_.isEmpty(name)) {
            throw new exception.httpException('name empty or null', 400);
        }

        if (!_.isString(name)) {
            throw new exception.httpException('name is not string', 400);
        }

        if (_.isEmpty(description)) {
            throw new exception.httpException('description empty or null', 400);
        }

        if (!_.isString(description)) {
            throw new exception.httpException('description is not string', 400);
        }

        if (isNaN(id_applications_source)) {
            throw new exception.httpException('id_applications_source is not number', 400);
        }

        if (isNaN(id_applications_target)) {
            throw new exception.httpException('id_applications_target is not number', 400);
        }

        /* Est-ce que l'application source existe ? */
        let applications_source = await applications_recpository.findById(id_applications_source);
        if (_.isEmpty(applications_source[0])) {
            throw new exception.httpException('id_applications_source not exists', 400);
        }

        /* Est-ce que l'application target existe ? */
        let applications_target = await applications_recpository.findById(id_applications_target);
        if (_.isEmpty(applications_target[0])) {
            throw new exception.httpException('id_applications_target not exists', 400);
        }

        if (isNaN(id)) {
            throw new exception.httpException('id is not number', 400);
        }

        let flow_findById= await this.findById(id);
        if (_.isEmpty(flow_findById[0])) {
            throw new exception.httpException('flow not exists', 400);
        }

        /* Est-ce qu'un flow avec ce nom existe déjà (sauf si c'est le même nom) ? */
        let flow_findByName = await this.findByName(name);
        if (!_.isEmpty(flow_findByName[0]) && flow_findByName[0].nom !== flow_findById[0].nom) {
            throw new exception.httpException('A flow with this name already exists', 400);
        }

        return await flows_repository.updateById(name, description, id_applications_source, id_applications_target, id);
    } catch (error) {
        log.error('Service', 'Flows', 'updateById', error);
        throw error;
    }
}
