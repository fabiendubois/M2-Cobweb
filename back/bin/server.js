const express = require('express');
const bodyParser = require('body-parser');

var log4js = require('log4js');
var log = log4js.getLogger("default");
log4js.configure('../config/log4js.json');

var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Paths */

/* Ping */
var ping = require('../src/paths/ping.path.js')
app.use('/api/v1/', ping);

/* Users */
var users = require('../src/paths/users.path.js');
app.use('/api/v1/', users);

/* Technologies */
var technologies = require('../src/paths/technologies.path.js');
app.use('/api/v1/', technologies);

/* Applications */
var applications = require('../src/paths/applications.path.js');
app.use('/api/v1/', applications);

var port = process.env.PORT || 8080;

app.listen(port, function () {
    log.trace("app listening at %s", 8080);
});
