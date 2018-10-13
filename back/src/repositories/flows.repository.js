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