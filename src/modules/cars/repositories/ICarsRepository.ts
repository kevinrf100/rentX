import { Car } from "../infra/typeorm/entities/Car";
import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateCarDTO {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
    specifications?: Specification[];
    id?: string;
}

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findAvailable(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findById(car_id: string): Promise<Car>;
    updateAvailable(car_id: string, available: boolean): Promise<void>;
}

export { ICarsRepository, ICreateCarDTO };
