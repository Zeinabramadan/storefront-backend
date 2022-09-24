"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var constants_1 = require("./utils/constants");
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var dashboard_1 = __importDefault(require("./handlers/dashboard"));
var orders_1 = __importDefault(require("./handlers/orders"));
var CORS_OPTIONS = {
    origin: 'http://test.com',
    optionsSuccessStatus: 200,
};
var app = (0, express_1.default)();
// 3rd party libs
app.use((0, cors_1.default)(CORS_OPTIONS));
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.get('/', function (_req, res) {
    res.status(200).send('store front app');
});
// ENDPOINTS
(0, users_1.default)(app);
(0, dashboard_1.default)(app);
(0, products_1.default)(app);
(0, orders_1.default)(app);
app.get('*', function (_req, res) {
    res.status(404).send('Source not found');
});
app.listen(constants_1.PORT, function () {
    console.log("Server is running on http://localhost:".concat(constants_1.PORT));
});
exports.default = app;
