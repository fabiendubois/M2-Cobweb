'use strict'

const pg_tool = require('../tools/pg.tool');
const exception = require('../exceptions/http.exception');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Repository
 * Find all flows.
 */
exports.findAll = async function () {
    try {
        let request = {
            text: `SELECT * FROM flows`
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Flows', 'findAll', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Find a flow by id.
 * @param {Number} id Flows id
 */
exports.findById = async function (id) {
    try {
        let request = {
            text: `SELECT * FROM flows WHERE id = $1`,
            values: [id]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Flows', 'findById', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Find a flow by name.
 * @param {Number} name Flows name
 */
exports.findByName = async function (name) {
    try {
        let request = {
            text: `SELECT * FROM flows WHERE name = $1`,
            values: [name]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Flows', 'findByName', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Add a flow
 * @param {String} name Flow name
 * @param {String} description Flow description
 * @param {Number} id_applications_source Flows id_applications_source
 * @param {Number} id_applications_target Flows id_applications_target
 */
exports.add = async function (name, description, id_applications_source, id_applications_target, ) {
    try {
        let request = {
            text: `INSERT INTO flows (name, description, id_applications_source, id_applications_target) VALUES($1, $2, $3, $4) RETURNING *`,
            values: [name, description, id_applications_source, id_applications_target]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Flows', 'add', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Delete a flow by id.
 * @param {Number} id Flows id
 */
exports.deleteById = async function (id) {
    try {
        let request = {
            text: `DELETE FROM flows WHERE id = $1`,
            values: [id]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Flows', 'deleteById', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Update a flow by id.
 * @param {String} name Flow name
 * @param {String} description Flow description
 * @param {Number} id_applications_source Flows id_applications_source
 * @param {Number} id_applications_target Flows id_applications_target
 * @param {Number} id Flow id
 */
exports.updateById = async function (name, description, id_applications_source, id_applications_target, id) {
    try {
        let request = {
            text: `UPDATE flows SET name = $1, description = $2, id_applications_source = $3, id_applications_target = $4 WHERE id = $5`,
            values: [name, description, id_applications_source, id_applications_target, id]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Flows', 'updateById', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}