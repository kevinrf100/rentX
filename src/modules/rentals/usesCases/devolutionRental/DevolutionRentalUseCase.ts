import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/respositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const minimum_daily = 1;

        if (!rental) {
            throw new AppError("Rental not found");
        }

        const car = await this.carsRepository.findById(rental.car_id);

        let daily = this.dateProvider.compare(
            rental.start_date,
            new Date(),
            "days"
        );

        if (daily <= 0) {
            daily = minimum_daily;
        }

        const delay = this.dateProvider.compare(
            new Date(),
            new Date(rental.expected_return_date),
            "days"
        );

        let total = 0;
        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total += calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = new Date();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase };
