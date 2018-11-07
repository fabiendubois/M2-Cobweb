'use strict'

const users_service = require('../services/users.service');
const exception = require('../exceptions/http.exception');
const jwt = require('../tools/jwt.tool');

const _ = require('lodash');
const bcrypt = require('bcrypt');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Controller 
 * User authentication, sign in.
 * @param {String} email User email address
 * @param {String} password User password
 */
exports.signIn = async function (email, password) {
    try {
        let user = await users_service.findByEmail(email);

        /* Si il n'y a pas d'utilisateur ayant cet email */
        if (_.isUndefined(user[0])) {
            throw new exception.httpException('Email Not Found', 400);
        }

        const bool = await bcrypt.compareSync(password, user[0].password);
        if (bool) {
            user[0].token = jwt.generateTokenForUser(user[0]);
        } else {
            throw new exception.httpException('Bad Password', 400);
        }
        return user;
    } catch (error) {
        log.error('Controller', 'Users', 'signIn', error);
        throw error;
    }
}

/**
 * Controller 
 * User registration, sign up.
 * @param {String} email User email address
 * @param {String} password User password
 * @param {Boolean} admin User status
 */
exports.signUp = async function (email, password, admin) {
    try {
        return await users_service.add(email, password, admin);
    } catch (error) {
        log.error('Controller', 'Users', 'signUp', error);
        throw error;
    }
}