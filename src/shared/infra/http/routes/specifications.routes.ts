import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/usesCases/createSpecification/CreateSpecificationController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAuthentication);
specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
