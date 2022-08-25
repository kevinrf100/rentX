import { Router } from "express";

import { CreateCarController } from "@modules/cars/usesCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/usesCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/usesCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
carsRoutes.post(
    "/",
    ensureAuthentication,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get("/", listAvailableCarsController.handle);

carsRoutes.post(
    "/specifications/:id",
    ensureAuthentication,
    ensureAdmin,
    createCarSpecificationController.handle
);

export { carsRoutes };
