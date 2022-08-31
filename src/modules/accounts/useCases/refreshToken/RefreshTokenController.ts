import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { refresh_token } = request.headers;
        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
        await refreshTokenUseCase.execute(refresh_token as string);

        return response.json();
    }
}

export { RefreshTokenController };
