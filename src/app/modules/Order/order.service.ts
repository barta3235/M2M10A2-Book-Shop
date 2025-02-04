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
    // console.log(updatedOrderDetails)


    //use the updatedOrderDetails and insert it into orderDB
    const result= await OrderModel.create(updatedOrderDetails)

    //reducing quantity ordered from original product quantity
    await ProductModel.findByIdAndUpdate({_id:orderDetails?.product},{$inc:{quantity:-orderDetails.quantity}})
 
    return result
}

const getAllOrdersFromDB= async()=>{
    const result = await OrderModel.find()
    return result
}

const revenueCollectionFromDB= async()=>{
    const revenueData=await OrderModel.aggregate([
        
        //stage-1
        {$lookup:{
            from:'productmodels',
            localField:'product',
            foreignField:'_id',
            as: 'DetailsFromProduct'
        }},

        //stage2 -- unwind the DetailsFromProduct
        {$unwind:'$DetailsFromProduct'},

        // stage-3 project
        {$project:{
            totalCalculation:{$multiply:['$DetailsFromProduct.price','$quantity']}
        }},

        //grouping for total collection, stage-4
        {$group:{
            _id:null,
            totalRevenue:{$sum:'$totalCalculation'}
        }},
        
        // projecting only the total revenue, stage-5
        {$project:{
            _id:0,totalRevenue:1
        }}
    ])

    return revenueData
}


//get orders by email from db
const getOrdersFromDBByEmail= async(givenEmail:string)=>{
    const result= await OrderModel.find({email:givenEmail})
    return result
}

export const OrderServices={
    createOrderIntoDB,
    revenueCollectionFromDB,
    getAllOrdersFromDB,
    getOrdersFromDBByEmail
}