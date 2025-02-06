"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: '{VALUE} is not a valid email type'
        }
    },
    product: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true, min: [1, 'Minimum order quantity must be 1'] },
    totalPrice: { type: Number, min: [0, 'Total Price cannot be negative'], required: true },
}, { timestamps: true, versionKey: false });
exports.OrderModel = (0, mongoose_1.model)('OrderModel', orderSchema);
