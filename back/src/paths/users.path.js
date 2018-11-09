'use strict'

const users_controller = require('../controllers/users.controller');
const exception = require('../exceptions/http.exception');

const express = require('express');
const router = express.Router();
const _ = require('lodash');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * @api {post} /users/sign_in Sign In
 * @apiVersion 0.0.1
 * @apiName Sign In
 * @apiGroup Users
 * @apiPermission none
 *
 * @apiDescription User login.
 * 
 * @apiParam (Params) {String} email User email adress.
 * @apiParam (Params) {String} password User password.
 * 
 * @apiSuccess (Succes 201) {Integer} id User id.
 * @apiSuccess (Succes 201) {String} token The user token contains this information: users_id, admin. Token operating time : 1H
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 This email address was not found.
 * @apiError (Error 400) {String} 2 This param : password, is wrong.
 * @apiError (Error 500) {String} Internal Database Error. 
 */
router.post('/users/sign_in', async function (req, res) {
    let return_code;
    let return_data;
    try {
        if (_.isUndefined(req.body.email) || _.isUndefined(req.body.password)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let email = req.body.email;
        let password = req.body.password;
        let users = await users_controller.signIn(email, password);

        return_data = JSON.parse(`{ "id":${users[0].id}, "token":"${users[0].token}"}`);
        return_code = 200;
    } catch (error) {
        log.error('Path', 'Users', '/users/sign_in', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

/**
 * @api {post} /users/sign_up Sign Up
 * @apiVersion 0.0.1
 * @apiName Sign Up
 * @apiGroup Users
 * @apiPermission none
 *
 * @apiDescription User registration.
 * 
 * @apiParam (Params) {String} email User email adress.
 * @apiParam (Params) {String} password User password.
 * @apiParam (Params) {Boolean} admin User status.
 * 
 * @apiSuccess (Succes 201) {Integer} id User id.
 * @apiSuccess (Succes 201) {String} email User email adress.
 * @apiSuccess (Succes 201) {Boolean} admin User status.
 * 
 * @apiError (Error 400) {String} 0 General Missing param(s).
 * @apiError (Error 400) {String} 1 This param : email, is empty or null. 
 * @apiError (Error 400) {String} 2 This param : password, is empty or null. 
 * @apiError (Error 400) {String} 3 This param : admin, is empty or null. 
 * @apiError (Error 400) {String} 4 This param : email, is not a string.
 * @apiError (Error 400) {String} 5 This param : password, is not a string.
 * @apiError (Error 400) {String} 6 This param : admin, is not a boolean.
 * @apiError (Error 400) {String} 7 This param : email, has a wrong format.
 * @apiError (Error 400) {String} 8 This param : password, has a wrong format.
 * @apiError (Error 400) {String} 9 This email address already exists.
 * @apiError (Error 500) {String} Internal Database Error. 
 */
router.post('/users/sign_up', async function (req, res) {
    let return_code;
    let return_data;
    try {
        if (_.isUndefined(req.body.email) || _.isUndefined(req.body.password) || _.isUndefined(req.body.admin)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let email = req.body.email;
        let password = req.body.password;
        let admin = req.body.admin;

        return_data = await users_controller.signUp(email, password, admin);
        return_code = 201;
    } catch (error) {
        log.error('Path', 'Users', '/users/sign_up', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).json(return_data)
    }
});


module.exports = router;