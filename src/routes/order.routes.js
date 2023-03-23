import { Router } from 'express';
import { getOrder, getOrderById, insertOrder } from '../controllers/order.controller.js';
import { validateOrder } from '../middlewares/orderValidation.middleware.js';

const orderRouter = Router();

orderRouter.post("/order", validateOrder, insertOrder);
orderRouter.get("/order", getOrder);
orderRouter.get("/order/:id", getOrderById);

export default orderRouter;