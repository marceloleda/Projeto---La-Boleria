import { Router } from 'express';
import { getOrder, getOrderById, insertOrder, patchOrder } from '../controllers/order.controller.js';
import { validateOrder } from '../middlewares/orderValidation.middleware.js';
import { validatePatch } from '../middlewares/patchValidation.middleware.js';

const orderRouter = Router();

orderRouter.post("/order", validateOrder, insertOrder);
orderRouter.patch("/order/:id", validatePatch,patchOrder);
orderRouter.get("/orders", getOrder);
orderRouter.get("/orders/:id", getOrderById);

export default orderRouter;