import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../../../../modules/cars/usesCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/usesCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/usesCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();
const upload = multer({
    dest: "./temp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
    "/import",
    upload.single("file"),
    importCategoryController.handle
);

export { categoriesRoutes };
