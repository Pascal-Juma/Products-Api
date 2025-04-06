import { PrismaClient } from '@prisma/client'

const client = new PrismaClient(); 

export const allProducts = async( _req, res) => {
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
}

export const addProduct = async (req, res) => {
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
        console.log(e)
        res.json({
            message: "Something went wrong. Try again later"
        })
    }
}

export const updateProduct = async (req, res) => {
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
}

export const specificProduct = async(req, res) => {
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
}

export const deleteProduct = async (req, res) => {
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
}