import { Model } from "mongoose";

export type TProduct = {
  title: string;
  author: string;
  price: number;
  category: 'Fiction' | 'Science' | 'SelfDevelopment' | 'Poetry' | 'Religious';
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TProductMethod={
  validateSchemaFields(elements:string[]):boolean | undefined 
}

export type TProductModel=Model<TProduct,Record<string,never>,TProductMethod>

