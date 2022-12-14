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
/* eslint-disable no-undef */
var supertest_1 = __importDefault(require("supertest"));
var order_models_1 = require("../../models/order_models");
var user_model_1 = require("../../models/user_model");
var products_model_1 = require("../../models/products_model");
var server_1 = require("../../../server");
var token = process.env.TOKEN_TEST;
var request = (0, supertest_1.default)(server_1.server);
var ORDER = new order_models_1.orderModel();
var USER = new user_model_1.userModel();
var product = new products_model_1.productModel();
var id = 1;
describe('Test orders endpoint responses', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, USER.create({
                        firstname: 'Bassam',
                        lastname: 'Allam',
                        password: 'IhaveToGo3384#'
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, product.create({
                            name: 'iPhone',
                            price: '2000',
                            category: 'phone'
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, USER.delete(id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, ORDER.delete(id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, product.delete(id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('create order api endpoint', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post('/order')
                        .set('Content-Type', 'application/json')
                        .set('Authorization', 'Bearer ' + token)
                        .send({
                        user_id: id,
                        status: 'active',
                        products_ids: [id],
                        quantities: [2]
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).toEqual({
                        order_id: id,
                        user_id: id,
                        status: 'active',
                        products_ids: [id],
                        quantities: [2]
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('get all orders api endpoint when token in the header', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get('/order')
                        .set('Authorization', 'Bearer ' + token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).toEqual([{
                            id: id,
                            user_id: id,
                            status: 'active',
                        }]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('expected a server error for not inserting the token when getting all orders', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get('/order')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get orders api endpoint by user_id when token in the header', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get("/order/".concat(id))
                        .set('Authorization', 'Bearer ' + token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).toEqual([{
                            id: id,
                            user_id: id,
                            status: 'active'
                        }]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('expected a server error for not inserting the token when getting a order by id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get("/order/".concat(id))];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('change order status  by order id when token in the header', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .put("/order/".concat(id, "/update?status=complete"))
                        .set('Authorization', 'Bearer ' + token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).toEqual({
                        id: id,
                        user_id: id,
                        status: 'complete'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('change order status  by order id when no token in the header', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .put("/order/".concat(id, "/update?status=complete"))];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get complete orders api endpoint by user_id when token in the header', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get("/order/completed/".concat(id))
                        .set('Authorization', 'Bearer ' + token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).toEqual([{
                            id: id,
                            user_id: id,
                            status: 'complete'
                        }]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('expected a server error for not inserting the token when getting a complete orders by id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get("/order/completed/".concat(id))];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('add product to an order when token in the header', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .put("/order/addProduct")
                        .set('Authorization', 'Bearer ' + token)
                        .send({
                        product_id: id,
                        order_id: id,
                        quantity: 2
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).toEqual({
                        id: 2,
                        product_id: id,
                        order_id: id,
                        quantity: 2
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete order api endpoint by order_id when token in the header', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete("/order/".concat(id))
                        .set('Authorization', 'Bearer ' + token)];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(res.body).toEqual({
                        id: id,
                        user_id: id,
                        status: 'complete'
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('expected a server error for not inserting the token when deleting a order by id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete('/order/1')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
