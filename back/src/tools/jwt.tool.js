'use strict'

const exception = require('../exceptions/http.exception');
const config = require('../../config/jwt');

const jwt = require('jsonwebtoken');

var log4js = require('log4js');
var log = log4js.getLogger("default");
var config_log4js = require('../../config/log4js');
log4js.configure(config_log4js);

const JWT_SIGN_SECRET = config.jwt_secret;

module.exports = {
    /**
     * Génération d'un token avec une durée de validité d'une heure
     */
    generateTokenForUser: function (userData) {
        return jwt.sign({
            users_id: userData.id,
            admin: userData.admin
        },
            JWT_SIGN_SECRET,
            {
                expiresIn: '1h'
            })
    },

    /**
     * Prends en argument le header d'authorization et return que le token, sans le 'Bearer' devant.
     * 'Bearer token.azerty.123' -> token.azerty.123 
     */
    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },

    /**
     * Récupérer l'id utilisateur à partir du header d'autorization
     */
    getUserId: function (authorization) {
        var users_id = -1;
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null)
                    users_id = jwtToken.users_id;
            } catch (error) {
                log.error(error);
                throw new exception.httpException('Forbidden Access', 403);
            }
        }
        return users_id;
    }
}