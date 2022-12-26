import { Router } from "express";
import { check } from 'express-validator';
import noErrors from '../middlewares/noErrors.middleware';
import roleAlreadyExists from "../middlewares/customs/rolNameAlreadyExists.middleware";
import RolsController from "../controllers/rols.controller";



const router = Router();

const controller : RolsController = new RolsController();

router.get('/', )

router.get('/:id',)

router.post('/', [
    check('name', 'El nombre del rol es obligatorio').notEmpty(),
    check('name').custom(roleAlreadyExists),
    noErrors
], controller.newRol
);

export default router