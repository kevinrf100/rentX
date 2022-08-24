import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    async execute({
        name,
        description,
        daily_rate,
        category_id,
        brand,
        fine_amount,
        license_plate,
    }: IRequest) {
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(
            license_plate
        );

        if (carAlreadyExists) {
            throw new AppError("Car already exists");
        }

        const car = await this.carsRepository.create({
            name,
            description,
            daily_rate,
            category_id,
            brand,
            fine_amount,
            license_plate,
        });

        return car;
    }
}

export { CreateCarUseCase };
