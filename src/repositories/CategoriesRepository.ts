import { Category } from "../model/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

class CategoriesRepository {
    private categories: Category[];

    constructor() {
        this.categories = [];
    }

    create({ name, description }: ICreateCategoryDTO): void {
        const category = new Category(); 
        
        const existsCategory =this.categories.some((category) => category.name === name);

        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        });
        
        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        const category = this.categories.find((category) => category.name === name);

        return category;
    }
}

export { CategoriesRepository };