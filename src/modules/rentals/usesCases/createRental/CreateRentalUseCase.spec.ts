import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/respositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import "reflect-metadata";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRespositoryInMemory";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,
            dateProvider,
            carsRepositoryInMemory
        );
    });

    it("Should be able to create a rental", async () => {
        const carModel = {
            brand: "Test",
            category_id: "teste",
            description: "teste",
            daily_rate: 100,
            fine_amount: 1000,
            license_plate: "ABC-123",
            name: "Audi teste",
        };
        const car = await carsRepositoryInMemory.create(carModel);
        const rental = await createRentalUseCase.execute({
            car_id: car.id,
            user_id: "12332",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });
    it("Should not be able to create a new rental if there is another open rental to the same user", async () => {
        const carModel = {
            brand: "Test",
            category_id: "teste",
            description: "teste",
            daily_rate: 100,
            fine_amount: 1000,
            license_plate: "ABC-123",
            name: "Audi teste",
        };
        const car = await carsRepositoryInMemory.create(carModel);
        const rental = await createRentalUseCase.execute({
            car_id: car.id,
            user_id: "123",
            expected_return_date: dayAdd24Hours,
        });
        console.log(rental);
        await expect(
            createRentalUseCase.execute({
                car_id: "123",
                user_id: "123",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("User is unavailable"));
    });
    it("Should not be able to create a new rental if there is another open rental to the car", async () => {
        const carModel = {
            brand: "Test",
            category_id: "teste",
            description: "teste",
            daily_rate: 100,
            fine_amount: 1000,
            license_plate: "ABC-123",
            name: "Audi teste",
        };
        const car = await carsRepositoryInMemory.create(carModel);
        await createRentalUseCase.execute({
            car_id: car.id,
            user_id: "1",
            expected_return_date: dayAdd24Hours,
        });
        await expect(
            createRentalUseCase.execute({
                car_id: car.id,
                user_id: "12332",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });
    it("Should not be able to create a new rental if expected_return_date is less than 24h", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "123",
                user_id: "1",
                expected_return_date: new Date(),
            });
        }).rejects.toEqual(new AppError("Return date minimum is 24 hours"));
    });
});
