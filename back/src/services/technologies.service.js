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
 * @param {String} nom Nom Technologie
 */
exports.add = async function (nom) {
    try {
        if (_.isEmpty(nom)) {
            throw new exception.httpException('name empty or null', 400);
        }

        if (!_.isString(nom)) {
            throw new exception.httpException('name is not string', 400);
        }

        return await technologies_repository.add(nom);
    } catch (error) {
        log.error(error);
        throw error;
    }
}

/**
 * Service de suppression d'une technologie en passant l'id en argument
 * @param {Number} id Id Technologie
 */
exports.deleteById = async function (id) {
    try {
        if (_.isEmpty(id)) {
            throw new exception.httpException('id empty or null', 400);
        }

        if (!_.isNaN(id)) {
            throw new exception.httpException('id is not nubmer', 400);
        }

        return await technologies_repository.deleteById(id);
    } catch (error) {
        log.error(error);
        throw error;
    }
}