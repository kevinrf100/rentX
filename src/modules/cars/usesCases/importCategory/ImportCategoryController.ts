import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryUseCases } from "./ImportCategoryUseCases";

class ImportCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;
        const importCategoryUseCases = container.resolve(
            ImportCategoryUseCases
        );
        await importCategoryUseCases.execute(file);
        return response.status(201).json();
    }
}

export { ImportCategoryController };
