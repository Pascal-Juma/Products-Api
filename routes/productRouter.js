import { Router } from 'express';
import validateProduct from '../middlewares/validateProduct.js';
import { allProducts, addProduct, updateProduct, specificProduct, deleteProduct }  from '../controllers/productController.js'

const router = Router();

router.route("/")
.get(allProducts)
.post(validateProduct, addProduct)

router.route("/:productId")
.patch(updateProduct)
.get(specificProduct)
.delete(deleteProduct)

export default router;
