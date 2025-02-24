import { Request, Response } from 'express';
import { ProductServices } from './product.service';


//controller for create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const book = req.body;
    const result = await ProductServices.createProductIntoDB(book);
    res.status(200).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: 'Book insertion unsuccessfully',
      error: err,
      stack: err.stack,
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = (req.query.searchTerm as string) || '';
    const result = await ProductServices.getAllProductFromDB(
      searchTerm as string,
    );

    //if we search using query the searchTerm doesn't match no data will be returned hence 404
    if (result.length <= 0) {
      res.status(404).json({
        success: false,
        message: 'No books found matching the search criteria',
        data: result,
      });
    } else {
      res.status(200).json({
        message: 'Books retrieved successfully',
        status: true,
        data: result,
      });
    }
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: 'Failed to fetch all book data',
      error: err,
      stack: err.stack,
    });
  }
};


const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await ProductServices.getProductByIdFromDB(id);

    //incase there is no product with the given id then the result will be null so 404
    if (result === null) {
      res.status(404).json({
        message: 'Product does not exist',
        status: false,
      });
    } else {
      res.status(200).json({
        message: 'Book retrieved successfully',
        status: true,
        data: result,
      });
    }

  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: 'Book retrieval unsuccessfully',
      success: false,
      error: err,
      stack: err.stack,
    });
  }
};

const updateProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const updateElements = req.body;
    const result = await ProductServices.updateProductByIdInDB(id,updateElements);
    res.status(200).json({
      message: 'Book updated successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: err.message || 'Error while updating book information',
      success: false,
      error: err,
      stack: err.stack,

    });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await ProductServices.deleteProductByIdInDB(id);

    //if book is deleted only then deletedCount becomes 1 only then 200 else sometimes if we try to delete twice it will be 404
    if (result.deletedCount != 0) {
      res.status(200).json({
        status: true,
        message: 'Book deleted successfully',
        data: {},
      });
    } else {
      res.status(404).json({
        status: false,
        message: 'Book deletion unsuccessfully',
      });
    }
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: err.message || 'Book deletion unsuccessfully',
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
