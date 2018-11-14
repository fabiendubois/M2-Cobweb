'use strict'

const express = require('express');
const router = express.Router();

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

router.get('', async function (req, res) {
    let return_code;
    let redirect_url;
    try {
        redirect_url = 'http://doc.api.cobweb.fdu.ovh';
        return_code = 301;
    } catch (error) {
        log.error(error);
        return_code = error.code;
        redirect_url = { error: error.message };
    } finally {
        return res.status(return_code).redirect(redirect_url);
    }
});


module.exports = router;