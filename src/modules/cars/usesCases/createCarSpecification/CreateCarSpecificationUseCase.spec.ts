import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRespositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarsSpecificationsUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car Specifications", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarsSpecificationsUseCase = new CreateCarSpecificationUseCase(
            carsRepository
        );
    });
    it("Should be able to add a new specification to a none-existent car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["54312"];
            await createCarsSpecificationsUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should be able to create SpecificationCars", async () => {
        const specifications_id = ["54312"];

        const car = await carsRepository.create({
            name: "carName",
            description: "car description",
            daily_rate: 10,
            category_id: "catgory_id",
            brand: "audi",
            fine_amount: 20,
            license_plate: "3453",
        });

        await createCarsSpecificationsUseCase.execute({
            car_id: car.id,
            specifications_id,
        });
    });
});
