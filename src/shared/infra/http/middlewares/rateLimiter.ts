import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import * as redis from "redis";

import { AppError } from "@shared/errors/AppError";

const redisClient = redis.createClient({
    host: "0.0.0.0",
    port: Number(process.env.REDIS_PORT),
});

const rateLimiterRedis = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 10,
    duration: 1,
});

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        await rateLimiterRedis.consume(request.ip);
        return next();
    } catch (error) {
        console.log(error);
        throw new AppError("Too many request", 429);
    }
}
