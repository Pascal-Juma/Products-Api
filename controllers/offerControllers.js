import { PrismaClient } from '@prisma/client'

const client = new PrismaClient();

export const allOffers = async (_req, res) => {
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
}