import { Request, Response } from "express";

import { AppError } from "../../../errors/AppError";
import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationService {
    constructor(private specificationsRepository: ISpecificationsRepository) {}

    execute({ name, description }: IRequest) {
        const specificationAlreadyExits =
            this.specificationsRepository.findByName(name);

        if (specificationAlreadyExits) {
            throw new AppError("Specification already exists");
        }

        this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationService };
