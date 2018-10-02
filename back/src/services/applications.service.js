'use strict'

const applications_repository = require('../repositories/applications.repository');
const exception = require('../exceptions/http.exception');

const _ = require('lodash');
const bcrypt = require('bcrypt');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Service 
 * Find all applications.
 */
exports.findAll = async function () {
    try {
        return await applications_repository.findAll();
    } catch (error) {
        log.error('Service', 'Applications', 'findAll', error);
        throw error;
    }
}