import { Request, Response } from "express";

import { ImportCategoryUseCases } from "./ImportCategoryUseCases";

class ImportCategoryController {
    constructor(private importCategoryUseCases: ImportCategoryUseCases) {}
    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;
        await this.importCategoryUseCases.execute(file);
        return response.json();
    }
}

export { ImportCategoryController };
