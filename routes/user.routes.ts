import { Router } from "express";
import UserController from "../controllers/user.controller";
import { check } from "express-validator";
import noErrors from "../middlewares/noErrors.middleware";
import emailAlreadyExists from "../middlewares/emailAlreadyExists.middleware";

const router = Router();

const controller: UserController = new UserController()

router.get('/', controller.getAllUsuarios)

router.get('/:id', controller.GetUsuarioByID)

router.post('/',
 [
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(emailAlreadyExists),
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('lastname', 'El apellido es obligatorio').notEmpty(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    noErrors
],
 controller.register)

 router.put('/:id', controller.putUsuario)

export default router