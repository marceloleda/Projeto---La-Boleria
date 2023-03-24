import { db } from "../database/database.connection.js";

export async function insertFlavours(req, res){
    const {name} = req.body;
    try{
        await db.query(`INSERT INTO flavours (name) VALUES ($1);`, 
        [name])
        
        res.sendStatus(201)
    }catch(error){
        console.log(error.message)
        return res.sendStatus(500);    
    }
}