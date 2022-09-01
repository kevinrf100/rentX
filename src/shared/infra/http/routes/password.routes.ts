import { Router } from "express";

import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/ResetPasswordController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoute = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoute.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoute.post("/reset", resetPasswordController.handle);

export { passwordRoute };
