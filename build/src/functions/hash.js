"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareToHash = exports.hash = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
function hash(password) {
    var pepper = process.env.BCRYPT_PASSWORD;
    var salt = parseInt(process.env.SALT_ROUNDS);
    return bcrypt_1.default.hashSync("".concat(password).concat(pepper), salt);
}
exports.hash = hash;
function compareToHash(password, hashPassword) {
    var pepper = process.env.BCRYPT_PASSWORD;
    var salt = parseInt(process.env.SALT_ROUNDS);
    return bcrypt_1.default.compareSync("".concat(password).concat(pepper), hashPassword);
}
exports.compareToHash = compareToHash;
