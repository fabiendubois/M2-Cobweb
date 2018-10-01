'use strict'

const express = require('express');
const router = express.Router();
const _ = require('lodash');

const users_controller = require('../controllers/users.controller');
const exception = require('../exceptions/http.exception');

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
 * @apiSuccess (Succes 201) {String} token User token.
 * 
 * @apiError (Error 400) {String} 0 Missing param(s).
 * @apiError (Error 400) {String} 1 Email Not Found.
 * @apiError (Error 400) {String} 2 Bad Password.
 * 
 */
router.post('/users/sign_in', async function (req, res) {
    try {
        var return_code;
        var return_data;

        /* Vérification de la présence des arguments dans le body */
        if (_.isUndefined(req.body.email) || _.isUndefined(req.body.password)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        let email = req.body.email;
        let password = req.body.password;
        let users = await users_controller.signIn(email, password);

        return_data = JSON.parse(`{ "id":${users[0].id},"token":"${users[0].token}"}`);
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
 * @apiError (Error 400) {String} 1 Email empty or null.
 * @apiError (Error 400) {String} 2 Password empty or null.
 * @apiError (Error 400) {String} 3 Admin empty or null.
 * @apiError (Error 400) {String} 4 Email is not string.
 * @apiError (Error 400) {String} 5 Password is not string.
 * @apiError (Error 400) {String} 6 Admin is not boolean.
 * 
 */
router.post('/users/sign_up', async function (req, res) {
    try {
        var return_code;
        var return_data;

        /* Vérification de la présence des arguments dans le body */
        if (_.isUndefined(req.body.email) || _.isUndefined(req.body.password) || _.isUndefined(req.body.admin)) {
            throw new exception.httpException('Missing param(s)', 400);
        }

        log.debug(req.body.admin);
        let email = req.body.email;
        let password = req.body.password;
        let admin = req.body.admin;

        let users = await users_controller.signUp(email, password, admin);

        return_code = 201;
        return_data = users;
    } catch (error) {
        log.error('Path', 'Users', '/users/sign_up', error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).json(return_data)
    }
});

module.exports = router;