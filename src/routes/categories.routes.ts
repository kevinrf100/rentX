import { Request, Response, Router } from "express";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request: Request, response: Response) => {
    const { name, description } = request.body;

    const categoryAlreadyExists = categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
        return response.status(400).json({ error: "Category already exists" });
    }

    categoriesRepository.create({ name, description });

    return response.status(201).json();
});

categoriesRoutes.get("/", (request: Request, response: Response) => {
    const categories = categoriesRepository.list();

    return response.json(categories);
});

export { categoriesRoutes };
