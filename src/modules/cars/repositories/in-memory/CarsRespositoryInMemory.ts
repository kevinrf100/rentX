import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    private cars: Car[] = [];
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
        const car = new Car();

        Object.assign(car, {
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

        this.cars.push(car);

        return car;
    }

    async findAvailable(name?: string, brand?: string, category_id?: string) {
        let availableCars = this.cars.filter((car) => car.available);

        if (!name && !brand && !category_id) return availableCars;

        availableCars = availableCars.filter((car) => {
            if (car.name === name) return true;
            if (car.brand === brand) return true;
            if (car.category_id === category_id) return true;

            return false;
        });

        return availableCars;
    }

    async findByLicensePlate(license_plate: string) {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findById(car_id) {
        return this.cars.find((car) => car.id === car_id);
    }

    async updateAvailable(car_id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex((car) => car.id === car_id);
        this.cars[findIndex].available = available;
    }
}

export { CarsRepositoryInMemory };
