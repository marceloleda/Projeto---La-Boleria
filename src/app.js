import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cakesRouter from './routes/cakes.routes.js';
import clientsRouter from './routes/clients.routes.js';

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json())


app.use(cakesRouter)
app.use(clientsRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Server running on port " + PORT);
})