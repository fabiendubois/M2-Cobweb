'use strict'

const pg_tool = require('../tools/pg.tool');
const exception = require('../exceptions/http.exception');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Repository
 * Find all technologies.
 */
exports.findAll = async function () {
    try {
        let request = {
            text: `SELECT * FROM technologies`
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Technologies', 'findAll', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Find a technologie by id.
 * @param {Number} id Technology id
 */
exports.findById = async function (id) {
    try {
        let request = {
            text: `SELECT * FROM technologies WHERE id = $1`,
            values: [id]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Technologies', 'findById', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Find a technology by name.
 * @param {String} name Technology Name 
 */
exports.findByName = async function (name) {
    try {
        let request = {
            text: `SELECT * FROM technologies WHERE name = $1`,
            values: [name]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Technologies', 'findByName', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Add a technology.
 * @param {String} name Technology Name
 */
exports.add = async function (name) {
    try {
        let request = {
            text: `INSERT INTO technologies (name) VALUES($1) RETURNING *`,
            values: [name]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Technologies', 'add', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Delete a Technology by Id
 * @param {Number} id Technology Id
 */
exports.deleteById = async function (id) {
    try {
        let request = {
            text: `DELETE FROM technologies WHERE id = $1`,
            values: [id]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Technologies', 'deleteById', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Update a Technology by Id
 * @param {String} Technology name
 * @param {Number} Technology id
 */
exports.updateById = async function (name, id) {
    try {
        let request = {
            text: `UPDATE technologies SET name = $1 WHERE id = $2`,
            values: [name, id]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Technologies', 'updateById', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}