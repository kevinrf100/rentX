import { Request, Response, Router } from "express";
import { createSpecificationController } from "../modules/cars/usesCases/createSpecification";

const specificationRoutes = Router();

specificationRoutes.post("/", (request: Request, response: Response) => {
    return createSpecificationController.handle(request, response);
});

export { specificationRoutes };
