import express from 'express';
import { PrismaClient } from '@prisma/client'
import validateProduct from './middlewares/validateProduct.js';

const client = new PrismaClient();
const app = express();
app.use(express.json());

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

app.get("/products", async(_req, res) =>{
    try{
        const products = await client.productItem.findMany();
            res.status(200).json({
                status: "Success",
                message: "Successfully fetched product items",
                data: products
            })
    }catch(e){
        res.status(500).json({
            status: "Error",
            message: "Something went wrong. Try again later"
        })
    }
})

app.get("/products/:productId", async(req, res) => {
    const { productId} = req.params;
    try{
        const product = await client.productItem.findFirst({
            where: {
                id: productId
            }
        })
        if(!product){
            res.status(404).json({
                status: "Error",
                message: "Product not found"
            })
        }
        res.status(200).json({
            status: "Success",
            data: product
        })
    }catch(e){
        res.status(500).json({
            status: "Error",
            message: "Something went wrong. Try again later"
        })
    }
})

app.delete("/products/:productId", async (req, res) => {
    const { productId } = req.params;
    try{
        await client.productItem.delete({
            where: {
                id: productId
            }
        })
        res.status(200).json({
            status: "Success",
            message: "Product Item deleted successfully"
        })
    }catch(e){
        res.status(500).json({
            status: "Error",
            message: "Something went wrong. Try again later"
        })
    }
})

app.get("/productsOnOffer", async (_req, res) => {
    try{
        const productsOnOffer = await client.productItem.findMany({
            where: {
                isOnOffer: true
            }
        });
        if(productsOnOffer == false){
            res.status(404).json({
                status: "Error",
                message: "Products On Offer not found"
            })
        }else{
        res.status(200).json({
            status: "Success",
            message: "Product(s) on offer",
            data: productsOnOffer
        })
    }
    }catch(e){
        console.log(e)
        res.status(500).json({
            status: "Error",
            message: "Something went wrong. Try again later"
        })
    }
})

export default app;