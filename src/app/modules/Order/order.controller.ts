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
       res.status(200).json({
           message:'Orders are retrieved successfully',
           status:200,
           data:result 
      })
  }catch(error){
       const err= error as Error
       res.status(500).json({
          message: err.message || 'Orders retrieval unsuccessfully',
          status:false,
          data:{} 
  })
}
}

const collectRevenue= async(req:Request,res:Response)=>{
  const result= await OrderServices.revenueCollectionFromDB()
  console.log(result)
}


  

export const OrderController={
    createOrder,
    collectRevenue,
    getAllOrders
}