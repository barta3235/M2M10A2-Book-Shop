import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

//create a book document in db
const createProductIntoDB = async (book: TProduct) => {
  const result = await ProductModel.create(book);
  return result;
};

//get all product from DB, if any query given acts accordingly
const getAllProductFromDB = async (searchTerm?: string) => {
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
  const result = await ProductModel.find(filter).select('-__v');
  return result;
};

//get a product by searching through id  |  the select('-__v') ensures the __v field does get returned as the document
const getProductByIdFromDB = async (productId: string) => {
  const result = await ProductModel.findById({ _id: productId }).select('-__v');
  return result;
};

//update a book/product information by sending updated fields through body
const updateProductByIdInDB = async (productId: string,elements: Record<string, unknown>) => {
  const modelOfProduct= new ProductModel()

  //calling instance method to validate if the updated element fields match schema fields 
  const match=modelOfProduct.validateSchemaFields(Object.keys(elements))
  if(match===false){
    throw new Error('Invalid fields provided for update')
  }else{
    const result = await ProductModel.findByIdAndUpdate({ _id: productId }, {$set:elements});
    return result;
  }
  
};

//delete a product by id 
const deleteProductByIdInDB = async (productId: string) => {
  const result = await ProductModel.deleteOne({ _id: productId });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getProductByIdFromDB,
  updateProductByIdInDB,
  deleteProductByIdInDB,
};
