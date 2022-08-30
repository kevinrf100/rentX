import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/usesCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/usesCases/devolutionRental/DevolutionRentalController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

const rentalRoutes = Router();

rentalRoutes.post("/", ensureAuthentication, createRentalController.handle);
rentalRoutes.get(
    "/devolution/:id",
    ensureAuthentication,
    devolutionRentalController.handle
);

export { rentalRoutes };
