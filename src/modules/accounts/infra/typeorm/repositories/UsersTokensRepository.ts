import { Repository } from "typeorm";

import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import appDataSource from "@shared/infra/typeorm";

import { UserToken } from "../entities/UserToken";

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserToken>;

    constructor() {
        this.repository = appDataSource.getRepository(UserToken);
    }

    async create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokensDTO) {
        const token = await this.repository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        this.repository.save(token);

        return token;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        const token = await this.repository.findOne({
            where: {
                user_id,
                refresh_token,
            },
        });
        return token;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const userToken = await this.repository.findOne({
            where: { refresh_token },
        });

        return userToken;
    }
}

export { UsersTokensRepository };
