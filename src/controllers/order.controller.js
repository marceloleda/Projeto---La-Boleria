import { db } from "../database/database.connection.js";

export async function insertOrder(req, res){
    const {clientId, cakeId, quantity, totalPrice} = req.body;
    try{
        await db.query(`INSERT INTO orders (clientId, cakeId, quantity, totalPrice) VALUES ($1, $2, $3, $4);`, 
        [clientId, cakeId, quantity, totalPrice])
        
        res.sendStatus(201)
    }catch(error){
        console.log(error.message)
        return res.sendStatus(500);    
    }
}
export async function getOrder(req, res){
    try{
        const {date} = req.query
        
        const query = `SELECT 
        JSON_BUILD_OBJECT (
            'id', clients.id,
            'name', clients.name,
            'address', clients.address,
            'phone', clients.phone
        ) AS client,
        JSON_BUILD_OBJECT(
            'id', cakes.id,
            'name', cakes.name,
            'price', cakes.price,
            'description', cakes.description,
            'image', cakes.image,
            'flavour', flavours.name
        ) AS cake,
        orders.id AS orderId,
        TO_CHAR(orders.createdat, 'YYYY-MM-DD HH:MM') AS createdAt,
        orders.quantity AS quantity,
        orders.totalprice AS totalPrice
        FROM clients
        JOIN orders ON orders.clientid = clients.id
        JOIN cakes ON cakes.id = orders.cakeid
        LEFT JOIN flavours ON flavours.id = cakes.flavourId
        ${date?`WHERE TO_CHAR(orders.createdat, 'YYYY-MM-DD') = $1`: ''}
        ;`
        
        const {rows:orders} = await db.query(query, date?[date]: "")
        
        if(orders?.length === 0){
            return res.status(404).send(orders);

        }
        res.status(200).send(orders)
    }catch(error){
        console.log(error.message)
        return res.sendStatus(500);    
    }
}
export async function getOrderById(req, res){
    const {id} = req.params
    try{
        const {rows:orders} = await db.query(`
        SELECT
            JSON_BUILD_OBJECT(
                'client', JSON_BUILD_OBJECT(
                'id', clients.id,
                'name', clients.name,
                'address', clients.address,
                'phone', clients.phone
                ),
                'cake', JSON_BUILD_OBJECT(
                'id', cakes.id,
                'name', cakes.name,
                'price', cakes.price,
                'description', cakes.description,
                'image', cakes.image
                ),
                'orderId', orders.id,
                'createdAt', TO_CHAR(orders.createdat, 'YYYY-MM-DD HH:MM'),
                'quantity', orders.quantity,
                'totalPrice', orders.totalprice
            ) AS result
            FROM orders
            JOIN clients ON orders.clientid = clients.id
            JOIN cakes ON orders.cakeid = cakes.id
            WHERE orders.id = $1
        ;`, [id])
        
        if(orders?.length === 0){
            return res.sendStatus(404);
        }
        
        res.status(200).send(orders[0].result)
    }catch(error){
        console.log(error.message)
        return res.sendStatus(500);    
    }
}