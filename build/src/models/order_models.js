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
exports.orderModel = void 0;
var dbClient_1 = __importDefault(require("../../dbClient"));
var orderModel = /** @class */ (function () {
    function orderModel() {
        this.table = 'orders';
    }
    orderModel.prototype.updateStatus = function (order_id, status) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "UPDATE ".concat(this.table, " SET status=$1 WHERE id=$2 RETURNING *");
                        return [4 /*yield*/, dbClient_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [
                                status,
                                order_id
                            ])];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows[0]];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("can not get ".concat(this.table, ": ").concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, res, err_2;
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
                        err_2 = _a.sent();
                        throw new Error("can not get ".concat(this.table, ": ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.getByUserId = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, res, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM ".concat(this.table, " WHERE user_id=$1");
                        return [4 /*yield*/, dbClient_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [user_id])];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("can not get ".concat(this.table, " bu user ").concat(user_id, " : ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.getCompleteByUserId = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, res, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "SELECT * FROM ".concat(this.table, " WHERE status='complete' AND user_id=$1");
                        return [4 /*yield*/, dbClient_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [user_id])];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        return [2 /*return*/, res.rows];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("can not get ".concat(this.table, " bu user ").concat(user_id, " : ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.create = function (orderI) {
        return __awaiter(this, void 0, void 0, function () {
            var products_ids, quantities, user_id, status, sql, conn, res, order_id, i, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        products_ids = orderI.products_ids, quantities = orderI.quantities, user_id = orderI.user_id, status = orderI.status;
                        sql = "INSERT INTO ".concat(this.table, " (user_id,status) VALUES($1, $2) RETURNING *");
                        return [4 /*yield*/, dbClient_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [
                                user_id,
                                status
                            ])];
                    case 2:
                        res = _a.sent();
                        order_id = res.rows[0].id;
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < products_ids.length)) return [3 /*break*/, 6];
                        sql = "INSERT INTO orders_products (product_id, order_id, quantity) VALUES($1, $2, $3)";
                        return [4 /*yield*/, conn.query(sql, [
                                products_ids[i],
                                order_id,
                                quantities[i]
                            ])];
                    case 4:
                        res = _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6:
                        conn.release();
                        return [2 /*return*/, {
                                user_id: user_id,
                                order_id: order_id,
                                status: status,
                                products_ids: products_ids,
                                quantities: quantities,
                            }];
                    case 7:
                        err_5 = _a.sent();
                        throw new Error("can not create ".concat(this.table, ": ").concat(err_5));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.addProduct = function (anOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var order_id, product_id, quantity, sql, conn, res, id, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        order_id = anOrder.order_id, product_id = anOrder.product_id, quantity = anOrder.quantity;
                        sql = "INSERT INTO orders_products(order_id,product_id,quantity) VALUES($1, $2, $3)RETURNING *";
                        return [4 /*yield*/, dbClient_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [
                                order_id,
                                product_id,
                                quantity
                            ])];
                    case 2:
                        res = _a.sent();
                        conn.release();
                        id = res.rows[0].id;
                        return [2 /*return*/, {
                                id: id,
                                product_id: product_id,
                                order_id: order_id,
                                quantity: quantity
                            }];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("can not addProduct ".concat(this.table, " : ").concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, res, err_7;
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
                        err_7 = _a.sent();
                        throw new Error("can not delete ".concat(this.table, " : ").concat(err_7));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return orderModel;
}());
exports.orderModel = orderModel;
