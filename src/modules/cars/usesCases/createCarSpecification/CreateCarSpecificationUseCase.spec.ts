import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRespositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarsSpecificationsUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specifications", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createCarsSpecificationsUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });
    it("Should be able to add a new specification to a none-existent car", async () => {
        const car_id = "1234";
        const specifications_id = ["54312"];
        expect(
            createCarsSpecificationsUseCase.execute({
                car_id,
                specifications_id,
            })
        ).rejects.toEqual(new AppError("Car don't exists"));
    });

    it("Should be able to create SpecificationCars", async () => {
        const specification = await specificationsRepositoryInMemory.create({
            name: "testing",
            description: "test",
        });

        const specifications_id = [specification.id];

        const car = await carsRepositoryInMemory.create({
            name: "carName",
            description: "car description",
            daily_rate: 10,
            category_id: "catgory_id",
            brand: "audi",
            fine_amount: 20,
            license_plate: "3453",
        });

        const specificationsCars =
            await createCarsSpecificationsUseCase.execute({
                car_id: car.id,
                specifications_id,
            });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });
});
