'use strict'

const technologies_repository = require('../repositories/technologies.repository');
const exception = require('../exceptions/http.exception');

const _ = require('lodash');
const bcrypt = require('bcrypt');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Service de récupération des technologies
 */
exports.findAll = async function () {
    try {
        return await technologies_repository.findAll();
    } catch (error) {
        log.error(error);
        throw error;
    }
}

/**
 * Service d'ajout d'une technologie
 * @param {String} nom 
 */
exports.add = async function (nom) {
    try {
        if (_.isEmpty(nom)) {
            throw new exception.httpException('name empty or null', 409);
        }

        if (!_.isString(nom)) {
            throw new exception.httpException('name is not string', 409);
        }

        return await technologies_repository.add(nom);
    } catch (error) {
        log.error(error);
        throw error;
    }
}