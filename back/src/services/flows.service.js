'use strict'

const flows_repository = require('../repositories/flows.repository');
const exception = require('../exceptions/http.exception');

const _ = require('lodash');
const bcrypt = require('bcrypt');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Service 
 * Find all flows.
 */
exports.findAll = async function () {
    try {
        return await flows_repository.findAll();
    } catch (error) {
        log.error('Service', 'Flows', 'findAll', error);
        throw error;
    }
}