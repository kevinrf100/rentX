import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCases } from "./ImportCategoryUseCases";

const categoryRepository = new CategoriesRepository();
const importCategoryUseCases = new ImportCategoryUseCases(categoryRepository);
const importCategoryController = new ImportCategoryController(
    importCategoryUseCases
);

export { importCategoryController };
