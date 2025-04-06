import { Router } from 'express';
import { allOffers } from '../controllers/offerControllers.js';

const offerRouter = Router();

offerRouter.route("/")
.get(allOffers)

export default offerRouter;
