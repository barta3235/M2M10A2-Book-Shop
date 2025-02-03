import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";
import validator from 'validator';

const orderSchema=new Schema<TOrder>({
    email:{
        type:String,
        required:true,
        validate:{
            validator:(value:string)=>validator.isEmail(value),
            message:'{VALUE} is not a valid email type'
        }
    },
    product:{type:Schema.Types.ObjectId,required:true},
    quantity:{type:Number,required:true,min:[0,'Quantity cannot be negative']},
    totalPrice:{type:Number,min:[0,'Total Price cannot be negative']},
})

export const OrderModel=model<TOrder>('OrderModel',orderSchema)