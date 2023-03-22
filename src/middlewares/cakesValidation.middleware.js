import { cakesSchema } from "../models/cakes.schema.js";
import {db} from "../database/database.connection.js"

export async function validateCakes(req, res, next){
    const {body} = req   
    const {name} = req.body   
    try{
        const {rows: cake} = await db.query(`SELECT * FROM cakes WHERE name = $1;`, [name])
        if(cake?.length > 0){
            return res.sendStatus(409);
        }
        const validation = cakesSchema.validate(body, {abortEarly: false});
        const imageError = validation.error?.details.find(detail => detail.context.key === "image");
        if (imageError) {
            return res.status(422).send(imageError.message);
        }
    
        if(validation.error){
            const errors = validation.error.details.map((details)=>details.message);
            console.log(errors)
            res.status(400).send(errors)
            return;
        }
        
        next()
    }catch(error){
        return res.sendStatus(500);
    }
}