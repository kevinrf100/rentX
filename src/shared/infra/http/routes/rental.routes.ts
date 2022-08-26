import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/usesCases/createRental/CreateRentalController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const createRentalController = new CreateRentalController();

const rentalRoutes = Router();

rentalRoutes.post("/", ensureAuthentication, createRentalController.handle);

export { rentalRoutes };
