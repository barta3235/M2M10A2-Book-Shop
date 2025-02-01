import { Request, Response } from 'express';
import { ProductServices } from './product.service';

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

    if(result.length===0){
        res.status(404).json({
            success:false,
            message:'No books found matching the search criteria',
            data:result
        })
    }else{
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
    res.status(200).json({
      message: 'Book retrieved successfully',
      status: true,
      data: result,
    });
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

export const ProductController = {
  createProduct,
  getAllProduct,
  getProductById,
};
