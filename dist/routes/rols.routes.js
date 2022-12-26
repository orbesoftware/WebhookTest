"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const noErrors_middleware_1 = __importDefault(require("../middlewares/noErrors.middleware"));
const rolNameAlreadyExists_middleware_1 = __importDefault(require("../middlewares/customs/rolNameAlreadyExists.middleware"));
const rols_controller_1 = __importDefault(require("../controllers/rols.controller"));
const router = (0, express_1.Router)();
const controller = new rols_controller_1.default();
router.get('/');
router.get('/:id');
router.post('/', [
    (0, express_validator_1.check)('name', 'El nombre del rol es obligatorio').notEmpty(),
    (0, express_validator_1.check)('name').custom(rolNameAlreadyExists_middleware_1.default),
    noErrors_middleware_1.default
], controller.newRol);
exports.default = router;
//# sourceMappingURL=rols.routes.js.map