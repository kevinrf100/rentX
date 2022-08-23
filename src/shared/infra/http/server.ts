import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import "../typeorm/index";
import "@shared/container";
import "express-async-errors";
import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

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

app.listen(3333, () => {
    console.log("Server is Running");
});
