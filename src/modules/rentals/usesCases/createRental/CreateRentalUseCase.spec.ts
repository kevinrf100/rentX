import { RentalsRepositoryInMemory } from "@modules/rentals/respositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import "reflect-metadata";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMemory;

describe("Create Rental", () => {
    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
    });

    it("Should be able to create a rental", async () => {
        const rental = await createRentalUseCase.execute({
            car_id: "123",
            user_id: "12332",
            expected_return_date: new Date(),
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });
    it("Should be able to create a new rental if there is another open rental to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "123",
                user_id: "12332",
                expected_return_date: new Date(),
            });

            await createRentalUseCase.execute({
                car_id: "123",
                user_id: "12332",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    it("Should be able to create a new rental if there is another open rental to the car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                car_id: "123",
                user_id: "1",
                expected_return_date: new Date(),
            });

            await createRentalUseCase.execute({
                car_id: "123",
                user_id: "12332",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    // it("Should be able to create a rental for rented car", async () => {
    //     //await createRentalUseCase.execute();
    // });

    // - O aluguel deve ter duração mínima de 24 horas.
    // - Não deve ser possível cadastrar um novo aluguel caso já - exista um aberto para o mesmo usuário
    // - Não deve ser possível cadastrar um novo aluguel caso já - exista um aberto para o mesmo carro
});
