import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}
    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;

        try {
            this.createCategoryUseCase.execute({ name, description });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }

        return response.status(201).json();
    }
}

export { CreateCategoryController };
