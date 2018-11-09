'use strict'

const users_service = require('../services/users.service');
const exception = require('../exceptions/http.exception');
const jwt = require('../tools/jwt.tool');

const SALT = 'SALTCOBWEB';

const _ = require('lodash');
const md5 = require('md5');

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
            throw new exception.httpException('This email address was not found.', 400);
        }

        let bool = false;
        
        if( md5(password + SALT) === user[0].password) {
            bool = true
        }

        if (bool) {
            user[0].token = jwt.generateTokenForUser(user[0]);
        } else {
            throw new exception.httpException('This param : password, is wrong.', 400);
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
        let user = await users_service.add(email, password, admin);
        delete user[0].password;
        return user;
    } catch (error) {
        log.error('Controller', 'Users', 'signUp', error);
        throw error;
    }
}