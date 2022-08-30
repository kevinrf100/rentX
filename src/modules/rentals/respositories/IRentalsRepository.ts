import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
    findOpenRentalByCarId(car_id: string): Promise<Rental>;
    findOpenRentalByUserId(user_id: string): Promise<Rental>;
    create({
        car_id,
        expected_return_date,
        user_id,
    }: ICreateRentalDTO): Promise<Rental>;
    findById(id: string): Promise<Rental>;
}

export { IRentalsRepository };
