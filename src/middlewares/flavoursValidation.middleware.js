import {db} from "../database/database.connection.js"
import { flavoursSchema } from "../models/flavours.schema.js";

export async function validateFlavours(req, res, next){
    try{
        const {name} = req.body 
        const {body} = req
        console.log(name)  
        const {rows: flavour} = await db.query(`SELECT * FROM flavours WHERE name = $1;`, [name])
        if(flavour?.length > 0){
            return res.sendStatus(409);
        }
        const validation = flavoursSchema.validate(body, {abortEarly: false});
        if(validation.error){
            const errors = validation.error.details.map((details)=>details.message);
            console.log(errors)
            res.sendStatus(400)
            return;
        }
        next()
    }catch(error){
        console.log(error.message)
        return res.sendStatus(500);
    }
}