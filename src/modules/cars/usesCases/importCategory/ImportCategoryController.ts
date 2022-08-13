import { Request, Response } from "express";

import { ImportCategoryUseCases } from "./ImportCategoryUseCases";

class ImportCategoryController {
    constructor(private importCategoryUseCases: ImportCategoryUseCases) {}
    handle(request: Request, response: Response): Response {
        const { file } = request;
        this.importCategoryUseCases.execute(file);
        return response.json();
    }
}

export { ImportCategoryController };
