import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/respositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    async execute({ car_id, user_id, expected_return_date }: IRequest) {
        const minimumHours = 24;
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

        const compare = this.dateProvider.compareInHours(
            new Date(),
            expected_return_date
        );

        if (compare < minimumHours) {
            throw new AppError("Return date minimum is 24 hours");
        }

        const rental = await this.rentalsRepository.create({
            car_id,
            expected_return_date,
            user_id,
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return rental;
    }
}

export { CreateRentalUseCase };
