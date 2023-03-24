import {db} from "../database/database.connection.js"

export async function validatePatch(req, res, next){
    const id = req.params.id;
    if(!Number.isInteger(Number(id))) {
        return res.sendStatus(400);
    }
    try{
        const {rows: order} = await db.query(`SELECT * FROM orders WHERE id = $1;`, [id]);
        if(order?.length === 0){
            return res.sendStatus(404);
        }
        next();
    }catch(error){
        console.log(error);
        return res.sendStatus(500);
    }
}
