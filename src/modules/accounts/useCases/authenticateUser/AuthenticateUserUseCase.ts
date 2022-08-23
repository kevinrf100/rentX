import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect!");
        }

        const passwordCompare = await compare(password, user.password);
        if (!passwordCompare) {
            throw new AppError("Email or password incorrect!");
        }

        const token = sign({}, "c2357fe7900ac0d6278721e289765da3", {
            subject: user.id,
            expiresIn: "1d",
        });

        const response: IResponse = {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        };

        return response;
    }
}

export { AuthenticateUserUseCase };
