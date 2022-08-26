import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const createrentalUseCase = container.resolve(CreateRentalUseCase);
        await createrentalUseCase.execute();

        return response.json();
    }
}

export { CreateRentalController };
