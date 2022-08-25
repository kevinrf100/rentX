import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../../../../modules/cars/usesCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/usesCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/usesCases/listCategories/ListCategoriesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const categoriesRoutes = Router();
const upload = multer({
    dest: "./temp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post(
    "/",
    ensureAuthentication,
    ensureAdmin,
    createCategoryController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
    "/import",
    upload.single("file"),
    ensureAuthentication,
    ensureAdmin,
    importCategoryController.handle
);

export { categoriesRoutes };
