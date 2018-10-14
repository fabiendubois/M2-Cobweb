'use strict'

const pg_tool = require('../tools/pg.tool');
const exception = require('../exceptions/http.exception');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Repository
 * Find all flows_technologies.
 */
exports.findAll = async function () {
    try {
        let request = {
            text: `SELECT * FROM flows_technologies`
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Flows_technologies', 'findAll', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Find a flows_technologies by id.
 * @param {Number} id flows_technologies id
 */
exports.findById = async function (id) {
    try {
        let request = {
            text: `SELECT * FROM flows_technologies WHERE id = $1`,
            values: [id]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Flows_technologies', 'findById', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}


/**
 * Repository
 * Add a flows_technologies
 * @param {Number} ordering Flows_technologies ordering
 * @param {Number} id_flows Flows_technologies id_flows
 * @param {Number} id_technologies Flows_technologies id_technologies
 */
exports.add = async function (ordering, id_flows, id_technologies) {
    try {
        let request = {
            text: `INSERT INTO flows_technologies (ordering, id_flows, id_technologies) VALUES($1, $2, $3) RETURNING *`,
            values: [ordering, id_flows, id_technologies]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Flows_technologies', 'add', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Delete a flows_technologies by id.
 * @param {Number} id Flows_technologies id
 */
exports.deleteById = async function (id) {
    try {
        let request = {
            text: `DELETE FROM flows_technologies WHERE id = $1`,
            values: [id]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Flows_technologies', 'deleteById', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}