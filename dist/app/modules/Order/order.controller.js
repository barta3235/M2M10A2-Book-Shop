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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
//create an order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderDetails = req.body;
        const result = yield order_service_1.OrderServices.createOrderIntoDB(orderDetails);
        res.status(200).json({
            success: true,
            message: 'Order placed successfully',
            data: result,
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message || 'Order could not be placed',
            success: false,
            error: err,
            stack: err.stack
        });
    }
});
//fetch all orders
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderServices.getAllOrdersFromDB();
        if (result.length <= 0) {
            res.status(404).json({
                message: 'No orders in the cart',
                status: false,
                data: {}
            });
        }
        else {
            res.status(200).json({
                message: 'Orders are retrieved successfully',
                status: true,
                data: result
            });
        }
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message || 'Orders retrieval unsuccessfully',
            status: false,
            data: {}
        });
    }
});
//calculate total revenue 
const collectRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderServices.revenueCollectionFromDB();
        //if result is empty
        if (result.length <= 0) {
            res.status(404).json({
                message: 'Revenue calculation unsuccessfully | Order cart is empty',
                status: false
            });
        }
        else {
            res.status(200).json({
                message: 'Revenue calculated successfully',
                status: true,
                data: result
            });
        }
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message || 'Revenue calculation unsuccessfully',
            status: false,
            error: err,
            stack: err.stack
        });
    }
});
//find orders by email
const findOrderByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const givenEmail = req.params.email;
        const result = yield order_service_1.OrderServices.getOrdersFromDBByEmail(givenEmail);
        if (result.length <= 0) {
            res.status(404).json({
                message: 'No orders found issued by the email',
                status: false
            });
        }
        else {
            res.status(200).json({
                message: 'Orders retrieved issued to the email',
                status: true,
                data: result
            });
        }
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message || 'Failed to fetch orders issued by the email',
            success: false,
            error: err,
            stack: err.stack
        });
    }
});
exports.OrderController = {
    createOrder,
    collectRevenue,
    getAllOrders,
    findOrderByEmail
};
