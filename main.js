import express from 'express';
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient();
const app = express();
app.use(express.json());

app.get("/products", (_req, res) =>{
    res.send("Getting all products")
})
app.post("/products", async (req, res) => {
    console.log(req.body);
    const { productTitle, productDescription, unitsLeft, pricePerUnit} = req.body;
    try{
        const newProduct = await client.productItem.create({
            data: {
                productTitle,
                productDescription,
                unitsLeft,
                pricePerUnit
            }
        })
        console.log(newProduct)
    }catch (e){
        console.log(e)
        res.json({
            message: "Something went wrong. Try again later"
        })
    }
})

export default app;