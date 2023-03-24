import { db } from "../database/database.connection.js";

export async function insertCakes(req, res){
    const {name, price, image, description, flavourId} = req.body;
    try{
        await db.query(`INSERT INTO cakes (name, price, image, description, flavourId) VALUES ($1, $2, $3, $4, $5);`, 
        [name, price, image, description, flavourId])
        
        res.sendStatus(201)
    }catch(error){
        console.log(error.message)
        return res.sendStatus(500);    
    }
}