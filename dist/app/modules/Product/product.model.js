"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, 'Book title is required'] },
    author: { type: String, required: [true, 'Book author is required'] },
    price: {
        type: Number,
        required: [true, 'Book price is required'],
        min: [0, 'Price must be a non-negative value'],
    },
    category: {
        type: String,
        enum: {
            values: [
                'Fiction',
                'Science',
                'SelfDevelopment',
                'Poetry',
                'Religious',
            ],
            message: '{VALUE} is not a valid category',
        },
        required: [true, 'Book category is required'],
    },
    description: {
        type: String,
        required: [true, 'Book description is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Book quantity is required'],
        min: [1, 'Minimum quantity must be 1'],
    },
    inStock: { type: Boolean, required: true },
}, { timestamps: true, versionKey: false, strict: true });
productSchema.methods.validateSchemaFields = function (elements) {
    const schemaFields = Object.keys(productSchema.paths);
    return elements.every(eachElement => schemaFields.includes(eachElement));
};
exports.ProductModel = (0, mongoose_1.model)('ProductModel', productSchema);
