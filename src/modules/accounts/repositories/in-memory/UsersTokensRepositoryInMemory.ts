import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    private usersTokens: UserToken[] = [];

    async create({ expires_date, refresh_token, user_id }) {
        const token = new UserToken();

        Object.assign(token, { expires_date, refresh_token, user_id });

        this.usersTokens.push(token);

        return token;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        return this.usersTokens.find(
            (userToken) =>
                userToken.refresh_token === refresh_token &&
                userToken.user_id === user_id
        );
    }

    async deleteById(id: string): Promise<void> {
        const index = this.usersTokens.findIndex(
            (userToken) => userToken.id === id
        );

        this.usersTokens.splice(index, 1);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        return this.usersTokens.find(
            (userToken) => userToken.refresh_token === refresh_token
        );
    }
}

export { UsersTokensRepositoryInMemory };
