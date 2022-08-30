import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
    private rental: Rental[] = [];

    async findOpenRentalByCarId(car_id: string): Promise<Rental> {
        return this.rental.find(
            (rental) => rental.car_id === car_id && !rental.end_date
        );
    }
    async findOpenRentalByUserId(user_id: string): Promise<Rental> {
        return this.rental.find(
            (rental) => rental.user_id === user_id && !rental.end_date
        );
    }

    async create({ car_id, expected_return_date, user_id }): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            car_id,
            expected_return_date,
            user_id,
            start_date: new Date(),
        });

        this.rental.push(rental);

        return rental;
    }

    async findById(id: string): Promise<Rental> {
        return this.rental.find((rental) => rental.id === id);
    }

    async listRentalsByUserId(user_id: string): Promise<Rental[]> {
        return this.rental.filter((rental) => rental.user_id === user_id);
    }
}

export { RentalsRepositoryInMemory };
