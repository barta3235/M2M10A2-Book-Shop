import { model, Schema } from 'mongoose';
import { TProduct, TProductMethod, TProductModel } from './product.interface';

const productSchema = new Schema<TProduct,TProductModel,TProductMethod>(
  {
    title: { type: String, required: [true, 'Book title is required'] },
    author: { type: String, required: [true, 'Book author is required'] },
    price: {
      type: Number,
      required: [true, 'Book price is required'],
      min: [0, 'rice must be a non-negative value'],
    },
    category: {
      type: String,
      enum: {
        values: [
          'Fiction',
          'Science',
          'SelfDevelopment',
          'Poetry',
          'Religious',
        ],
        message: '{VALUE} is not a valid category',
      },
      required: [true, 'Book category is required'],
    },
    description: {
      type: String,
      required: [true, 'Book description is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Book quantity is required'],
      min: [0, 'Product quantity must be zero or a positive value'],
    },
    inStock: { type: Boolean, required: true },
  },
  { timestamps: true, versionKey: false, strict: true },
);

productSchema.methods.validateSchemaFields= function(elements:string[]){
  const schemaFields=Object.keys(productSchema.paths)
  return elements.every(eachElement=>schemaFields.includes(eachElement))
}

export const ProductModel = model<TProduct,TProductModel>('ProductModel', productSchema);
