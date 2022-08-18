import { Repository } from "typeorm";

import { appDataSource } from "../../../../database";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = appDataSource.getRepository(Category);
    }

    async create({ name, description }): Promise<void> {
        const category = this.repository.create({ name, description });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({
            where: {
                name,
            },
        });

        return category;
    }
}

export { CategoriesRepository };
