import express from 'express'
import { OrderController } from './order.controller'

const router=express.Router()

router.get('/revenue',OrderController.collectRevenue)
router.get('/:email',OrderController.findOrderByEmail)
router.post('/',OrderController.createOrder)
router.get('/',OrderController.getAllOrders)

export const OrderRouter=router;