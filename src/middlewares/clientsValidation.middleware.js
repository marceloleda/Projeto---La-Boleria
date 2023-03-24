import { clientsSchema } from "../models/clients.schema.js"

export async function validateClients(req, res, next){
    const {body} = req   
    try{
        const validation = clientsSchema.validate(body, {abortEarly: false});

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