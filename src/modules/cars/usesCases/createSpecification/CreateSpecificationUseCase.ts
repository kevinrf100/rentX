import { inject, injectable } from "tsyringe";

import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: SpecificationsRepository
    ) {}
    async execute({ name, description }: IRequest) {
        await this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
