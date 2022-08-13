import { Router } from "express";
import { createCategoryController } from "../modules/cars/usesCases/createCategory";
import { listCategoriesController } from "../modules/cars/usesCases/listCategories";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
});

export { categoriesRoutes };
