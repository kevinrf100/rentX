import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "@modules/rentals/respositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalRepository")
        private rentalsRepository: IRentalsRepository
    ) {}
    async execute({ car_id, user_id, expected_return_date }: IRequest) {
        const carUnavailable =
            await this.rentalsRepository.findOpenRentalByCarId(car_id);

        if (carUnavailable) {
            throw new AppError("Car is unavailable");
        }

        const user = await this.rentalsRepository.findOpenRentalByUserId(
            user_id
        );

        if (user) {
            throw new AppError("Car is unavailable");
        }

        const rental = await this.rentalsRepository.create({
            car_id,
            expected_return_date,
            user_id,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
