import { Router } from "express";

import { CreateCarController } from "@modules/cars/usesCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/usesCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
    "/",
    ensureAuthentication,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get("/", listAvailableCarsController.handle);

export { carsRoutes };
