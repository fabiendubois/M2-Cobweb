'use strict'

const pg_tool = require('../tools/pg.tool');
const exception = require('../exceptions/http.exception');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Selectioner un user avec comme id celui passé en argument
 * @param {Number} id Id utilisateur
 */
exports.findById = async function (id) {
    try {
        let request = {
            text: 'SELECT * FROM users WHERE id = $1',
            values: [id]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error(error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Rechercher un utilisateur en fonction de l'email
 * @param {String} email email de l'utilisateur
 */
exports.findByEmail = async function (email) {
    try {
        let request = {
            text: 'SELECT * FROM users WHERE email = $1',
            values: [email]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error(error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Ajouter un user en passant en arugment l'ensemble de ses paramètres
 * @param {String} email email de l'utilisateur
 * @param {String} password mot de passe de l'utilisateur
 * @param {Boolean} admin statut admin de l'utilisateur
 */
exports.add = async function (email, password, admin) {
    try {
        let request = {
            text: 'INSERT INTO users (email, password, admin)'
                + 'VALUES($1, $2, $3) RETURNING *',
            values: [email, password, admin]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error(error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}