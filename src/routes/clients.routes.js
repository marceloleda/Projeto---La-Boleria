import { Router } from 'express';
import { getClientsOrderById, insertClients } from '../controllers/clients.controller.js';
import { validateClients } from '../middlewares/clientsValidation.middleware.js';

const clientsRouter = Router();

clientsRouter.post("/clients", validateClients, insertClients);
clientsRouter.get("/clients/:id/orders", getClientsOrderById);

export default clientsRouter;