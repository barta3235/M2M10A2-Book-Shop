import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try{
    const book = req.body;
    const result= await ProductServices.createProductIntoDB(book)
    res.status(200).json({
        success:true,
        message:'Book created successfully',
        data:result
    })
  }catch(error:unknown){
    const err= error as Error;
    res.status(500).json({
        success:false,
        message:'Book insertion unsuccessfully',
        error:err,
        stack:err.stack
    })
  }
};


export const ProductController={
    createProduct,
}