import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    user: User[] = [];
    async create({
        driver_license,
        email,
        name,
        password,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, { driver_license, email, name, password });

        this.user.push(user);
    }
    async findByEmail(email: string): Promise<User> {
        return this.user.find((user) => user.email === email);
    }
    async findById(id: string): Promise<User> {
        return this.user.find((user) => user.id === id);
    }
}

export { UsersRepositoryInMemory };
