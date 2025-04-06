import express from 'express';
import { PrismaClient } from '@prisma/client'
import validateProduct from './middlewares/validateProduct.js';

const client = new PrismaClient();
const app = express();
app.use(express.json());

app.get("/products", (_req, res) =>{
    res.send("Getting all products")
})
app.post("/products", validateProduct, async (req, res) => {
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
        res.status(201).json({
            status: "Success",
            message: "New Product added successfully",
            data: newProduct
        })
    }catch (e){
        res.json({
            message: "Something went wrong. Try again later"
        })
    }
})

app.patch("/products/:productId", async (req, res) => {
    const { productTitle, productDescription, unitsLeft, pricePerUnit, isOnOffer } = req.body;
    const { productId } = req.params;
    try{
        const updatedItem = await client.productItem.update({
            where: {
                id: productId
            },
            data: {
                productTitle: productTitle && productTitle,
                productDescription: productDescription && productDescription,
                unitsLeft: unitsLeft && unitsLeft,
                pricePerUnit: pricePerUnit && pricePerUnit,
                isOnOffer: isOnOffer && isOnOffer
            }
        })
        res.status(200).json({
            status: "Success",
            message: "Product updated Successfully",
            data: updatedItem
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            status: "Error",
            message: "Something went wrong. Try again later"
        })
    }
})

export default app;