'use strict'

const pg_tool = require('../tools/pg.tool');
const exception = require('../exceptions/http.exception');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Repository
 * Find all applications_technologies.
 */
exports.findAll = async function () {
    try {
        let request = {
            text: `SELECT * FROM applications_technologies`
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Applications_technologies', 'findAll', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Find an applications_technologies by id.
 * @param {Number} id applications_technologies id
 */
exports.findById = async function (id) {
    try {
        let request = {
            text: `SELECT * FROM applications_technologies WHERE id = $1`,
            values: [id]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Applications_technologies', 'findById', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository 
 * Find an applications_technologies by id_technologies.
 * @param {Number} id_technologies applications_technologies id_technologies
 */
exports.findByIdTechnologies = async function (id_technologies) {
    try {
        let request = {
            text: `SELECT * FROM applications_technologies WHERE id_technologies = $1`,
            values: [id_technologies]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Applications_technologies', 'findByIdTechnologies', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository 
 * Find an applications_technologies & technologies associates by id_applications.
 * @param {Number} id_applications applications_technologies id_technologies
 */
exports.findByIdApplications = async function (id_applications) {
    try {
        let request = {
            text: `SELECT * FROM applications_technologies JOIN technologies on applications_technologies.id_technologies = technologies.id
             WHERE id_applications = $1`,
            values: [id_applications]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Applications_technologies', 'findByIdApplications', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Add a applications_technologies
 * @param {Number} ordering applications_technologies ordering
 * @param {Number} id_applications applications_technologies id_applications
 * @param {Number} id_technologies applications_technologies id_technologies
 */
exports.add = async function (id_applications, id_technologies) {
    try {
        let request = {
            text: `INSERT INTO applications_technologies (id_applications, id_technologies) VALUES($1, $2) RETURNING *`,
            values: [id_applications, id_technologies]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Applications_technologies', 'add', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Delete a applications_technologies by id.
 * @param {Number} id applications_technologies id
 */
exports.deleteById = async function (id) {
    try {
        let request = {
            text: `DELETE FROM applications_technologies WHERE id = $1`,
            values: [id]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Applications_technologies', 'deleteById', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}