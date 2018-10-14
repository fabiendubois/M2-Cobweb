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
 * Find a flow  by id.
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
 * Add a flow.
 * @param {String} name Flow name
 * @param {String} description Flow description
 * @param {Number} id_applications_source Flows id_applications_source
 * @param {Number} id_applications_target Flows id_applications_target
 * @param {Number} id_users Flows id_users  
 */
exports.add = async function (name, description, id_applications_source, id_applications_target, id_users) {
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

        if (isNaN(id_users)) {
            throw new exception.httpException('id_users is not number', 400);
        }


        let applications_source = applications_recpository.findById(id_applications_source);
        if (applications_source[0] === null) {
            throw new exception.httpException('id_applications_source not exists', 400);
        }

        let applications_target = applications_recpository.findById(id_applications_target);
        if (applications_target[0] === null) {
            throw new exception.httpException('id_applications_target not exists', 400);
        }

        let users = users_repository.findById(id_users);
        if (users[0] === null) {
            throw new exception.httpException('id_users not exists', 400);
        }

        return await flows_repository.add(name, description, id_applications_source, id_applications_target, id_users);
    } catch (error) {
        log.error('Service', 'Flows', 'add', error);
        throw error;
    }
}

/**
 * Service 
 * Delete a flow  by id.
 * @param {Number} id Flow id
 */
exports.deleteById = async function (id) {
    try {
        if (isNaN(id)) {
            throw new exception.httpException('id is not number', 400);
        }

        let flow = this.findById(id);
        if (flow[0] === null) {
            throw new exception.httpException('flow not exists', 400);
        }

        return await flows_repository.deleteById(id);
    } catch (error) {
        log.error('Service', 'Flows', 'deleteById', error);
        throw error;
    }
}