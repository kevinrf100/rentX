import { ICreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUsersTokensRepository {
    create({
        expires_date,
        refresh_token,
        user_id,
    }: ICreateUserTokensDTO): Promise<UserToken>;
    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UserToken>;
}

export { IUsersTokensRepository };
