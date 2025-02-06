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
exports.OrderServices = void 0;
const product_model_1 = require("../Product/product.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (orderDetails) => __awaiter(void 0, void 0, void 0, function* () {
    //using the ProductModel to check if the product with the id actually exists
    const productInfo = yield product_model_1.ProductModel.findById({ _id: orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.product });
    if (!productInfo) {
        throw new Error('Product not found');
    }
    //calling the product model to check the quantity available
    //if asked quantity > available quantity, throws error 
    const availableProductQuantity = productInfo === null || productInfo === void 0 ? void 0 : productInfo.quantity;
    if (orderDetails.quantity > availableProductQuantity) {
        throw new Error('Requested quantity exceeds available stock');
    }
    //updated order details to have the new total price replacing the default
    const totalPrice = orderDetails.quantity * productInfo.price;
    const updatedOrderDetails = Object.assign(Object.assign({}, orderDetails), { totalPrice });
    // console.log(updatedOrderDetails)
    //use the updatedOrderDetails and insert it into orderDB
    const result = yield order_model_1.OrderModel.create(updatedOrderDetails);
    //reducing quantity ordered from original product quantity
    yield product_model_1.ProductModel.findByIdAndUpdate({ _id: orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.product }, { $inc: { quantity: -orderDetails.quantity } });
    //make inStock update if product quantity goes 0
    const productUpdatedInfo = yield product_model_1.ProductModel.findById({ _id: orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.product });
    if (productUpdatedInfo != null && productUpdatedInfo.quantity <= 0) {
        yield product_model_1.ProductModel.findByIdAndUpdate({ _id: orderDetails === null || orderDetails === void 0 ? void 0 : orderDetails.product }, { $set: { inStock: false } });
    }
    return result;
});
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.find();
    return result;
});
const revenueCollectionFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const revenueData = yield order_model_1.OrderModel.aggregate([
        //stage-1
        { $lookup: {
                from: 'productmodels',
                localField: 'product',
                foreignField: '_id',
                as: 'DetailsFromProduct'
            } },
        //stage2 -- unwind the DetailsFromProduct
        { $unwind: '$DetailsFromProduct' },
        // stage-3 project
        { $project: {
                totalCalculation: { $multiply: ['$DetailsFromProduct.price', '$quantity'] }
            } },
        //grouping for total collection, stage-4
        { $group: {
                _id: null,
                totalRevenue: { $sum: '$totalCalculation' }
            } },
        // projecting only the total revenue, stage-5
        { $project: {
                _id: 0, totalRevenue: 1
            } }
    ]);
    return revenueData;
});
//get orders by email from db
const getOrdersFromDBByEmail = (givenEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.find({ email: givenEmail });
    return result;
});
exports.OrderServices = {
    createOrderIntoDB,
    revenueCollectionFromDB,
    getAllOrdersFromDB,
    getOrdersFromDBByEmail
};
