"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const express_validator_1 = require("express-validator");
const noErrors_middleware_1 = __importDefault(require("../middlewares/noErrors.middleware"));
const emailAlreadyExists_middleware_1 = __importDefault(require("../middlewares/emailAlreadyExists.middleware"));
const router = (0, express_1.Router)();
const controller = new user_controller_1.default();
router.get('/', controller.getAllUsuarios);
router.get('/:id', controller.GetUsuarioByID);
router.post('/', [
    (0, express_validator_1.check)('email', 'El email es obligatorio').notEmpty(),
    (0, express_validator_1.check)('email', 'El correo no es válido').isEmail(),
    (0, express_validator_1.check)('email').custom(emailAlreadyExists_middleware_1.default),
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').notEmpty(),
    (0, express_validator_1.check)('lastname', 'El apellido es obligatorio').notEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').notEmpty(),
    noErrors_middleware_1.default
], controller.register);
router.put('/:id', controller.putUsuario);
exports.default = router;
//# sourceMappingURL=user.routes.js.map