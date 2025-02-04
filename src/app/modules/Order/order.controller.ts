import { Request, Response } from "express";
import { OrderServices } from "./order.service";


//create an order
const createOrder= async(req:Request,res:Response)=>{
    try{
      const orderDetails=req.body
      const result= await OrderServices.createOrderIntoDB(orderDetails)
      res.status(200).json({
        success: true,
        message: 'Order placed successfully',
        data: result,
      });
    }catch(error){
      const err= error as Error
      res.status(500).json({
          message:err.message || 'Order could not be placed',
          success:false,
          error:err,
          stack:err.stack
      })
    }
}

//fetch all orders
const getAllOrders= async(req:Request,res:Response)=>{
  try{
       const result= await OrderServices.getAllOrdersFromDB()
       if(result.length<=0){
        res.status(404).json({
          message:'No orders in the cart',
          status:false,
          data:{}
     })
       }else{
        res.status(200).json({
          message:'Orders are retrieved successfully',
          status:true,
          data:result 
     })
       }
  }catch(error){
       const err= error as Error
       res.status(500).json({
          message: err.message || 'Orders retrieval unsuccessfully',
          status:false,
          data:{} 
  })
}
}

//calculate total revenue 
const collectRevenue= async(req:Request,res:Response)=>{
  try{
      const result= await OrderServices.revenueCollectionFromDB()


      //if result is empty
      if(result.length<=0){
        res.status(404).json({
          message:'Revenue calculation unsuccessfully | Order cart is empty',
          status:false
       }) 
      }else{
        res.status(200).json({
          message:'Revenue calculated successfully',
          status:true,
          data:result 
       })
      }
      
  }catch(error){
      const err= error as Error
      res.status(500).json({
         message: err.message || 'Revenue calculation unsuccessfully',
         status:false,
         error:err,
         stack:err.stack
      })
  }
}


//find orders by email
const findOrderByEmail=async(req:Request,res:Response)=>{
    try{
      const givenEmail=req.params.email;
      const result= await OrderServices.getOrdersFromDBByEmail(givenEmail)
      if(result.length<=0){
        res.status(404).json({
          message:'No orders found issued by the email',
          status:false
        })
      }else{
        res.status(200).json({
          message:'Orders retrieved issued to the email',
          status:true,
          data:result
        })
      }
    }catch(error){
      const err= error as Error;
      res.status(500).json({
        message: err.message || 'Failed to fetch orders issued by the email',
        success:false,
        error:err,
        stack:err.stack
      })
    }
}


  

export const OrderController={
    createOrder,
    collectRevenue,
    getAllOrders,
    findOrderByEmail
}