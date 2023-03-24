import { cakesSchema } from "../models/cakes.schema.js";
import {db} from "../database/database.connection.js"

export async function validateCakes(req, res, next){
    const {body} = req   
    const {name, flavourId} = req.body   
    try{
        const {rows: cake} = await db.query(`SELECT * FROM cakes WHERE name = $1;`, [name])
        const {rows: flavour} = await db.query(`SELECT * FROM flavours WHERE id = $1;`, [flavourId])

        if(flavourId && flavour.length === 0){
            return res.sendStatus(404);
        }

        if(cake?.length > 0){
            return res.sendStatus(409);
        }
        const validation = cakesSchema.validate(body, {abortEarly: false});
        const imageError = validation.error?.details.find(detail => detail.context.key === "image");
        if (imageError) {
            console.log(imageError.message)
            return res.sendStatus(422);
        }
    
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
