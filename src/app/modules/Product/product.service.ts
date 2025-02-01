import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (book: TProduct) => {
  const result = await ProductModel.create(book);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
};
