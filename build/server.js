"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var config_1 = require("./config");
var user_handler_1 = __importDefault(require("./src/handlers/user_handler"));
var product_handler_1 = __importDefault(require("./src/handlers/product_handler"));
var order_handler_1 = __importDefault(require("./src/handlers/order_handler"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
var port = parseInt(config_1.config.port);
var corsOption = {
    optionsSuccessStatus: 200 // for some lagacy browsers
};
app.use((0, cors_1.default)(corsOption));
app.use(body_parser_1.default.json());
app.get('/', function (_req, res) {
    res.sendFile(path_1.default.join(__dirname + "/index.html"));
});
app.get('/index.js', function (_req, res) {
    res.sendFile(path_1.default.join(__dirname + "/index.js"));
});
exports.server = app.listen(port, function () {
    console.log("server is Running in http://127.0.0.1:".concat(port));
});
(0, user_handler_1.default)(app);
(0, product_handler_1.default)(app);
(0, order_handler_1.default)(app);
exports.default = app;