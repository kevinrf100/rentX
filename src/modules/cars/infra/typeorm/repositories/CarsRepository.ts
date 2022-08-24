import { Repository } from "typeorm";

import {
    ICarsRepository,
    ICreateCarDTO,
} from "@modules/cars/repositories/ICarsRepository";
import appDataSource from "@shared/infra/typeorm";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = appDataSource.getRepository(Car);
    }
    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
    }: ICreateCarDTO): Promise<Car> {
        const car = await this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
        });

        await this.repository.save(car);

        return car;
    }
    async list(): Promise<Car[]> {
        const list = this.repository.find();

        return list;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            where: { license_plate },
        });

        return car;
    }
}

export { CarsRepository };
