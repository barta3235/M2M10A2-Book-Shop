import { ProductModel } from "../Product/product.model";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB=async(orderDetails:TOrder)=>{

    //using the ProductModel to check if the product with the id actually exists
    const productInfo= await ProductModel.findById({_id:orderDetails?.product})
    if(!productInfo){
        throw new Error('Product not found')
    }
    
    //calling the product model to check the quantity available
    //if asked quantity > available quantity, throws error 
    const availableProductQuantity=productInfo?.quantity
    if(orderDetails.quantity>availableProductQuantity){
        throw new Error('Requested quantity exceeds available stock')
    }


    //updated order details to have the new total price replacing the default
    const totalPrice=orderDetails.quantity*productInfo.price
    const updatedOrderDetails={...orderDetails,totalPrice}
    console.log(updatedOrderDetails)


    //use the updatedOrderDetails and insert it into orderDB
    const result= await OrderModel.create(updatedOrderDetails)

    //reducing quantity ordered from original product quantity
    await ProductModel.findByIdAndUpdate({_id:orderDetails?.product},{$inc:{quantity:-orderDetails.quantity}})
 
    return result
}


export const OrderServices={
    createOrderIntoDB
}