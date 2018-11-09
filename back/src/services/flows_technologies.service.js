'use strict'

const flows_technologies_repository = require('../repositories/flows_technologies.repository');
const flows_repository = require('../repositories/flows.repository');
const technologies_repository = require('../repositories/technologies.repository');

const exception = require('../exceptions/http.exception');

const _ = require('lodash');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Service 
 * Find all flows_technologies.
 */
exports.findAll = async function () {
    try {
        return await flows_technologies_repository.findAll();
    } catch (error) {
        log.error('Service', 'Flows_technologies', 'findAll', error);
        throw error;
    }
}

/**
 * Service 
 * Find a flows_technologies  by id.
 * @param {Number} id Flows_technologies id
 */
exports.findById = async function (id) {
    try {
        if (isNaN(id)) {
            throw new exception.httpException('id is not number', 400);
        }
        return await flows_technologies_repository.findById(id);
    } catch (error) {
        log.error('Service', 'Flows_technologies', 'findById', error);
        throw error;
    }
}

/**
 * Service 
 * Find a flows_technologies  by id_technologies.
 * @param {Number} id_technologies Flows_technologies id_technologies
 */
exports.findByIdTechnologies =  async function (id_technologies) {
    try {
        if (isNaN(id_technologies)) {
            throw new exception.httpException('id_technologies is not number', 400);
        }
        return await flows_technologies_repository.findByIdTechnologies(id_technologies);
    } catch (error) {
        log.error('Service', 'Flows_technologies', 'findByIdTechnologies', error);
        throw error;
    }
}

/**
 * Service 
 * Add a flows_technologies
 * @param {Number} ordering Flows_technologies ordering
 * @param {Number} id_flows Flows_technologies id_flows
 * @param {Number} id_technologies Flows_technologies id_technologies
 */
exports.add = async function (ordering, id_flows, id_technologies) {
    try {
        if (isNaN(ordering)) {
            throw new exception.httpException('ordering is not number', 400);
        }

        if (isNaN(id_flows)) {
            throw new exception.httpException('id_flows is not number', 400);
        }

        if (isNaN(id_technologies)) {
            throw new exception.httpException('id_technologies is not number', 400);
        }

        let flow = flows_repository.findById(id_flows);
        if (flow[0] === null) {
            throw new exception.httpException('id_flows not exists', 400);
        }

        let technologie = technologies_repository.findById(id_technologies);
        if (technologie[0] === null) {
            throw new exception.httpException('id_technologies not exists', 400);
        }

        return await flows_technologies_repository.add(ordering, id_flows, id_technologies);
    } catch (error) {
        log.error('Service', 'Flows_technologies', 'add', error);
        throw error;
    }
}

/**
 * Service 
 * Delete a flows_technologies  by id.
 * @param {Number} id Flows_technologies id
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

        return await flows_technologies_repository.deleteById(id);
    } catch (error) {
        log.error('Service', 'Flows_technologies', 'deleteById', error);
        throw error;
    }
}