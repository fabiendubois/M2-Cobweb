'use strict'

const pg_tool = require('../tools/pg.tool');
const exception = require('../exceptions/http.exception');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Repository
 * Find a user by id.
 * @param {Number} id User Id
 */
exports.findById = async function (id) {
    try {
        let request = {
            text: `SELECT * FROM users WHERE id = $1`,
            values: [id]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Users', 'findById', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Find a user by email adress.
 * @param {String} email User email address
 */
exports.findByEmail = async function (email) {
    try {
        let request = {
            text: `SELECT * FROM users WHERE email = $1`,
            values: [email]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Users', 'findByEmail', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Repository
 * Add a user.
 * @param {String} email User email address
 * @param {String} password User password
 * @param {Boolean} admin User status
 */
exports.add = async function (email, password, admin) {
    try {
        let request = {
            text: `INSERT INTO users (email, password, admin) VALUES($1, $2, $3) RETURNING *`,
            values: [email, password, admin]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error('Repository', 'Users', 'add', error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}