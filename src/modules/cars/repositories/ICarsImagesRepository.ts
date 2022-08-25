import { Car } from "../infra/typeorm/entities/Car";
import { CarImage } from "../infra/typeorm/entities/CarImage";

class ICarsImagesRepository {
    create(car_id: string, image_name: string): Promise<CarImage>;
}

export { ICarsImagesRepository };
