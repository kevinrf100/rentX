import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/usesCases/createSpecification/CreateSpecificationController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post(
    "/",
    ensureAuthentication,
    ensureAdmin,
    createSpecificationController.handle
);

export { specificationRoutes };
