import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (book: TProduct) => {
  const result = await ProductModel.create(book);
  return result;
};

const getAllProductFromDB = async (searchTerm?: string) => {
  let filter = {};

  if (searchTerm) {
    filter = {
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { author: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    };
  }
  const result = await ProductModel.find(filter).select('-__v');
  return result;
};

const getProductByIdFromDB = async (productId: string) => {
  const result = await ProductModel.findById({ _id: productId });
  return result;
};

const updateProductByIdInDB = async (productId: string,elements: Record<string, unknown>) => {
  const result= await ProductModel.updateOne({_id:productId},elements,{new:true})
  return result
};


const deleteProductByIdInDB= async(productId:string)=>{
    const result= await ProductModel.deleteOne({_id:productId})
    return result
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getProductByIdFromDB,
  updateProductByIdInDB,
  deleteProductByIdInDB,
};
