import { db } from "../database/database.connection.js";

export async function insertClients(req, res){
    const {name, address, phone} = req.body;
    try{
        await db.query(`INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);`, 
        [name, address, phone])
        
        res.sendStatus(201)
    }catch(error){
        console.log(error.message)
        return res.sendStatus(500);    
    }
}

export async function getClientsOrderById(req, res){
    const {id} = req.params;
    try{
        const {rows: clients} = await db.query(`
        SELECT 
            orders.id AS "orderId",
            orders.quantity,
            TO_CHAR(orders.createdat, 'YYYY-MM-DD HH:MM') AS "createdAt",
            orders.totalprice AS "totalPrice",
            cakes.name AS "cakeName"

            FROM orders
            JOIN cakes ON orders.cakeid = cakes.id
            WHERE orders.clientid = $1
        ;`, 
        [id])

        if(clients?.length === 0){
            return res.sendStatus(404);
        }
        
        res.status(200).send(clients)
    }catch(error){
        console.log(error.message)
        return res.sendStatus(500);    
    }
}