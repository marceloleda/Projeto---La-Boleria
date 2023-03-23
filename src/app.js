import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cakesRouter from './routes/cakes.routes.js';
import clientsRouter from './routes/clients.routes.js';
import orderRouter from './routes/order.routes.js';


dotenv.config()
const app = express();
app.use(cors());
app.use(express.json())


app.use(cakesRouter)
app.use(clientsRouter)
app.use(orderRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Server running on port " + PORT);
})