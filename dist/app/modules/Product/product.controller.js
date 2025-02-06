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
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
//controller for create product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        const result = yield product_service_1.ProductServices.createProductIntoDB(book);
        res.status(200).json({
            success: true,
            message: 'Book created successfully',
            data: result,
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            success: false,
            message: 'Book insertion unsuccessfully',
            error: err,
            stack: err.stack,
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm || '';
        const result = yield product_service_1.ProductServices.getAllProductFromDB(searchTerm);
        //if we search using query the searchTerm doesn't match no data will be returned hence 404
        if (result.length <= 0) {
            res.status(404).json({
                success: false,
                message: 'No books found matching the search criteria',
                data: result,
            });
        }
        else {
            res.status(200).json({
                message: 'Books retrieved successfully',
                status: true,
                data: result,
            });
        }
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            success: false,
            message: 'Failed to fetch all book data',
            error: err,
            stack: err.stack,
        });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_service_1.ProductServices.getProductByIdFromDB(id);
        //incase there is no product with the given id then the result will be null so 404
        if (result === null) {
            res.status(404).json({
                message: 'Product does not exist',
                status: false,
            });
        }
        else {
            res.status(200).json({
                message: 'Book retrieved successfully',
                status: true,
                data: result,
            });
        }
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: 'Book retrieval unsuccessfully',
            success: false,
            error: err,
            stack: err.stack,
        });
    }
});
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const updateElements = req.body;
        const result = yield product_service_1.ProductServices.updateProductByIdInDB(id, updateElements);
        res.status(200).json({
            message: 'Book updated successfully',
            status: true,
            data: result,
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message || 'Error while updating book information',
            success: false,
            error: err,
            stack: err.stack,
        });
    }
});
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_service_1.ProductServices.deleteProductByIdInDB(id);
        //if book is deleted only then deletedCount becomes 1 only then 200 else sometimes if we try to delete twice it will be 404
        if (result.deletedCount != 0) {
            res.status(200).json({
                status: true,
                message: 'Book deleted successfully',
                data: {},
            });
        }
        else {
            res.status(404).json({
                status: false,
                message: 'Book deletion unsuccessfully',
            });
        }
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            success: false,
            message: err.message || 'Book deletion unsuccessfully',
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProductById,
    deleteProductById,
};
