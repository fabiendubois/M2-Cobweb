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
 * User authentication
 * @param {String} email Email Utilisateur
 * @param {String} password Password Utilisateur
 */
exports.signIn = async function (email, password) {
    try {
        let user = await users_service.findByEmail(email);

        /* Si il n'y a pas d'utilisateur ayant cet email */
        if (_.isUndefined(user[0])) {
            throw new exception.httpException('Email Not Found', 409);
        }

        const bool = await bcrypt.compareSync(password, user[0].password);
        if (bool) {
            user[0].token = jwt.generateTokenForUser(user[0]);
        } else {
            throw new exception.httpException('Bad Password', 409);
        }
        return user;
    } catch (error) {
        log.error('Controller', 'Users', 'signIn', error);
        throw error;
    }
}

/**
 * Controller 
 * User registration
 * @param {String} email email de l'utilisateur
 * @param {String} password mot de passe de l'utilisateur
 * @param {Boolean} admin statut admin de l'utilisateur
 */
exports.signUp = async function (email, password, admin) {
    try {
        return await users_service.add(email, password, admin);
    } catch (error) {
        log.error('Controller', 'Users', 'signUp', error);
        throw error;
    }
}

/**
 * Controller
 * Is an admin user.
 * @param {Number} id User id.
 */
exports.isAdmin = async function (id) {
    try {
        let user = await users_service.findById(id);

        if (user[0] === null) {
            throw new exception.httpException('Id not valid', 400);
        }

        return user[0].admin;
    } catch (error) {
        log.error('Controller', 'Users', 'idAdmin', error);
        throw error;
    }
}