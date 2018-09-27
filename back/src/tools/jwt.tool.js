var jwt = require('jsonwebtoken');
const exception = require('../exceptions/http.exception');

const JWT_SIGN_SECRET = '<JWT_SIGN_TOKEN>';

// Exported functions
module.exports = {
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

    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },

    getUserId: function (authorization) {
        var users_id = -1;
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null)
                    users_id = jwtToken.users_id;
            } catch (error) {
                console.error(error);
                throw new exception.httpException('Internal Error', 500);
            }
        }
        return users_id;
    }
}