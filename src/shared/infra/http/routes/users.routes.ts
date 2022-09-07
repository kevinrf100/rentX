import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig);

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
    "/avatar",
    ensureAuthentication,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export { usersRoutes };
