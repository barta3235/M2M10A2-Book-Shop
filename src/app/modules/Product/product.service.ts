import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (book: TProduct) => {
  const result = await ProductModel.create(book);
  return result;
};

const getAllProductFromDB = async (searchTerm?:string) => {
  let filter={}

  if(searchTerm){
     filter={
        $or:[
            {title:{$regex:searchTerm, $options:'i'}},
            {author:{$regex:searchTerm, $options:'i'}},
            {category:{$regex:searchTerm,$options:'i'}},
        ]
     }
  }
  const result = await ProductModel.find(filter).select('-__v');
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
};
