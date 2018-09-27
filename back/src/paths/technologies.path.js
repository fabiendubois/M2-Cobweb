'use strict'

const express = require('express');
const router = express.Router();
const _ = require('lodash');

const technologies_controller = require('../controllers/technologies.controller');
const exception = require('../exceptions/http.exception');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

/**
 * @api {get} /technologies Technologies
 * @apiVersion 0.0.1
 * @apiName Technologies
 * @apiGroup Technologies
 * @apiPermission Bearer Token
 * 
 * @apiDescription Récupérer la liste des technologies.
 * 
 * @apiSuccess (Succes 200) {json} technologies Liste des technologies
 * 
 * @apiError (Error 403) {String} Auth Forbidden Access
 */
router.get('/technologies', async function (req, res) {
    try {
        var return_code;
        var return_data;

        let headerAuth = req.headers['authorization'];
        return_data = await technologies_controller.findAll(headerAuth);
        return_code = 200;
    } catch (error) {
        log.error(error);
        return_code = error.code;
        return_data = { error: error.message };
    } finally {
        return res.status(return_code).send(return_data);
    }
});

module.exports = router;