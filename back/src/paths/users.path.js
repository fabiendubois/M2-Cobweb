'use strict'

const express = require('express');
const router = express.Router();
const _ = require('lodash');

const users_service = require('../services/users.service');
const exception = require('../exceptions/http.exception');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * @api {post} /users/sign_up Sign Up
 * @apiVersion 0.0.1
 * @apiName Sign Up
 * @apiGroup Users
 * @apiPermission none
 *
 * @apiDescription Inscription d'un utilisateur.
 * Password 8 char min, (Chiffre, Minuscule, Majuscule, Caractère spécial)
 * 
 * @apiParam (Params) {String} email Email Utilisateur
 * @apiParam (Params) {String} password Password Utilisateur
 * @apiParam (Params) {Boolean} admin Admin Statut Utilisateur
 * 
 * @apiSuccess (Succes 201) {Integer} id Id Utilisateur
 * @apiSuccess (Succes 201) {String} email Email Utilisateur
 * @apiSuccess (Succes 201) {Boolean} admin Admin Statut Utilisateur
 * 
 * @apiError (Error 409) {String} 0 General Missing param(s)
 * @apiError (Error 409) {String} 1 Email empty or null
 * @apiError (Error 409) {String} 2 Password empty or null
 * @apiError (Error 409) {String} 3 Admin empty or null
 * @apiError (Error 409) {String} 4 Email is not string
 * @apiError (Error 409) {String} 5 Password is not string
 * @apiError (Error 409) {String} 6 Admin is not boolean
 * 
 */
router.post('/users/sign_up', async function (req, res) {
    try {
        var return_code;
        var return_data;

        /* Vérification de la présence des arguments dans le payload */
        if (_.isUndefined(req.body.email) || _.isUndefined(req.body.password) || _.isUndefined(req.body.admin)) {
            throw new exception.httpException('Missing param(s)', 409);
        }

        let email = req.body.email;
        let password = req.body.password;
        let admin = req.body.admin;

        let users = await users_service.add(email, password, admin);

        return_code = 201;
        return_data = users;
    } catch (error) {
        log.error(error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).json(return_data)
    }
});

module.exports = router;