import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRespositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
    });

    it("Should be able to list all available cars", async () => {
        const car = await carsRepository.create({
            name: "Car1",
            description: "car description",
            daily_rate: 10,
            category_id: "is",
            brand: "123",
            fine_amount: 20,
            license_plate: "3453",
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepository.create({
            name: "carName",
            description: "car description",
            daily_rate: 10,
            category_id: "is",
            brand: "audi",
            fine_amount: 20,
            license_plate: "3453",
        });

        await carsRepository.create({
            name: "carName",
            description: "car description",
            daily_rate: 10,
            category_id: "is",
            brand: "asas",
            fine_amount: 20,
            license_plate: "3453",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "carName",
        });
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepository.create({
            name: "carName",
            description: "car description",
            daily_rate: 10,
            category_id: "is",
            brand: "audi",
            fine_amount: 20,
            license_plate: "3453",
        });

        await carsRepository.create({
            name: "carName",
            description: "car description",
            daily_rate: 10,
            category_id: "is",
            brand: "c137",
            fine_amount: 20,
            license_plate: "3453",
        });

        const cars = await listAvailableCarsUseCase.execute({ brand: "audi" });
        expect(cars).toEqual([car]);
    });
    it("Should be able to list all available cars by category_id", async () => {
        const car = await carsRepository.create({
            name: "carName",
            description: "car description",
            daily_rate: 10,
            category_id: "catgory_id",
            brand: "audi",
            fine_amount: 20,
            license_plate: "3453",
        });

        await carsRepository.create({
            name: "carName",
            description: "car description",
            daily_rate: 10,
            category_id: "snowball",
            brand: "wings",
            fine_amount: 20,
            license_plate: "3453",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "category_id",
        });

        expect(cars).toEqual([car]);
    });
});
