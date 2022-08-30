import { IsNull, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/respositories/IRentalsRepository";
import appDataSource from "@shared/infra/typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = appDataSource.getRepository(Rental);
    }

    async findOpenRentalByCarId(car_id: string): Promise<Rental> {
        const openCar = await this.repository.findOne({
            where: { car_id, end_date: IsNull() },
        });

        return openCar;
    }
    async findOpenRentalByUserId(user_id: string): Promise<Rental> {
        return this.repository.findOne({
            where: { user_id, end_date: IsNull() },
        });
    }
    async create({
        car_id,
        expected_return_date,
        user_id,
        id,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            expected_return_date,
            user_id,
            id,
            end_date,
            total,
        });

        await this.repository.save(rental);
        return rental;
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne({ where: { id } });
        return rental;
    }
}

export { RentalsRepository };
