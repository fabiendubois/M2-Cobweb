'use strict'

const flows_technologies_service = require('../services/flows_technologies.service');
const user_controller = require('../controllers/users.controller');

const exception = require('../exceptions/http.exception');
const jwt = require('../tools/jwt.tool');

const _ = require('lodash');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Controller 
 * Find a flows_technologies.
 * @param {String} headerAuth header authentification
 */
exports.findAll = async function (headerAuth) {
    try {
        var users_id = jwt.getUserId(headerAuth);

        if (_.isUndefined(users_id) || users_id < 0) {
            throw new exception.httpException('Forbidden Access', 403);
        }

        return await flows_technologies_service.findAll();
    } catch (error) {
        log.error('Controller', 'Flows_technologies', 'findAll', error);
        throw error;
    }
}