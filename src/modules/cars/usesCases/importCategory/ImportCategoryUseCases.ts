import { parse } from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategories {
    name: string;
    description: string;
}

class ImportCategoryUseCases {
    constructor(private categoryRepository: ICategoriesRepository) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
        return new Promise((resolve, reject) => {
            const categories: IImportCategories[] = [];
            const stream = fs.createReadStream(file.path);
            const parseFile = parse();
            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({ name, description });
                })
                .on("end", () => {
                    fs.promises.unlink(file.path);
                    return resolve(categories);
                })
                .on("error", (error) => reject(error));
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        categories.map(async (category) => {
            const { name } = category;

            const existsCategory = await this.categoryRepository.findByName(
                name
            );

            if (!existsCategory) {
                await this.categoryRepository.create(category);
            }
        });
    }
}

export { ImportCategoryUseCases };
