import { Repository } from "typeorm";

import { IRentalsRepository } from "@modules/rentals/respositories/IRentalsRepository";
import appDataSource from "@shared/infra/typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = appDataSource.getRepository(Rental);
    }

    async findOpenRentalByCarId(car_id: string): Promise<Rental> {
        return this.repository.findOne({ where: { car_id } });
    }
    async findOpenRentalByUserId(user_id: string): Promise<Rental> {
        return this.repository.findOne({ where: { user_id } });
    }
    async create({ car_id, expected_return_date, user_id }): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id,
        });

        await this.repository.save(rental);
        return rental;
    }
}

export { RentalsRepository };
