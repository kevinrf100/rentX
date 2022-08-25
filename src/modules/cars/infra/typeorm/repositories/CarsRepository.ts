import { QueryBuilder, Repository } from "typeorm";

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
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = await this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            specifications,
            id,
        });

        await this.repository.save(car);

        return car;
    }
    async findAvailable(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true });

        if (name) {
            carsQuery.andWhere("name = :name", { name });
        }
        if (brand) {
            carsQuery.andWhere("brand = :brand", { brand });
        }
        if (category_id) {
            carsQuery.andWhere("category_id = :category_id", { category_id });
        }
        const cars = carsQuery.getMany();

        return cars;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            where: { license_plate },
        });

        return car;
    }

    async findById(car_id) {
        const car = await this.repository.findOne({ where: { id: car_id } });
        return car;
    }
}

export { CarsRepository };
