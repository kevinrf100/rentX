import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationsRepository: SpecificationsRepository) {}
    async execute({ name, description }: IRequest) {
        this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
