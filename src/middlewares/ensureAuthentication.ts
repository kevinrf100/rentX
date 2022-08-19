import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

async function ensureAuthentication(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("User don't exists", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub } = verify(
            token,
            "c2357fe7900ac0d6278721e289765da3"
        ) as IPayload;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(sub);

        if (!user) {
            throw new AppError("User don't exists", 401);
        }
        request.user = user;
        next();
    } catch (error) {
        throw new AppError("User don't exists", 401);
    }
}

export { ensureAuthentication };
