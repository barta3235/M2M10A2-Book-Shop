"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.delete('/:productId', product_controller_1.ProductController.deleteProductById);
router.put('/:productId', product_controller_1.ProductController.updateProductById);
router.get('/:productId', product_controller_1.ProductController.getProductById);
router.post('/', product_controller_1.ProductController.createProduct);
router.get('/', product_controller_1.ProductController.getAllProduct);
exports.ProductRouter = router;
