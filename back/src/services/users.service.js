'use strict'

const users_repository = require('../repositories/users.repository');
const exception = require('../exceptions/http.exception');

/* REGEX */
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_PASSWORD = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

const _ = require('lodash');
const bcrypt = require('bcrypt');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * Service
 * Find a user by id.
 * @param {Number} id User id
 */
exports.findById = async function (id) {
    try {
        if (isNaN(id)) {
            throw new exception.httpException('id is not a number', 400);
        }
        return await users_repository.findById(id);
    } catch (error) {
        log.error('Service', 'Users', 'findById', error);
        throw error;
    }
}

/**
 * Service
 * Find a user by email adress.
 * @param {String} email User email address
 */
exports.findByEmail = async function (email) {
    try {
        if (_.isEmpty(email) || !_.isString(email)) {
            throw new exception.httpException('Email bad format', 400);
        }

        return await users_repository.findByEmail(email);
    } catch (error) {
        log.error('Service', 'Users', 'findByEmail', error);
        throw error;
    }
}

/**
 * Service
 * Add a user. 
 * @param {String} email User email address
 * @param {String} password User password
 * @param {Boolean} admin User status
 */
exports.add = async function (email, password, admin) {
    try {
        if (_.isEmpty(email)) {
            throw new exception.httpException('email empty or null', 400);
        }
        if (_.isEmpty(password)) {
            throw new exception.httpException('password empty or null', 400);
        }

        if (!_.isString(email)) {
            throw new exception.httpException('email is not string', 400);
        }
        if (!_.isString(password)) {
            throw new exception.httpException('password is not string', 400);
        }
        if (!_.isBoolean(admin)) {
            throw new exception.httpException('admin is not boolean', 400);
        }

        if (!REGEX_EMAIL.test(email)) {
            throw new exception.httpException('email bad format', 400);
        }
        if (!REGEX_PASSWORD.test(password)) {
            throw new exception.httpException('password bad format', 400);
        }

        let isEmailExist = await this.findByEmail(email);
        if (isEmailExist[0] != null) {
            throw new exception.httpException('This email is already exists', 400);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return await users_repository.add(email, hashedPassword, admin);
    } catch (error) {
        log.error('Service', 'Users', 'add', error);
        throw error;
    }
}


/**
 * Service
 * Is an admin user.
 * @param {Number} id User id.
 */
exports.isAdmin = async function (id) {
    try {
        let user = await this.findById(id);
        return user[0].admin;
    } catch (error) {
        log.error('Service', 'Users', 'idAdmin', error);
        throw error;
    }
}