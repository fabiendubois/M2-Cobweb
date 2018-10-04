'use strict'

const pg_tool = require('../tools/pg.tool');
const exception = require('../exceptions/http.exception');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Repository
 * Find all applications.
 */
exports.findAll = async function () {
    try {
        let request = {
            text: `SELECT * FROM applications`
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Applications', 'findAll', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Find an application by id.
 * @param {Number} id Application id
 */
exports.findById = async function (id) {
    try {
        let request = {
            text: `SELECT * FROM applications WHERE id = $1`,
            values: [id]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Applications', 'findById', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Add an application.
 * @param {String} name Application Name
 * @param {Number} id_technologies Technologies Id
 */
exports.add = async function (name, id_technologies) {
    try {
        let request = {
            text: `INSERT INTO applications (name, id_technologies) VALUES($1, $2) RETURNING *`,
            values: [name, id_technologies]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Applications', 'add', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Delete an application by id.
 * @param {Number} id Application id
 */
exports.deleteById = async function (id) {
    try {
        let request = {
            text: `DELETE FROM applications WHERE id = $1`,
            values: [id]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Applications', 'deleteById', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}