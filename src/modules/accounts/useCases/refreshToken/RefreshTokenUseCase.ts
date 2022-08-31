import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
export class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute(token: string) {
        const { sub, email } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;
        const user_id = sub;

        const userTokens =
            await this.usersTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (userTokens) {
            throw new AppError("Refresh token does not exists");
        }

        await this.usersTokensRepository.deleteById(userTokens.id);

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: user_id,
            expiresIn: auth.refresh_expires_in,
        });
        const dateExpire = this.dateProvider.addDays(
            auth.refresh_expires_in_days
        );

        await this.usersTokensRepository.create({
            user_id,
            expires_date: dateExpire,
            refresh_token,
        });

        return refresh_token;
    }
}
