import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./createSpecificationUseCase";

class CreateSpecificationController {
    constructor(
        private createSpecificationUseCase: CreateSpecificationUseCase
    ) {}
    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;

        this.createSpecificationUseCase.execute({ name, description });
        return response.status(200).send();
    }
}

export { CreateSpecificationController };
