import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    async execute({ name, description }: IRequest): Promise<void> {
        console.log("teste");
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);
        console.log(categoryAlreadyExists);
        if (categoryAlreadyExists) {
            throw new Error("Category already exists");
        }

        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
