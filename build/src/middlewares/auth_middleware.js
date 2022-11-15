"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authToken = function (req, res, next) {
    try {
        var authHead = req.headers.authorization;
        var token = authHead ? authHead.split(' ')[1] : '';
        var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        res.locals.userData = decoded;
        next();
    }
    catch (err) {
        res.status(401).send('error in auth');
        next(err);
    }
};
exports.authToken = authToken;
