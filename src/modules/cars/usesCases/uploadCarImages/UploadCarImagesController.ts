import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFile {
    filename: string;
}

export class UploadCarImagesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const images = request.files as IFile[];
        const uploadCarImagesUseCase = container.resolve(
            UploadCarImagesUseCase
        );

        const filesNames = images.map((file) => file.filename);

        await uploadCarImagesUseCase.execute({
            car_id: id,
            images_names: filesNames,
        });

        return response.status(201).json();
    }
}
