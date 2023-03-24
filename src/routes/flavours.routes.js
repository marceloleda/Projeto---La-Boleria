import { Router } from 'express';
import { insertFlavours } from '../controllers/flavours.controller.js';
import { validateFlavours } from '../middlewares/flavoursValidation.middleware.js';

const flavoursRouter = Router();

flavoursRouter.post("/flavours", validateFlavours, insertFlavours);

export default flavoursRouter;