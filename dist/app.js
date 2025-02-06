"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/Product/product.route");
const order_route_1 = require("./app/modules/Order/order.route");
//parsers
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//product routing
app.use('/api/products', product_route_1.ProductRouter);
app.use('/api/orders', order_route_1.OrderRouter);
app.get('/', (req, res) => {
    res.send('Server is live');
});
exports.default = app;
