"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var pg_1 = require("pg");
var client = new pg_1.Pool({
    host: config_1.config.host,
    database: (config_1.config.ENV == "dev") ? config_1.config.database : config_1.config.databaseTest,
    user: config_1.config.user,
    password: config_1.config.password
});
exports.default = client;
