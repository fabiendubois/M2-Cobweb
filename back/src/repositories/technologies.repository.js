'use strict'

const pg_tool = require('../tools/pg.tool');
const exception = require('../exceptions/http.exception');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Récupérer toutes les technologies
 */
exports.findAll = async function () {
    try {
        let request = {
            text: 'SELECT * FROM technologies'
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error(error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}

/**
 * Ajouter une technologie en base de données
 * @param {String} name 
 */
exports.add = async function (name) {
    try {
        let request = {
            text: 'INSERT INTO technologies (name)'
                + 'VALUES($1) RETURNING *',
            values: [name]
        };
        let response = await pg_tool.handle_databsase(request);
        return response.rows;
    } catch (error) {
        log.error(error);
        throw new exception.httpException('Internal DataBase Error', 500);
    }
}