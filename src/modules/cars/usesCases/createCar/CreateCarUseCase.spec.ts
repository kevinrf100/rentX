import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRespositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to create a new car", async () => {
        await createCarUseCase.execute({
            name: "Name Car",
            description: "Car description test",
            daily_rate: 10,
            category_id: "category",
            brand: "123",
            fine_amount: 20,
            license_plate: "3453",
        });
    });

    it("should not be able to create a car with exists license plate", async () => {
        await createCarUseCase.execute({
            name: "Car1",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });

        await expect(
            createCarUseCase.execute({
                name: "Car2",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category",
            })
        ).rejects.toEqual(new AppError("Car already exists"));
    });

    it("Should be created a new car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "teste",
            description: "tessst",
            daily_rate: 10,
            category_id: "is",
            brand: "123",
            fine_amount: 20,
            license_plate: "3453",
        });

        expect(car.available).toBe(true);
    });
});
