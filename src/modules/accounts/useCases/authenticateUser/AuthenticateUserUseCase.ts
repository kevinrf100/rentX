import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

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
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        const {
            secret_token,
            secret_refresh_token,
            token_expires_in,
            refresh_expires_in,
            refresh_expires_in_days,
        } = auth;
        if (!user) {
            throw new AppError("Email or password incorrect!");
        }

        const passwordCompare = await compare(password, user.password);
        if (!passwordCompare) {
            throw new AppError("Email or password incorrect!");
        }

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: token_expires_in,
        });

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: refresh_expires_in,
        });
        const dateExpire = this.dateProvider.addDays(refresh_expires_in_days);

        await this.usersTokensRepository.create({
            user_id: user.id,
            expires_date: dateExpire,
            refresh_token,
        });

        const response: IResponse = {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
            refresh_token,
        };

        return response;
    }
}

export { AuthenticateUserUseCase };
