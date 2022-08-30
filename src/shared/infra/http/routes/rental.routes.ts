import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/usesCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/usesCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/usesCases/listRentalsByUser/ListRentalsByUserController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

const rentalRoutes = Router();

rentalRoutes.post("/", ensureAuthentication, createRentalController.handle);
rentalRoutes.get(
    "/devolution/:id",
    ensureAuthentication,
    devolutionRentalController.handle
);
rentalRoutes.get(
    "/user",
    ensureAuthentication,
    listRentalsByUserController.handle
);

export { rentalRoutes };
