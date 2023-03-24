import {db} from "../database/database.connection.js"
import { orderSchema } from "../models/order.schema.js";

export async function validateOrder(req, res, next){
    const {body} = req   
    const {clientId, cakeId} = req.body   
    try{
        const {rows: idClient} = await db.query(`SELECT * FROM clients WHERE id = $1;`, [clientId])
        const {rows: idCake} = await db.query(`SELECT * FROM cakes WHERE id = $1;`, [cakeId])

        if(!idClient?.length > 0 || !idCake?.length > 0 ){
            return res.sendStatus(404);
        }
        const validation = orderSchema.validate(body, {abortEarly: false});
        if(validation.error){
            const errors = validation.error.details.map((details)=>details.message);
            console.log(errors)
            res.sendStatus(400)
            return;
        }
        next()
    }catch(error){
        return res.sendStatus(500);
    }
}