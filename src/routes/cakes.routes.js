import { Router } from 'express';
import { insertCakes } from '../controllers/cakes.controller.js';
import { validateCakes } from '../middlewares/cakesValidation.middleware.js';

const cakesRouter = Router();

cakesRouter.post("/cakes", validateCakes, insertCakes);

export default cakesRouter;