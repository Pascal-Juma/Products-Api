function validateProduct(req, res, next){
    const { productTitle, productDescription, unitsLeft, pricePerUnit } = req.body;
    if(!productTitle){
        res.status(400).json({
            status: "Error",
            message: "Product title is required"
        })
    }
    if(!productDescription){
        res.status(400).json({
            status: "Error",
            message: "Product Description is required"
        })
    }
    if(!unitsLeft){
        res.status(400).json({
            status: "Error",
            message: "Units Left is Required"
        })
    }
    if(!pricePerUnit){
        res.status(400).json({
            status: "Error",
            message: "Price Per Unit of the Product is required"
        })
    }
    next();
}

export default validateProduct;