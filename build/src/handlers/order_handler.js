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
Object.defineProperty(exports, "__esModule", { value: true });
var order_models_1 = require("../models/order_models");
var auth_middleware_1 = require("../middlewares/auth_middleware");
var store = new order_models_1.orderModel();
var getAll = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var w, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.getAll()];
            case 1:
                w = _a.sent();
                res.json(w);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(404).json({ Error: 'An Error occurred' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status, orderId, w, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                status = req.query.status;
                orderId = parseInt(req.params.id);
                if (!(orderId && ['active', 'complete'].includes(status))) return [3 /*break*/, 2];
                return [4 /*yield*/, store.updateStatus(orderId, status)];
            case 1:
                w = _a.sent();
                res.json(w);
                return [3 /*break*/, 3];
            case 2: return [2 /*return*/, res.status(400).json({ Error: 'Bad parameters' })];
            case 3: return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(404).json({ Error: 'An Error occurred' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
var addProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var w, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.addProduct(req.body)];
            case 1:
                w = _a.sent();
                res.json(w);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(404).json({ Error: 'An Error occurred' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getByUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var w, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.getByUserId(parseInt(req.params.user_id))];
            case 1:
                w = _a.sent();
                res.json(w);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(404).json({ Error: 'An Error occurred' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getCompleteByUserId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var w, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.getCompleteByUserId(parseInt(req.params.user_id))];
            case 1:
                w = _a.sent();
                res.json(w);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(404).json({ Error: 'An Error occurred' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var w, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.create(req.body)];
            case 1:
                w = _a.sent();
                res.json(w);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                return [2 /*return*/, res.status(404).json({ Error: 'An Error occurred' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
var delet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var w, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.delete(parseInt(req.params.id))];
            case 1:
                w = _a.sent();
                res.json(w);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                return [2 /*return*/, res.status(404).json({ Error: 'An Error occurred' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
var order_model_routes = function (app) {
    app.get('/order', auth_middleware_1.authToken, getAll);
    app.get('/order/:user_id', auth_middleware_1.authToken, getByUserId);
    app.get('/order/completed/:user_id', auth_middleware_1.authToken, getCompleteByUserId);
    app.post('/order', auth_middleware_1.authToken, create);
    app.delete('/order/:id', auth_middleware_1.authToken, delet);
    app.put('/order/:id/update', auth_middleware_1.authToken, updateStatus);
    app.put('/order/addProduct', auth_middleware_1.authToken, addProduct);
};
exports.default = order_model_routes;
