"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
var dbClient_1 = __importDefault(require("../../dbClient"));
var hash_1 = require("../functions/hash");
var token_1 = __importDefault(require("../functions/token"));
var userModel = /** @class */ (function () {
    function userModel() {
        this.table = 'users';
    }
    userModel.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM ".concat(this.table);
                        return [4 /*yield*/, dbClient_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("can not get ".concat(this.table, ": ").concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userModel.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, res, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM ".concat(this.table, " WHERE id = $1");
                        return [4 /*yield*/, dbClient_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("can not get ".concat(this.table, " ").concat(id, " : ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userModel.prototype.create = function (userI) {
        return __awaiter(this, void 0, void 0, function () {
            var firstname, lastname, password, sql, conn, res, id, token, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        firstname = userI.firstname, lastname = userI.lastname, password = userI.password;
                        sql = "INSERT INTO ".concat(this.table, " (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *");
                        return [4 /*yield*/, dbClient_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [
                                firstname,
                                lastname,
                                (0, hash_1.hash)(password)
                            ])];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        id = res.rows[0].id;
                        token = (0, token_1.default)(id);
                        return [2 /*return*/, { auth: true, token: token }];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("can not create ".concat(this.table, ": ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userModel.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, res, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "DELETE FROM ".concat(this.table, " WHERE id=$1 RETURNING *");
                        return [4 /*yield*/, dbClient_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows[0]];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("can not delete ".concat(this.table, " : ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    userModel.prototype.authuntication = function (user_id, password) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, res, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT password FROM ".concat(this.table, " WHERE id = $1");
                        return [4 /*yield*/, dbClient_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [user_id])];
                    case 2:
                        res = _a.sent();
                        if (res.rows.length) { // is user exist?
                            if ((0, hash_1.compareToHash)(password, res.rows[0].password)) {
                                conn.release();
                                return [2 /*return*/, this.getById(user_id)];
                            }
                        }
                        conn.release();
                        return [2 /*return*/, null];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("can not authunticate: ".concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return userModel;
}());
exports.userModel = userModel;
