import { Router } from 'express';
import { insertClients } from '../controllers/clients.controller.js';
import { validateClients } from '../middlewares/clientsValidation.middleware.js';

const clientsRouter = Router();

clientsRouter.post("/clients", validateClients, insertClients);

export default clientsRouter;