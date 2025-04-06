import express from 'express';
import productRouter from './routes/productRouter.js';
import onOfferRouter from './routes/offerRoutes.js';

const app = express();
app.use(express.json());
app.use("/products", productRouter);
app.use("/offers", onOfferRouter);

app.get("/products")

app.get("/products/:productId")

app.get("/productsOnOffer")

export default app;