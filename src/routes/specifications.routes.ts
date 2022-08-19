import { Router } from "express";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { CreateSpecificationController } from "../modules/cars/usesCases/createSpecification/CreateSpecificationController";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAuthentication);
specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
