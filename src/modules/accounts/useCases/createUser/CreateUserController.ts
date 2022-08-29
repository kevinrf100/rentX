import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        console.log("entrei aqui");
        const { driver_license, name, email, password } = request.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);
        await createUserUseCase.execute({
            driver_license,
            name,
            email,
            password,
        });

        return response.status(201).json();
    }
}
