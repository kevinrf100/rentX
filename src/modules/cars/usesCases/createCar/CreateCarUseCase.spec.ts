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

    it("Should not be able to create a car with exists license plate", async () => {
        expect(() => {
            createCarUseCase.execute({
                name: "teste",
                description: "tessst",
                daily_rate: 10,
                category_id: "is",
                brand: "123",
                fine_amount: 20,
                license_plate: "3453",
            });
            createCarUseCase.execute({
                name: "teste",
                description: "tessst",
                daily_rate: 10,
                category_id: "is",
                brand: "123",
                fine_amount: 20,
                license_plate: "3453",
            });
        }).rejects.toBe(AppError);
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
