import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import "reflect-metadata";
import "@shared/container";
import "express-async-errors";
import "dotenv/config";
import upload from "@config/upload";
import { AppError } from "@shared/errors/AppError";
import { createConnection } from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tempFolder}/avatar`));
app.use("/avatar", express.static(`${upload.tempFolder}/cars`));

app.use(router);

createConnection("0.0.0.0").then(() => console.log("Connection established"));

app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        if (error instanceof AppError) {
            return response
                .status(error.statusCode)
                .json({ message: error.message });
        }
        return response.status(500).json({
            status: "error",
            message: `Internal server error - ${error.message}`,
        });
    }
);

export { app };
