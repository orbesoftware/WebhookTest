import { Router } from "express";
import { check } from "express-validator";
import AuthController from "../controllers/auth.controller"
import noErrors from "../middlewares/noErrors.middleware";

const router = Router();

const controller: AuthController = new AuthController()

router.post('/', controller.login,
[
    check('email', "Introduce un email").notEmpty(),
    check('password', "Introduce una contraseña").notEmpty(),
    noErrors
], controller.login)

export default router