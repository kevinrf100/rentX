import { Router } from "express";
import multer from "multer";

import { CreateCarController } from "@modules/cars/usesCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/usesCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/usesCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/usesCases/uploadCarImages/UploadCarImagesController";

import uploadConfig from "../../../../config/upload";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const carsRoutes = Router();

const uploadImages = multer(uploadConfig.upload("temp/images"));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();
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

carsRoutes.post(
    "/images/:id",
    ensureAuthentication,
    ensureAdmin,
    uploadImages.array("files"),
    uploadCarImagesController.handle
);

export { carsRoutes };
