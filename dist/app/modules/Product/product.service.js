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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
//create a book document in db
const createProductIntoDB = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(book);
    return result;
});
//get all product from DB, if any query given acts accordingly
const getAllProductFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = {};
    //checking if the searchTerm is present within title or author or category
    if (searchTerm) {
        filter = {
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { author: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
            ],
        };
    }
    const result = yield product_model_1.ProductModel.find(filter).select('-__v');
    return result;
});
//get a product by searching through id  |  the select('-__v') ensures the __v field does get returned as the document
const getProductByIdFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findById({ _id: productId }).select('-__v');
    return result;
});
//update a book/product information by sending updated fields through body
const updateProductByIdInDB = (productId, elements) => __awaiter(void 0, void 0, void 0, function* () {
    const modelOfProduct = new product_model_1.ProductModel();
    //calling instance method to validate if the updated element fields match schema fields 
    const match = modelOfProduct.validateSchemaFields(Object.keys(elements));
    if (match === false) {
        throw new Error('Invalid fields provided for update');
    }
    else {
        const result = yield product_model_1.ProductModel.findByIdAndUpdate({ _id: productId }, { $set: elements });
        return result;
    }
});
//delete a product by id 
const deleteProductByIdInDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.deleteOne({ _id: productId });
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductFromDB,
    getProductByIdFromDB,
    updateProductByIdInDB,
    deleteProductByIdInDB,
};
